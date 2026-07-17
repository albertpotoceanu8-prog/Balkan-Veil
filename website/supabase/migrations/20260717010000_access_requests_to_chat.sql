alter table public.cms_conversations
add column if not exists access_request_id uuid references public.access_requests(id) on delete set null;

create unique index if not exists cms_conversations_access_request_id_key
on public.cms_conversations(access_request_id)
where access_request_id is not null;

create or replace function public.create_chat_from_access_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  created_client_id uuid;
  created_conversation_id uuid;
  contact_value text;
  email_value text;
  conversation_title text;
  initial_body text;
begin
  if exists (
    select 1
    from public.cms_conversations
    where access_request_id = new.id
  ) then
    return new;
  end if;

  contact_value := nullif(btrim(substring(coalesce(new.message, '') from 'Contact:\s*([^\n]+)')), '');

  if contact_value ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$' then
    email_value := contact_value;
  else
    email_value := null;
  end if;

  conversation_title := 'New brief';
  if nullif(btrim(new.brand), '') is not null then
    conversation_title := conversation_title || ': ' || btrim(new.brand);
  else
    conversation_title := conversation_title || ': ' || btrim(new.name);
  end if;

  initial_body := concat_ws(
    E'\n\n',
    'New access request from the public website.',
    'Name: ' || new.name,
    case when contact_value is not null then 'Contact: ' || contact_value end,
    case when new.brand is not null then 'Brand: ' || new.brand end,
    case when new.project_type is not null then 'Project: ' || new.project_type end,
    case when new.budget_range is not null then 'Budget: ' || new.budget_range end,
    new.message
  );

  insert into public.cms_clients (name, email, company, notes)
  values (
    new.name,
    email_value,
    nullif(btrim(new.brand), ''),
    case
      when contact_value is not null and email_value is null then 'Contact: ' || contact_value
      else null
    end
  )
  returning id into created_client_id;

  insert into public.cms_conversations (
    client_id,
    access_request_id,
    title,
    status,
    priority,
    last_message_at
  )
  values (
    created_client_id,
    new.id,
    conversation_title,
    'open',
    case when new.priority >= 3 then 'high' else 'normal' end,
    new.created_at
  )
  returning id into created_conversation_id;

  insert into public.cms_messages (
    conversation_id,
    sender_role,
    sender_name,
    sender_email,
    body,
    created_at
  )
  values (
    created_conversation_id,
    'client',
    new.name,
    email_value,
    initial_body,
    new.created_at
  );

  insert into public.activity_log (actor, action, entity_type, entity_id, metadata)
  values (
    'system',
    'access_request_chat_created',
    'access_requests',
    new.id,
    jsonb_build_object(
      'conversation_id', created_conversation_id,
      'client_id', created_client_id
    )
  );

  return new;
end;
$$;

drop trigger if exists create_chat_from_access_request on public.access_requests;
create trigger create_chat_from_access_request
after insert on public.access_requests
for each row execute function public.create_chat_from_access_request();

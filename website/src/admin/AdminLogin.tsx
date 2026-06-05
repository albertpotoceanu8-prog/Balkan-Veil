import React from "react";

import { supabase } from "@/lib/supabase/client";

type AdminLoginProps = {
  navigate: (path: string) => void;
};

export function AdminLogin({ navigate }: AdminLoginProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError("Access denied. Check credentials.");
      return;
    }

    navigate("/admin");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#F3EAD2]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
            VEIL OS / PRIVATE ACCESS
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Command Console</h1>
          <p className="mt-4 text-sm leading-6 text-[#8E8878]">
            Restricted interface for Balkan Veil internal operations.
          </p>
        </div>

        <form onSubmit={submit} className="border border-[#D4AF37]/20 bg-[#0E0D0A]/80 p-6">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F7835]">
              Email
            </span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              className="mt-3 w-full border border-[#D4AF37]/20 bg-[#050505] px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F7835]">
              Password
            </span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              className="mt-3 w-full border border-[#D4AF37]/20 bg-[#050505] px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
            />
          </label>

          {error ? <p className="mt-5 text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-[#050505] disabled:opacity-70"
          >
            {loading ? "Checking access..." : "Enter VEIL OS"}
          </button>
        </form>
      </div>
    </main>
  );
}

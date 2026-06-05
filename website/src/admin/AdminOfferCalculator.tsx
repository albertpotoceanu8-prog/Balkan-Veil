import React from "react";

import { AdminPanel, Field, ModuleHeader, inputClass } from "@/admin/AdminModule";

export function AdminOfferCalculator() {
  const [setup, setSetup] = React.useState(500);
  const [monthly, setMonthly] = React.useState(350);
  const [months, setMonths] = React.useState(12);
  const [discount, setDiscount] = React.useState(0);
  const [cancelAfter, setCancelAfter] = React.useState(3);

  const retainerTotal = monthly * months;
  const contractValue = setup + retainerTotal;
  const finalValue = contractValue - discount;
  const paidBeforeCancel = setup + monthly * cancelAfter;
  const remainingIfCancelled = Math.max(finalValue - paidBeforeCancel, 0);

  return (
    <main className="h-full overflow-y-auto p-8">
      <ModuleHeader eyebrow="VEIL OS / Internal Tool" title="Offer Calculator" description="Calculate setup, retainer, contract value and cancellation exposure." />
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <AdminPanel className="p-5">
          <div className="grid gap-4">
            <Field label="Setup Price"><input className={inputClass} type="number" value={setup} onChange={(e) => setSetup(Number(e.target.value))} /></Field>
            <Field label="Monthly Retainer"><input className={inputClass} type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></Field>
            <Field label="Contract Length Months"><input className={inputClass} type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} /></Field>
            <Field label="Discount"><input className={inputClass} type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} /></Field>
            <Field label="Cancelled After Months"><input className={inputClass} type="number" value={cancelAfter} onChange={(e) => setCancelAfter(Number(e.target.value))} /></Field>
          </div>
        </AdminPanel>
        <AdminPanel className="p-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Output</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Retainer Total", retainerTotal],
              ["Total Contract Value", contractValue],
              ["Final Value After Discount", finalValue],
              ["Remaining If Cancelled Early", remainingIfCancelled],
            ].map(([label, value]) => (
              <div key={label} className="border border-white/[0.07] bg-black/25 p-5">
                <p className="text-sm text-[#8E8878]">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-[#F3EAD2]">{Number(value).toLocaleString()} EUR</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-lg text-[#BDB39A]">
            Example: {setup} setup + {monthly}/month x {months} = {contractValue.toLocaleString()} EUR.
          </p>
        </AdminPanel>
      </div>
    </main>
  );
}

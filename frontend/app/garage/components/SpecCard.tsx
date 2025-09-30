"use client";

type Spec = {
  id: string;
  car_id: string;
  label: string;
  value: string;
};

export function SpecCard({ spec }: { spec: Spec }) {
  return (
    <div className="rounded-lg border bg-black/40 backdrop-blur p-4 shadow-md shadow-purple-700/30">
      <p className="text-sm text-neutral-400">{spec.label}</p>
      <h3 className="text-lg font-semibold text-white">{spec.value}</h3>
    </div>
  );
}

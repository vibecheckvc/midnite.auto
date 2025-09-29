'use client';

type Spec = {
  hp: number;
  torque: number;
  drivetrain: string;
  weight?: number;
  tires?: string;
};

type SpecCardProps = {
  specs: Spec;
};

export function SpecCard({ specs }: SpecCardProps) {
  return (
    <div className="rounded-lg border bg-white/5 backdrop-blur p-4">
      <h2 className="font-semibold mb-3">Car Specs</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-neutral-400">Horsepower</p>
          <p className="font-medium">{specs.hp} hp</p>
        </div>
        <div>
          <p className="text-neutral-400">Torque</p>
          <p className="font-medium">{specs.torque} lb-ft</p>
        </div>
        <div>
          <p className="text-neutral-400">Drivetrain</p>
          <p className="font-medium">{specs.drivetrain}</p>
        </div>
        {specs.weight && (
          <div>
            <p className="text-neutral-400">Weight</p>
            <p className="font-medium">{specs.weight} kg</p>
          </div>
        )}
        {specs.tires && (
          <div>
            <p className="text-neutral-400">Tires</p>
            <p className="font-medium">{specs.tires}</p>
          </div>
        )}
      </div>
    </div>
  );
}

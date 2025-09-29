'use client';

import { useState } from 'react';

export function AddCarModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700"
      >
        + Add Car
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add a New Car</h2>
            <form className="space-y-3">
              <input type="text" placeholder="Year" className="w-full rounded border p-2 bg-neutral-800" />
              <input type="text" placeholder="Make" className="w-full rounded border p-2 bg-neutral-800" />
              <input type="text" placeholder="Model" className="w-full rounded border p-2 bg-neutral-800" />
              <input type="text" placeholder="Trim" className="w-full rounded border p-2 bg-neutral-800" />
              <input type="file" className="w-full text-sm text-neutral-400" />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Car added (demo only)');
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

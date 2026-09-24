import { useState } from "react";

const cameras = [
  {
    id: "front-door",
    name: "Front door camera",
    location: "Entrance",
    activity: "No motion detected",
    color: "bg-[#c9baaa]",
  },
  {
    id: "garden",
    name: "Garden camera",
    location: "Back garden",
    activity: "No motion detected",
    color: "bg-[#b9c4ac]",
  },
  {
    id: "garage",
    name: "Garage camera",
    location: "Driveway",
    activity: "Vehicle detected 18 min ago",
    color: "bg-[#aeb9c4]",
  },
];

const events = [
  { time: "8:42 PM", text: "Front door locked", type: "Secure" },
  { time: "7:16 PM", text: "Garage motion detected", type: "Activity" },
  { time: "6:58 PM", text: "Garden camera online", type: "System" },
];

export default function SecurityPanel() {
  const [isHomeArmed, setIsHomeArmed] = useState(true);
  const [isFrontDoorLocked, setIsFrontDoorLocked] = useState(true);
  const [selectedCameraId, setSelectedCameraId] = useState("front-door");

  const selectedCamera = cameras.find(
    (camera) => camera.id === selectedCameraId,
  );

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
            Home protection
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Security center
          </h2>
        </div>

        <div
          className={`border px-3 py-2 text-sm font-semibold ${
            isHomeArmed
              ? "border-emerald-800/25 bg-emerald-50 text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-950 dark:text-emerald-400"
              : "border-amber-800/25 bg-amber-50 text-amber-800 dark:border-amber-400/25 dark:bg-amber-950 dark:text-amber-400"
          }`}
        >
          {isHomeArmed ? "System armed" : "System disarmed"}
        </div>
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <div className="border border-stone-300 bg-[#f7f4ed] p-5 dark:border-stone-700 dark:bg-[#292524]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {selectedCamera.name}
                </p>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {selectedCamera.location}
                </p>
              </div>

              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-700 dark:bg-emerald-500" />
                Live
              </span>
            </div>

            <div
              className={`mt-5 grid min-h-72 place-items-center border border-stone-300 dark:border-stone-700 ${selectedCamera.color}`}
            >
              <div className="text-center">
                <span className="mx-auto block h-12 w-16 border-4 border-stone-700/70 dark:border-stone-300/70" />
                <p className="mt-4 text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Camera feed preview
                </p>
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                  {selectedCamera.activity}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {cameras.map((camera) => {
              const isSelected = camera.id === selectedCameraId;

              return (
                <button
                  key={camera.id}
                  type="button"
                  onClick={() => setSelectedCameraId(camera.id)}
                  className={`border p-4 text-left transition-colors duration-200 ${
                    isSelected
                      ? "border-stone-700 bg-stone-200 dark:border-stone-500 dark:bg-stone-700"
                      : "border-stone-300 bg-[#f7f4ed] hover:bg-stone-100 dark:border-stone-700 dark:bg-[#292524] dark:hover:bg-stone-800"
                  }`}
                >
                  <div className={`h-1.5 w-10 ${camera.color}`} />
                  <p className="mt-4 text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {camera.location}
                  </p>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    {camera.activity}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="border border-stone-300 bg-[#f5f1e8] p-5 dark:border-stone-700 dark:bg-[#231f1c]">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500 dark:text-stone-400">
            Security controls
          </p>

          <div className="mt-5 space-y-3 border-y border-stone-300 py-5 dark:border-stone-700">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Home monitoring
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Motion and access alerts
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsHomeArmed((isArmed) => !isArmed)}
                aria-pressed={isHomeArmed}
                className={`min-w-20 border px-3 py-2 text-xs font-semibold transition-colors duration-200 ${
                  isHomeArmed
                    ? "border-stone-700 bg-stone-800 text-stone-50 dark:border-stone-500 dark:bg-stone-200 dark:text-stone-900"
                    : "border-stone-400 text-stone-700 hover:bg-stone-200 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-700"
                }`}
              >
                {isHomeArmed ? "Armed" : "Disarmed"}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Front door
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Main entrance lock
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFrontDoorLocked((isLocked) => !isLocked)}
                aria-pressed={isFrontDoorLocked}
                className={`min-w-20 border px-3 py-2 text-xs font-semibold transition-colors duration-200 ${
                  isFrontDoorLocked
                    ? "border-emerald-800/30 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-950 dark:text-emerald-400"
                    : "border-amber-800/30 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-950 dark:text-amber-400"
                }`}
              >
                {isFrontDoorLocked ? "Locked" : "Unlocked"}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500 dark:text-stone-400">
              Recent events
            </p>

            <ol className="mt-4 space-y-4">
              {events.map((event) => (
                <li key={`${event.time}-${event.text}`} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-stone-500 dark:bg-stone-400" />
                  <div>
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                      {event.text}
                    </p>
                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                      {event.time} · {event.type}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}

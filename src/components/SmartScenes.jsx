import { useState } from "react";

const scenes = [
  {
    id: "morning",
    name: "Morning routine",
    description: "Open curtains, warm the kitchen, and set lights to 40%.",
    schedule: "Weekdays · 7:00 AM",
    color: "bg-[#d8c5a8]",
    status: "Scheduled",
  },
  {
    id: "evening",
    name: "Evening at home",
    description: "Set warm lighting, close curtains, and play ambient audio.",
    schedule: "Daily · 7:30 PM",
    color: "bg-[#c5b9aa]",
    status: "Ready",
  },
  {
    id: "away",
    name: "Away mode",
    description: "Turn off devices, lock access points, and arm monitoring.",
    schedule: "Manual activation",
    color: "bg-[#b9c4ac]",
    status: "Ready",
  },
  {
    id: "sleep",
    name: "Sleep mode",
    description: "Dim hallway lighting, cool the bedroom, and secure the home.",
    schedule: "Daily · 11:00 PM",
    color: "bg-[#aeb9c4]",
    status: "Scheduled",
  },
];

export default function SmartScenes() {
  const [activeSceneId, setActiveSceneId] = useState(null);

  const activateScene = (sceneId) => {
    setActiveSceneId((currentSceneId) =>
      currentSceneId === sceneId ? null : sceneId,
    );
  };

  const activeScene = scenes.find((scene) => scene.id === activeSceneId);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
            Home automations
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Smart scenes
          </h2>
        </div>

        {activeScene ? (
          <p className="border border-emerald-800/25 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-950 dark:text-emerald-400">
            {activeScene.name} is active
          </p>
        ) : (
          <p className="text-sm text-stone-500 dark:text-stone-400">No scene is currently active</p>
        )}
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {scenes.map((scene) => {
          const isActive = activeSceneId === scene.id;

          return (
            <article
              key={scene.id}
              className={`border p-5 transition-all duration-300 ${
                isActive
                  ? "border-stone-700 bg-[#ebe5d9] dark:border-stone-500 dark:bg-[#3a3530]"
                  : "border-stone-300 bg-[#f7f4ed] hover:-translate-y-0.5 hover:border-stone-400 dark:border-stone-700 dark:bg-[#292524] dark:hover:border-stone-600"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`h-3 w-3 shrink-0 rounded-full ${scene.color}`}
                  aria-hidden="true"
                />

                <span
                  className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                    isActive ? "text-emerald-800 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"
                  }`}
                >
                  {isActive ? "Active" : scene.status}
                </span>
              </div>

              <h3 className="mt-7 text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                {scene.name}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-stone-600 dark:text-stone-400">
                {scene.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-300 pt-4 dark:border-stone-700">
                <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                  {scene.schedule}
                </p>

                <button
                  type="button"
                  onClick={() => activateScene(scene.id)}
                  className={`border px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "border-stone-700 bg-stone-800 text-stone-50 hover:bg-stone-700 dark:border-stone-500 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300"
                      : "border-stone-400 text-stone-800 hover:bg-stone-200 dark:border-stone-600 dark:text-stone-200 dark:hover:bg-stone-700"
                  }`}
                >
                  {isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
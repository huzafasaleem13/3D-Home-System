import { useState } from "react";
import { Sun, Zap, Battery, Leaf, TrendingDown } from "lucide-react";

const energyZones = [
  {
    id: "solar",
    name: "Solar panels",
    location: "Rooftop array",
    currentOutput: "3.2 kW",
    dailyGeneration: "18.4 kWh",
    status: "Generating",
    color: "bg-[#d8c5a8]",
    icon: Sun,
  },
  {
    id: "grid",
    name: "Grid supply",
    location: "Main meter",
    currentOutput: "1.8 kW",
    dailyGeneration: "12.6 kWh",
    status: "Connected",
    color: "bg-[#c9baaa]",
    icon: Zap,
  },
  {
    id: "battery",
    name: "Home battery",
    location: "Garage unit",
    currentOutput: "0.4 kW",
    dailyGeneration: "6.2 kWh",
    status: "Charging · 78%",
    color: "bg-[#b9c4ac]",
    icon: Battery,
  },
];

const roomConsumption = [
  { id: "kitchen", name: "Kitchen", current: "1.2 kW", daily: "7.8 kWh", percentage: 38 },
  { id: "living", name: "Living room", current: "0.8 kW", daily: "5.2 kWh", percentage: 28 },
  { id: "bedroom", name: "Master bedroom", current: "0.3 kW", daily: "2.1 kWh", percentage: 12 },
  { id: "bathroom", name: "Bathroom", current: "0.2 kW", daily: "1.4 kWh", percentage: 8 },
  { id: "entrance", name: "Entrance", current: "0.1 kW", daily: "0.6 kWh", percentage: 4 },
];

const energyEvents = [
  { time: "3:42 PM", text: "Solar output peaked at 4.1 kW", type: "Generation" },
  { time: "1:15 PM", text: "Battery fully charged", type: "Storage" },
  { time: "9:30 AM", text: "Grid import started", type: "Grid" },
];

export default function EnergyPanel() {
  const [selectedZoneId, setSelectedZoneId] = useState("solar");
  const [ecoMode, setEcoMode] = useState(true);

  const selectedZone = energyZones.find((zone) => zone.id === selectedZoneId);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            Resource monitoring
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">
            Energy management
          </h2>
        </div>

        <div
          className={`flex items-center gap-2 border px-3 py-2 text-sm font-semibold ${
            ecoMode
              ? "border-emerald-800/25 bg-emerald-50 text-emerald-800"
              : "border-stone-400 bg-[#f7f4ed] text-stone-600"
          }`}
        >
          <Leaf className="h-3.5 w-3.5" />
          {ecoMode ? "Eco mode active" : "Eco mode off"}
        </div>
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <div className="border border-stone-300 bg-[#f7f4ed] p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <selectedZone.icon className="h-5 w-5 text-stone-700" />
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {selectedZone.name}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    {selectedZone.location}
                  </p>
                </div>
              </div>

              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-700" />
                {selectedZone.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-stone-300 pt-5">
              <div>
                <p className="text-xs font-medium text-stone-500">
                  Current output
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-stone-900">
                  {selectedZone.currentOutput}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-500">
                  Today&apos;s total
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-stone-900">
                  {selectedZone.dailyGeneration}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {energyZones.map((zone) => {
              const isSelected = zone.id === selectedZoneId;
              const ZoneIcon = zone.icon;

              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`border p-4 text-left transition-colors duration-200 ${
                    isSelected
                      ? "border-stone-700 bg-stone-200"
                      : "border-stone-300 bg-[#f7f4ed] hover:bg-stone-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`h-1.5 w-10 ${zone.color}`} />
                    <ZoneIcon className="h-3.5 w-3.5 text-stone-500" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-stone-900">
                    {zone.name}
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    {zone.currentOutput}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="border border-stone-300 bg-[#f7f4ed] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">
              Consumption by room
            </p>

            <div className="mt-5 space-y-4">
              {roomConsumption.map((room) => (
                <div key={room.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-stone-800">
                      {room.name}
                    </span>
                    <span className="text-stone-500">{room.current}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-stone-200">
                    <div
                      className="h-full bg-stone-600 transition-all duration-500"
                      style={{ width: `${room.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="border border-stone-300 bg-[#f5f1e8] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">
            Energy controls
          </p>

          <div className="mt-5 space-y-3 border-y border-stone-300 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-stone-800">
                  Eco mode
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Optimize consumption
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEcoMode((current) => !current)}
                aria-pressed={ecoMode}
                className={`min-w-20 border px-3 py-2 text-xs font-semibold transition-colors duration-200 ${
                  ecoMode
                    ? "border-stone-700 bg-stone-800 text-stone-50"
                    : "border-stone-400 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {ecoMode ? "Active" : "Inactive"}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-sm font-semibold text-stone-800">
                  Grid import
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  External supply
                </p>
              </div>

              <span className="border border-emerald-800/30 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                Low
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-4 border-b border-stone-300 pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">
              Today&apos;s summary
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Total consumption</span>
                <span className="font-semibold text-stone-800">5.4 kW</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Solar generation</span>
                <span className="font-semibold text-stone-800">3.2 kW</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Self-sufficiency</span>
                <span className="font-semibold text-emerald-700">59%</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-stone-500">
                  <TrendingDown className="h-3.5 w-3.5" />
                  vs. yesterday
                </span>
                <span className="font-semibold text-emerald-700">−12%</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">
              Recent events
            </p>

            <ol className="mt-4 space-y-4">
              {energyEvents.map((event) => (
                <li key={`${event.time}-${event.text}`} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-stone-500" />
                  <div>
                    <p className="text-sm font-medium text-stone-800">
                      {event.text}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
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

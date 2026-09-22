import { useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import SecurityPanel from "./components/SecurityPanel";
import SmartHomeScene from "./components/SmartHomeScene";
import SmartScenes from "./components/SmartScenes";

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[#f2eee5] text-stone-900">
      <DashboardHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
        {activeSection === "overview" && <SmartHomeScene />}

        {activeSection === "scenes" && <SmartScenes />}

        {activeSection === "security" && <SecurityPanel />}

        {activeSection === "energy" && (
          <section className="border border-dashed border-stone-300 px-6 py-20 text-center">
            <p className="text-sm font-medium text-stone-500">
              This section will be built next.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
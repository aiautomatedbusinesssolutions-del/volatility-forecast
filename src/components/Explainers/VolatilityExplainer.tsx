"use client";

import { useState } from "react";
import { EXPLAINER_CONTENT } from "@/data/constants";

export default function VolatilityExplainer() {
  const [activeTopic, setActiveTopic] = useState(
    EXPLAINER_CONTENT[0]?.id ?? ""
  );

  const currentTopic = EXPLAINER_CONTENT.find((t) => t.id === activeTopic);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">
        Learn the Basics
      </h2>

      <nav className="mb-5 flex flex-wrap gap-2">
        {EXPLAINER_CONTENT.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setActiveTopic(topic.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors min-h-[40px] ${
              activeTopic === topic.id
                ? "border-sky-400 bg-sky-400/10 text-sky-400"
                : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            }`}
          >
            {topic.title}
          </button>
        ))}
      </nav>

      {currentTopic && (
        <div>
          <h3 className="mb-2 text-base font-semibold text-slate-100">
            {currentTopic.title}
          </h3>
          <p className="leading-relaxed text-slate-400">
            {currentTopic.body}
          </p>
          {currentTopic.keyTakeaway && (
            <div className="mt-4 rounded-lg border-l-4 border-sky-400 bg-slate-800 px-4 py-3 text-sm text-slate-300">
              <strong className="text-slate-100">Key Takeaway:</strong>{" "}
              {currentTopic.keyTakeaway}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

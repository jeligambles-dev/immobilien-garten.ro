"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ImageIcon } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  createdAt: string;
}

const categories = [
  "Toate",
  "Gazon",
  "Pomi & Arbuști",
  "Gard Viu",
  "Plantări",
  "Irigații",
];

const placeholderColors = [
  "from-green-400 to-green-600",
  "from-emerald-400 to-emerald-600",
  "from-teal-400 to-teal-600",
  "from-cyan-400 to-cyan-600",
  "from-lime-400 to-lime-600",
  "from-green-500 to-emerald-600",
];

export default function Portofoliu() {
  const [active, setActive] = useState("Toate");
  const [selected, setSelected] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  const filtered =
    active === "Toate"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
            Portofoliu
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Fiecare proiect este o dovadă a pasiunii și profesionalismului
            nostru. Iată câteva dintre lucrările realizate.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                active === cat
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">
              Nu sunt proiecte în această categorie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className="group rounded-2xl overflow-hidden border border-green-100 hover:border-green-300 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 cursor-pointer text-left bg-white"
              >
                <div className="h-52 relative">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div
                      className={`h-full bg-gradient-to-br ${placeholderColors[idx % placeholderColors.length]} flex items-center justify-center`}
                    >
                      <span className="text-white/80 font-heading font-bold text-5xl group-hover:scale-110 transition-transform duration-300">
                        {idx + 1}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-semibold text-slate-900 mt-3 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{project.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-72 relative">
              {selected.image ? (
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-white/40" />
                </div>
              )}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
                aria-label="Închide"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                {selected.category}
              </span>
              <h3 className="font-heading font-bold text-slate-900 text-xl mt-3 mb-2">
                {selected.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

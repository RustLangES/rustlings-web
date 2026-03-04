import type { Track } from "~/entities/track";

export const tracks: Track[] = [
  {
    id: "rust-desde-0",
    title: "Rust desde 0",
    description:
      "Aprende Rust desde los fundamentos: sintaxis, ownership, borrowing y más. Ideal si nunca has programado en Rust.",
    href: "/introduccion",
    lessons: 12,
    badge: "Principiante",
    disabled: false,
    slugs: [
      "introduccion",
      "porque-rust",
      "versiones",
      "configuracion-entorno",
      "sintaxis-basica",
      "tipos-datos",
      "estructuras-control",
      "ownership",
      "borrowing",
      "structs",
      "enums-pattern-matching",
      "temas-avanzados-roadmap",
    ],
  },
  {
    id: "rust-para-csharp",
    title: "Rust para C# developers",
    description:
      "Aprende Rust desde la perspectiva de un desarrollador de C#. Cubrimos conceptos clave y diferencias entre ambos lenguajes.",
    href: "/introduccion",
    lessons: 0,
    badge: "Avanzado",
    disabled: true,
    slugs: [],
  },
];

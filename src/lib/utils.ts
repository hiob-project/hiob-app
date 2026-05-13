import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const naturalCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export function compareNatural(a: string, b: string): number {
  return naturalCollator.compare(a, b);
}

export function sortStringsNatural(values: string[]): string[] {
  return values.toSorted(compareNatural);
}

export function sortByValueNatural<T extends { value: string }>(items: T[]): T[] {
  return items.toSorted((a, b) => compareNatural(a.value, b.value));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

/** Muted badge palette that harmonizes with the project theme. */
const badgePalette: { bg: string; text: string }[] = [
  { bg: "#CADCEA", text: "#2E4A62" }, // blue
  { bg: "#C2E3E8", text: "#1B5C66" }, // cyan
  { bg: "#C8DED0", text: "#2A5A3A" }, // green
  { bg: "#F0E4C0", text: "#6B5520" }, // yellow
  { bg: "#EDD5BF", text: "#7A4420" }, // orange
  { bg: "#E6CBCB", text: "#7A2828" }, // red
  { bg: "#E3CDD8", text: "#6E2A4A" }, // pink
  { bg: "#D5CEE6", text: "#44357A" }, // purple
  { bg: "#DDD3C4", text: "#5C3D1E" }, // brown
  { bg: "#D0D4D8", text: "#3A4248" }, // gray
  { bg: "#B8D4E8", text: "#1E3A5C" }, // steel blue
  { bg: "#B6DDD0", text: "#1A4A36" }, // teal
  { bg: "#DBE8C4", text: "#3E5A1E" }, // lime
  { bg: "#F0D8B8", text: "#6E3A10" }, // peach
  { bg: "#E0C0C8", text: "#6A2030" }, // rose
  { bg: "#C8C0E0", text: "#362A6A" }, // lavender
  { bg: "#D0DDD4", text: "#2A4A38" }, // sage
  { bg: "#E8DCC8", text: "#5A4420" }, // sand
  { bg: "#C8D8D8", text: "#2A4A4A" }, // slate
  { bg: "#E0D0C0", text: "#5A3E20" }, // tan
  { bg: "#D8C8D8", text: "#4A2A4A" }, // mauve
];

const colorAssignments = new Map<string, { bg: string; text: string }>();
let nextColorIndex = 0;

/** Get a unique badge color for each distinct value. Same value always returns the same color. */
export function getBadgeColor(value: string): { bg: string; text: string } {
  let color = colorAssignments.get(value);
  if (!color) {
    color = badgePalette[nextColorIndex % badgePalette.length];
    colorAssignments.set(value, color);
    nextColorIndex++;
  }
  return color;
}

import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

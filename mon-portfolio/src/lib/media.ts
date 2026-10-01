import type { StaticImageData } from "next/image";

/** An uploaded image URL when there is one, otherwise the bundled image. */
export function pickImage(url: string | null | undefined, fallback?: StaticImageData): string | StaticImageData | null {
  return url || fallback || null;
}

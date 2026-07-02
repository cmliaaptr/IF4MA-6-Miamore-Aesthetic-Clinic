export const TREATMENT_IMAGE_FALLBACK = "/images/treatment-hero.png";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export function getTreatmentImageSource(photo?: string | null) {
  if (!photo) return TREATMENT_IMAGE_FALLBACK;

  if (photo.startsWith("http://") || photo.startsWith("https://")) {
    try {
      const imageUrl = new URL(photo);

      if (
        imageUrl.pathname.startsWith("/storage/") &&
        ["localhost", "127.0.0.1"].includes(imageUrl.hostname)
      ) {
        return `${API_BASE_URL}${imageUrl.pathname}`;
      }
    } catch {
      return TREATMENT_IMAGE_FALLBACK;
    }

    return photo;
  }

  if (photo.startsWith("/storage/")) {
    return `${API_BASE_URL}${photo}`;
  }

  if (photo.startsWith("storage/")) {
    return `${API_BASE_URL}/${photo}`;
  }

  if (photo.startsWith("/images/")) {
    return photo;
  }

  if (photo.startsWith("/")) {
    return photo;
  }

  return `/images/${photo}`;
}

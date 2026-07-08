export const TREATMENT_IMAGE_FALLBACK = "/images/treatment-hero.png";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export function getTreatmentImageSource(photo?: string | null) {
  const normalizedPhoto = photo?.trim();

  if (!normalizedPhoto) return TREATMENT_IMAGE_FALLBACK;

  if (normalizedPhoto.startsWith("http://") || normalizedPhoto.startsWith("https://")) {
    try {
      const imageUrl = new URL(normalizedPhoto);

      if (
        imageUrl.pathname.startsWith("/storage/") &&
        ["localhost", "127.0.0.1"].includes(imageUrl.hostname)
      ) {
        return `${API_BASE_URL}${imageUrl.pathname}`;
      }
    } catch {
      return TREATMENT_IMAGE_FALLBACK;
    }

    return normalizedPhoto;
  }

  if (normalizedPhoto.startsWith("/storage/")) {
    return `${API_BASE_URL}${normalizedPhoto}`;
  }

  if (normalizedPhoto.startsWith("storage/")) {
    return `${API_BASE_URL}/${normalizedPhoto}`;
  }

  if (normalizedPhoto.startsWith("/images/")) {
    return normalizedPhoto;
  }

  if (normalizedPhoto.startsWith("images/")) {
    return `/${normalizedPhoto}`;
  }

  if (normalizedPhoto.startsWith("treatments/")) {
    return `${API_BASE_URL}/storage/${normalizedPhoto}`;
  }

  if (normalizedPhoto.startsWith("/treatments/")) {
    return `${API_BASE_URL}/storage${normalizedPhoto}`;
  }

  if (normalizedPhoto.startsWith("/")) {
    return normalizedPhoto;
  }

  if (looksLikeImageFile(normalizedPhoto)) {
    return `${API_BASE_URL}/storage/treatments/${encodeURIComponent(normalizedPhoto)}`;
  }

  return TREATMENT_IMAGE_FALLBACK;
}

function looksLikeImageFile(value: string) {
  return /\.(avif|gif|jpe?g|png|webp)$/i.test(value);
}

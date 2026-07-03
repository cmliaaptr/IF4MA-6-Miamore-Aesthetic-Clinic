export type RiwayatStatus = "Akan Datang" | "Selesai" | "Dibatalkan";

export type RiwayatItem = {
  id: number;
  treatment: string;
  treatmentImage?: string | null;
  treatmentDescription?: string | null;
  treatmentPrice?: string | null;
  treatmentDuration?: string | null;
  schedule: string;
  doctor: string;
  status: RiwayatStatus;
  room: string;
  payment: string;
  detailTitle: string;
  detailItems: string[];
  note: string;
};

export type RiwayatStatus = "Akan Datang" | "Selesai" | "Dibatalkan";

export type RiwayatItem = {
  id: number;
  treatment: string;
  treatmentImage?: string | null;
  schedule: string;
  doctor: string;
  status: RiwayatStatus;
  room: string;
  payment: string;
  detailTitle: string;
  detailItems: string[];
  note: string;
};

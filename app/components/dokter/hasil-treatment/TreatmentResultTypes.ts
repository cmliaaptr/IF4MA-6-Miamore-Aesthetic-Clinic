export type TreatmentPatient = {
  id: number;
  id_booking: number;
  id_user?: number | null;
  name: string;
  treatment: string;
  schedule: string;
  room: string;
  payment: string;
  status: "Selesai";
  result?: TreatmentResult | null;
};

export type TreatmentResultFormData = {
  skinCondition: string;
  treatmentResult: string;
  recommendation: string;
  homeCare: string;
  controlNote: string;
};

export type TreatmentResult = TreatmentResultFormData & {
  submittedAt: string;
};

export type TreatmentResultSummary = {
  treatment_selesai: number;
  hasil_terkirim: number;
  belum_diisi: number;
};

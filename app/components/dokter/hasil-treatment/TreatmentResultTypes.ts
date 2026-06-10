export type TreatmentPatient = {
  id: number;
  name: string;
  treatment: string;
  schedule: string;
  room: string;
  payment: string;
  status: "Selesai";
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

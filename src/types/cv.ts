export enum CvCategory {
  SYSTEM = 'system',
  REFERENCE = 'reference',
  SURFACE = 'surface',
}

export interface IFormCv {
  joyId?: number;
  name: string;
  category: CvCategory | string | null;
  key: string;
  description: string;
}

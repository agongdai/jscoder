export enum CvCategory {
  SYSTEM = 'system',
  REFERENCE = 'reference',
  SURFACE = 'surface',
}

export interface IFormNewCv {
  name: string;
  category: CvCategory | '';
  key: string;
  description: string;
}

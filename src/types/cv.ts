export enum CvCategory {
  MUI_VARIANT = 'mui-variant',
  MUI_PALETTE = 'mui-palette',
  REFERENCE = 'reference',
  SURFACE = 'surface',
  SYSTEM = 'system',
}

export interface IFormCv {
  joyId?: number;
  name: string;
  category: CvCategory | string | null;
  key: string;
  docUrl: string | null;
  muiColor: boolean | null;
  description?: string | null;
}

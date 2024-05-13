export enum CvCategory {
  MUI_VARIANT = 'mui-variant',
  MUI_PALETTE = 'mui-palette',
  REFERENCE = 'reference',
  SURFACE = 'surface',
}

export interface IFormCv {
  joyId?: number;
  name: string;
  category: CvCategory | string | null;
  key: string;
  docUrl?: string;
  muiColor?: boolean;
  description?: string;
}

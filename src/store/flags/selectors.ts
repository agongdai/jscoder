import { RootState } from '@joy/store';

export const selectCreateCvModalOpen = (state: RootState) => state.flags.createCvModalOpen;
export const selectCvBeingUpdated = (state: RootState) => state.flags.cvBeingUpdated;

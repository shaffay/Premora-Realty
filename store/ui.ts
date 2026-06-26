import { create } from 'zustand';

type ConsultationContext = {
  propertyTitle?: string;
  agentId?: string;
  defaultInterest?: string;
};

type UiState = {
  consultationOpen: boolean;
  consultationContext: ConsultationContext;
  openConsultation: (context?: ConsultationContext) => void;
  closeConsultation: () => void;
};

export const useUi = create<UiState>((set) => ({
  consultationOpen: false,
  consultationContext: {},
  openConsultation: (context = {}) =>
    set({ consultationOpen: true, consultationContext: context }),
  closeConsultation: () => set({ consultationOpen: false }),
}));

export interface AppState {
  isLoading: boolean;
  progress: number;
  isIntro: boolean;
  setIsLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setIsIntro: (loading: boolean) => void;
}

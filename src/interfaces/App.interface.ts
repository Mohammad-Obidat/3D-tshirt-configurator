export interface AppState {
  isLoading: boolean;
  progress: number;
  setIsLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
}

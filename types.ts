
export interface SlideContent {
  id: number;
  title: string;
  subtitle?: string;
  points: string[];
  emoji: string;
  imagePrompt: string;
  stage: string;
  color: string;
}

export interface PresentationState {
  currentSlide: number;
}

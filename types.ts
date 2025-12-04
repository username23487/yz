export interface Scene {
  id: string;
  title: string;
  description: string;
  promptModifier: string;
  icon: string;
  color: string;
}

export interface GeneratedImage {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export type AppState = 'start' | 'camera' | 'preview' | 'processing' | 'result';

export interface AnalysisResult {
  name: string;
  syllable_structure: number;
  phonetic_texture: number;
  rhythm_flow: number;
  musicality: number;
  spectral_features: number;
  distinctiveness: number;
}

export interface SortOption {
  value: string;
  label: string;
}

declare module '*.js' {
  const content: any;
  export default content;
}

declare module 'natural' {
  export class Soundex {
    static process(text: string): string;
  }
  export class Metaphone {
    static process(text: string): string;
  }
  export class DoubleMetaphone {
    static process(text: string): string[];
  }
}

declare module 'compromise' {
  interface NlpDoc {
    terms(): {
      data(): any[];
    };
  }
  function nlp(text: string): NlpDoc;
  export = nlp;
}

declare module 'syllable' {
  function syllable(text: string): number;
  export = syllable;
}

export class NameAnalyzer {
  constructor();
  analyze(name: string): {
    name: string;
    syllable_structure: number;
    phonetic_texture: number;
    rhythm_flow: number;
    musicality: number;
    spectral_features: number;
    distinctiveness: number;
  };
}

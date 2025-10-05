export class NameAnalyzer {
    private soundex: any;
    private metaphone: any;
    private doubleMetaphone: any;
    
    constructor() {
        // Initialize with basic implementations
        this.soundex = { process: this.soundexProcess.bind(this) };
        this.metaphone = { process: this.metaphoneProcess.bind(this) };
        this.doubleMetaphone = { process: this.doubleMetaphoneProcess.bind(this) };
    }

    private soundexProcess(name: string): string {
        // Basic Soundex implementation
        if (!name) return "";
        const s = name.toUpperCase().replace(/[^A-Z]/g, "");
        if (!s) return "";
        const firstLetter = s[0];
        const tail = s.slice(1).replace(/[HW]/g, "").split("").map(c => {
            if ("BFPV".includes(c)) return "1";
            if ("CGJKQSXZ".includes(c)) return "2";
            if ("DT".includes(c)) return "3";
            if ("L".includes(c)) return "4";
            if ("MN".includes(c)) return "5";
            if ("R".includes(c)) return "6";
            return ".";
        }).join("").replace(/(\d)\1+/g, "$1").replace(/\./g, "");
        return (firstLetter + tail).slice(0, 4).padEnd(4, "0");
    }

    private metaphoneProcess(name: string): string {
        // Basic Metaphone implementation (simplified)
        if (!name) return "";
        return name.split('').map(char => char.toUpperCase()).join(''); 
    }

    private doubleMetaphoneProcess(name: string): string[] {
        // Basic Double Metaphone implementation (simplified)
        if (!name) return [""];
        return [name.toUpperCase()];
    }

    countSyllables(text: string): number {
        if (!text) return 0;
        text = text.toLowerCase();
        if (text.length <= 3) return 1;
        text = text.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
        text = text.replace(/^y/, "");
        const matches = text.match(/[aeiouy]{1,2}/g);
        return matches ? matches.length : 0;
    }

    analyze(name: string): any {
        const cleanName = name.toLowerCase().replace(/[^a-z\s]/g, "");
        
        return {
            name: name,
            syllable_structure: this.analyzeSyllableStructure(cleanName),
            phonetic_texture: this.analyzePhoneticTexture(cleanName),
            rhythm_flow: this.analyzeRhythmFlow(cleanName),
            musicality: this.analyzeMusicality(cleanName),
            spectral_features: this.analyzeSpectralFeatures(cleanName),
            distinctiveness: this.analyzeDistinctiveness(cleanName)
        };
    }

    analyzeSyllableStructure(name: string): number {
        const syllableCount = this.countSyllables(name);
        const letterCount = name.length;
        const syllableToLetterRatio = syllableCount / letterCount;
        
        let complexity = 0;
        if (syllableCount === 1) complexity = 0.3;
        else if (syllableCount === 2) complexity = 0.6;
        else if (syllableCount === 3) complexity = 0.8;
        else if (syllableCount > 3) complexity = 1.0;
        
        const vowelPattern = name.match(/[aeiou]+/gi) || [];
        const vowelCount = vowelPattern.length;
        const vowelDistribution = vowelCount / syllableCount;
        
        let score = ((complexity * 0.4) + 
                    (syllableToLetterRatio * 0.3) + 
                    (vowelDistribution * 0.3)) * 100;
                    
        return Math.round(score);
    }

    analyzePhoneticTexture(name: string): number {
        // Analyze consonant clusters
        const clusters = name.match(/[bcdfghjklmnpqrstvwxz]{2,}/gi) || [];
        const clusterComplexity = (clusters as string[]).reduce((sum: number, cluster: string) => sum + cluster.length, 0) / name.length;
        
        // Analyze phonetic similarity using Soundex and Metaphone - variables kept for compatibility
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const soundexCode = this.soundex.process(name);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const metaphoneCode = this.metaphone.process(name);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dmCode = this.doubleMetaphone.process(name);
        
        // Analyze letter combinations
        const uniqueLetters = new Set(name.split('')).size;
        const letterVariety = uniqueLetters / name.length;
        
        // Analyze vowel-consonant patterns
        const vcPattern = name.replace(/[aeiou]/gi, 'V').replace(/[^aeiouV]/gi, 'C');
        const patternVariety = new Set(vcPattern.match(/.{2}/g) || []).size / (vcPattern.length / 2);
        
        let score = ((1 - clusterComplexity) * 0.3 + 
                    letterVariety * 0.3 + 
                    patternVariety * 0.4) * 100;
                    
        return Math.round(score);
    }

    analyzeRhythmFlow(name: string): number {
        const syllables = this.countSyllables(name);
        const letters = name.length;
        
        // Calculate rhythm metrics
        const avgSyllableLength = letters / syllables;
        const rhythmVariety = 0.5; // Simplified
        
        // Analyze letter transitions
        let transitions = 0;
        for (let i = 1; i < name.length; i++) {
            const prev = name[i-1];
            const curr = name[i];
            if (
                (this.isVowel(prev) && !this.isVowel(curr)) ||
                (!this.isVowel(prev) && this.isVowel(curr))
            ) {
                transitions++;
            }
        }
        const transitionRatio = transitions / (name.length - 1);
        
        let score = ((1 - Math.abs(avgSyllableLength - 3) / 3) * 0.4 + 
                    rhythmVariety * 0.3 + 
                    transitionRatio * 0.3) * 100;
                    
        return Math.round(score);
    }

    analyzeMusicality(name: string): number {
        // Analyze vowel harmony
        const vowels = name.match(/[aeiou]/gi) || [];
        const uniqueVowels = new Set(vowels);
        const vowelHarmony = 1 - (uniqueVowels.size / vowels.length) || 0;
        
        // Analyze consonant sonority
        const consonants = name.match(/[bcdfghjklmnpqrstvwxz]/gi) || [];
        let sonorityScore = 0;
        
        const sonorityScale: { [key: string]: number } = {
            'l': 0.9, 'r': 0.9, 'm': 0.8, 'n': 0.8,
            'v': 0.7, 'z': 0.7, 'w': 0.6, 'y': 0.6,
            'b': 0.5, 'd': 0.5, 'g': 0.5,
            'p': 0.4, 't': 0.4, 'k': 0.4,
            's': 0.3, 'f': 0.3, 'h': 0.3
        };
        
        consonants.forEach(c => {
            sonorityScore += sonorityScale[c.toLowerCase()] || 0.5;
        });
        
        const avgSonority = consonants.length ? sonorityScore / consonants.length : 0.5;
        
        // Calculate syllable rhythm
        const syllables = this.countSyllables(name);
        const syllableRhythm = syllables > 1 ? 
            Math.min(1, Math.max(0.4, (syllables - 1) / 3)) : 0.3;
        
        let score = (vowelHarmony * 0.4 + 
                    avgSonority * 0.3 + 
                    syllableRhythm * 0.3) * 100;
                    
        return Math.round(score);
    }

    analyzeSpectralFeatures(name: string): number {
        // Analyze letter frequencies
        const letterFreq: { [key: string]: number } = {};
        name.toLowerCase().split('').forEach(c => {
            letterFreq[c] = (letterFreq[c] || 0) + 1;
        });
        
        // Calculate letter diversity
        const uniqueLetters = Object.keys(letterFreq).length;
        const diversity = uniqueLetters / name.length;
        
        // Analyze consonant-vowel distribution
        const vowels = name.match(/[aeiou]/gi) || [];
        const consonants = name.match(/[bcdfghjklmnpqrstvwxz]/gi) || [];
        const vcRatio = Math.min(vowels.length, consonants.length) / 
                       Math.max(vowels.length, consonants.length);
        
        // Analyze letter patterns
        const patterns: { [key: string]: number } = {};
        for (let i = 0; i < name.length - 1; i++) {
            const pattern = name.substr(i, 2);
            patterns[pattern] = (patterns[pattern] || 0) + 1;
        }
        const patternDiversity = Object.keys(patterns).length / (name.length - 1);
        
        let score = (diversity * 0.4 + 
                    vcRatio * 0.3 + 
                    patternDiversity * 0.3) * 100;
                    
        return Math.round(score);
    }

    analyzeDistinctiveness(name: string): number {
        // Get phonetic codes
        const soundexCode = this.soundex.process(name);
        const metaphoneCode = this.metaphone.process(name);
        const dmCodes = this.doubleMetaphone.process(name);
        
        // Analyze uniqueness of phonetic representation
        const phoneticsUniqueness = 
            (soundexCode.length / 4 + 
             metaphoneCode.length / 4 + 
             dmCodes[0].length / 4) / 3;
        
        // Analyze letter rarity
        const letterRarity: { [key: string]: number } = {};
        const commonLetters = 'etaoinshrdlcumwfgypbvkjxqz';
        for (let i = 0; i < commonLetters.length; i++) {
            letterRarity[commonLetters[i]] = 1 - (i / commonLetters.length);
        }
        
        let rarityScore = 0;
        name.toLowerCase().split('').forEach(c => {
            rarityScore += letterRarity[c] || 0.5;
        });
        const avgRarity = rarityScore / name.length;
        
        // Analyze pattern uniqueness
        const patterns = name.match(/.{2}/g) || [];
        const uniquePatterns = new Set(patterns).size;
        const patternUniqueness = uniquePatterns / patterns.length;
        
        let score = (phoneticsUniqueness * 0.4 + 
                    avgRarity * 0.3 + 
                    patternUniqueness * 0.3) * 100;
                    
        return Math.round(score);
    }

    isVowel(char: string): boolean {
        return /[aeiou]/i.test(char);
    }
}

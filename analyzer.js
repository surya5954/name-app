import natural from 'natural';
import nlp from 'compromise';
import * as syllable from 'syllable';

export class NameAnalyzer {
    constructor() {
        this.soundex = natural.Soundex;
        this.metaphone = natural.Metaphone;
        this.doubleMetaphone = natural.DoubleMetaphone;
    }

    analyze(name) {
        const cleanName = name.toLowerCase().replace(/[^a-z\s]/g, '');
        
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

    countSyllables(text) {
        return syllable(text);
    }

    analyzeSyllableStructure(name) {
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

    analyzePhoneticTexture(name) {
        // Analyze consonant clusters
        const clusters = name.match(/[bcdfghjklmnpqrstvwxz]{2,}/gi) || [];
        const clusterComplexity = clusters.reduce((sum, cluster) => sum + cluster.length, 0) / name.length;
        
        // Analyze phonetic similarity using Soundex and Metaphone
        const soundexCode = this.soundex.process(name);
        const metaphoneCode = this.metaphone.process(name);
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

    analyzeRhythmFlow(name) {
        const syllables = this.countSyllables(name);
        const letters = name.length;
        
        // Analyze stress patterns using compromise
        const doc = nlp(name);
        const terms = doc.terms().data();
        
        // Calculate rhythm metrics
        const avgSyllableLength = letters / syllables;
        const rhythmVariety = terms.length > 1 ? 0.8 : 0.5;
        
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

    analyzeMusicality(name) {
        // Analyze vowel harmony
        const vowels = name.match(/[aeiou]/gi) || [];
        const uniqueVowels = new Set(vowels);
        const vowelHarmony = 1 - (uniqueVowels.size / vowels.length) || 0;
        
        // Analyze consonant sonority
        const consonants = name.match(/[bcdfghjklmnpqrstvwxz]/gi) || [];
        let sonorityScore = 0;
        
        const sonorityScale = {
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

    analyzeSpectralFeatures(name) {
        // Analyze letter frequencies
        const letterFreq = {};
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
        const patterns = {};
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

    analyzeDistinctiveness(name) {
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
        const letterRarity = {};
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

    isVowel(char) {
        return /[aeiou]/i.test(char);
    }
}

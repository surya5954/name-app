import NameAnalyzer from './nameAnalyzer.js';

console.log('🧪 Testing Name Analyzer...\n');

const analyzer = new NameAnalyzer();

// Test with a few sample names
const testNames = ['Alexander', 'Sophia', 'Gabriel', 'Luna', 'Isabella'];

console.log('Testing individual name analysis:');
console.log('=' .repeat(50));

testNames.forEach(name => {
    try {
        const result = analyzer.analyze(name);
        console.log(`\n📊 Analysis for "${name}":`);
        console.log(`   Syllable Structure: ${result.syllable_structure}`);
        console.log(`   Phonetic Texture: ${result.phonetic_texture}`);
        console.log(`   Rhythm & Flow: ${result.rhythm_flow}`);
        console.log(`   Musicality: ${result.musicality}`);
        console.log(`   Spectral Features: ${result.spectral_features}`);
        console.log(`   Distinctiveness: ${result.distinctiveness}`);
        
        // Calculate average
        const scores = [
            result.syllable_structure,
            result.phonetic_texture,
            result.rhythm_flow,
            result.musicality,
            result.spectral_features,
            result.distinctiveness
        ];
        const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        console.log(`   Average Score: ${average}`);
        
    } catch (error) {
        console.error(`❌ Error analyzing "${name}":`, error.message);
    }
});

console.log('\n' + '='.repeat(50));
console.log('✅ Name Analyzer test completed successfully!');
console.log('\n🚀 You can now start the server with: npm start');
console.log('🔧 Or start in development mode with: npm run dev');

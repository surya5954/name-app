# Name Harmony Analyzer

A sophisticated name analysis tool that evaluates names based on their phonetic, musical, and linguistic characteristics. This application provides detailed insights into various aspects of names, helping users understand their sonic and structural qualities.

## Features

- **Syllable Structure Analysis**: Evaluates the complexity and distribution of syllables
- **Phonetic Texture**: Analyzes consonant clusters and sound patterns
- **Rhythm Flow**: Measures the rhythmic qualities and transitions in the name
- **Musicality**: Assesses vowel harmony and consonant sonority
- **Spectral Features**: Analyzes letter frequencies and patterns
- **Distinctiveness**: Evaluates the uniqueness of the name's phonetic structure

## Technical Stack

- **Frontend**: HTML, CSS, JavaScript (ES Modules)
- **Backend**: Node.js with Express
- **NLP Libraries**:
  - `natural` - For phonetic analysis (Soundex, Metaphone)
  - `compromise` - For text processing and analysis
  - `syllable` - For syllable counting

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/surya5954/name-app.git
   cd name-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Enter a name in the input field
2. Click "Analyze" or press Enter
3. View the detailed analysis results including:
   - Overall score
   - Individual component scores
   - Detailed breakdowns of each analysis aspect

## Analysis Components

### Syllable Structure Analysis
Evaluates the complexity and balance of syllables in the name. Considers:
- Syllable count and distribution
- Letter-to-syllable ratio
- Vowel patterns

### Phonetic Texture
Analyzes the sound qualities using:
- Consonant cluster analysis
- Soundex and Metaphone algorithms
- Vowel-consonant pattern evaluation

### Rhythm Flow
Measures the name's rhythmic qualities:
- Syllable transitions
- Stress patterns
- Letter flow characteristics

### Musicality
Assesses the musical qualities:
- Vowel harmony
- Consonant sonority
- Syllabic rhythm

### Spectral Features
Analyzes structural patterns:
- Letter frequency distribution
- Consonant-vowel ratios
- Pattern diversity

### Distinctiveness
Evaluates uniqueness through:
- Phonetic code analysis
- Letter rarity scoring
- Pattern uniqueness

## Architecture

The application follows a modular architecture:

- `analyzer.js` - Core analysis engine
- `server.js` - Express server setup
- `app.js` - Main application entry point
- `ui.js` - User interface logic

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Surya Prakash - [GitHub Profile](https://github.com/surya5954)

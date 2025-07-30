import React, { useState, useEffect } from "react";
import "./style.css";
import { NameAnalyzer } from "./analyzer";
import { AnalysisResult, SortOption } from "./types";

const App: React.FC = () => {
  const [analyzer, setAnalyzer] = useState<NameAnalyzer | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisResult[]>([]);
  const [currentAnalysis, setCurrentAnalysis] =
    useState<AnalysisResult | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAnalyzer(new NameAnalyzer());
  }, []);

  useEffect(() => {
    if (analyzer) {
      const sampleNames = ["Luna", "Alexander", "Sophia", "Gabriel", "Isabella"];
      const sampleData = sampleNames.map((name) => analyzer.analyze(name));
      setAnalysisData(sampleData);
    }
  }, [analyzer]);

  const calculateAverage = (analysis: AnalysisResult): number => {
    const scores = [
      analysis.syllable_structure,
      analysis.phonetic_texture,
      analysis.rhythm_flow,
      analysis.musicality,
      analysis.spectral_features,
      analysis.distinctiveness,
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getScoreClass = (score: number): string => {
    if (score >= 80) return "excellent";
    if (score >= 60) return "good";
    if (score >= 40) return "average";
    return "poor";
  };

  const handleAnalyzeName = () => {
    if (!nameInput.trim()) {
      alert("Please enter a name to analyze");
      return;
    }
    if (
      analysisData.find(
        (item) => item.name.toLowerCase() === nameInput.toLowerCase()
      )
    ) {
      alert("This name has already been analyzed");
      return;
    }
    if (analyzer) {
      const analysis = analyzer.analyze(nameInput);
      setAnalysisData([analysis, ...analysisData]);
      setCurrentAnalysis(analysis);
      setNameInput("");
    }
  };

  const handleClearAll = () => {
    setAnalysisData([]);
    setCurrentAnalysis(null);
  };

  const handleDelete = (index: number) => {
    const newData = [...analysisData];
    newData.splice(index, 1);
    setAnalysisData(newData);
    if (currentAnalysis?.name === analysisData[index].name) {
      setCurrentAnalysis(null);
    }
  };

  const sortedAndFilteredData = [...analysisData]
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === "average") {
        return calculateAverage(b) - calculateAverage(a);
      }
      return (b as any)[sortOption] - (a as any)[sortOption];
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortOptions: SortOption[] = [
    { value: "name", label: "Sort by Name" },
    { value: "syllable_structure", label: "Sort by Syllable Structure" },
    { value: "phonetic_texture", label: "Sort by Phonetic Texture" },
    { value: "rhythm_flow", label: "Sort by Rhythm & Flow" },
    { value: "musicality", label: "Sort by Musicality" },
    { value: "spectral_features", label: "Sort by Spectral Features" },
    { value: "distinctiveness", label: "Sort by Distinctiveness" },
    { value: "average", label: "Sort by Average Score" },
  ];

  return (
    <div className="container">
      <header className="header">
        <h1>Name Sound Analyzer</h1>
        <p className="subtitle">
          Analyze the sound qualities and characteristics of human names using
          computational linguistics principles
        </p>
      </header>

      <main className="main-content">
        <section className="input-section card">
          <div className="card__body">
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label">
                Enter a name to analyze:
              </label>
              <div className="input-controls">
                <input
                  type="text"
                  id="nameInput"
                  className="form-control"
                  placeholder="e.g., Daksh Anand or Atharv"
                  autoComplete="off"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleAnalyzeName();
                  }}
                />
                <div className="button-group">
                  <button
                    id="analyzeBtn"
                    className="btn btn--primary"
                    onClick={handleAnalyzeName}
                  >
                    Analyze
                  </button>
                  <button
                    id="clearBtn"
                    className="btn btn--secondary"
                    onClick={handleClearAll}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {currentAnalysis && (
          <section id="currentAnalysis" className="current-analysis">
            <div className="card">
              <div className="card__header">
                <h3 id="currentNameTitle">
                  Analysis for "{currentAnalysis.name}"
                </h3>
              </div>
              <div className="card__body">
                <div className="analysis-grid" id="analysisGrid">
                  {Object.keys(currentAnalysis)
                    .filter((key) => key !== "name")
                    .map((key) => (
                      <div
                        className={`analysis-item score-item ${getScoreClass(
                          (currentAnalysis as any)[key]
                        )}`}
                        key={key}
                      >
                        <span className="score-label">
                          {key.replace(/_/g, " ")}:
                        </span>
                        <span className="score-value">
                          {(currentAnalysis as any)[key]}
                        </span>
                      </div>
                    ))}
                  <div
                    className={`analysis-item score-item ${getScoreClass(
                      calculateAverage(currentAnalysis)
                    )}`}
                  >
                    <span className="score-label">Overall Score:</span>
                    <span className="score-value">
                      {calculateAverage(currentAnalysis)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="results-section">
          <div className="section-header">
            <h2>Analysis History</h2>
            <div className="table-controls">
              <select
                id="sortSelect"
                className="form-control"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="searchInput"
                className="form-control"
                placeholder="Search names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {sortedAndFilteredData.length > 0 ? (
            <div className="table-container">
              <table id="resultsTable" className="results-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="tooltip-header">
                      Syllable Structure
                      <span className="tooltip">
                        Analysis of syllable count, patterns, and rhythmic
                        structure
                      </span>
                    </th>
                    <th className="tooltip-header">
                      Phonetic Texture
                      <span className="tooltip">
                        Examination of consonant clusters, vowel patterns, and
                        articulation features
                      </span>
                    </th>
                    <th className="tooltip-header">
                      Rhythm & Flow
                      <span className="tooltip">
                        Assessment of syllable transitions, stress patterns,
                        and overall flow
                      </span>
                    </th>
                    <th className="tooltip-header">
                      Musicality
                      <span className="tooltip">
                        Measurement of melodiousness and harmony in sound
                        patterns
                      </span>
                    </th>
                    <th className="tooltip-header">
                      Spectral Features
                      <span className="tooltip">
                        Conceptual analysis of brightness, softness, and tonal
                        qualities
                      </span>
                    </th>
                    <th className="tooltip-header">
                      Distinctiveness
                      <span className="tooltip">
                        Evaluation of uniqueness, memorability, and standout
                        characteristics
                      </span>
                    </th>
                    <th>Average</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                  {sortedAndFilteredData.map((analysis, index) => (
                    <tr key={index}>
                      <td className="name-cell">{analysis.name}</td>
                      <td
                        className={`score-cell ${getScoreClass(
                          analysis.syllable_structure
                        )}`}
                      >
                        {analysis.syllable_structure}
                      </td>
                      <td
                        className={`score-cell ${getScoreClass(
                          analysis.phonetic_texture
                        )}`}
                      >
                        {analysis.phonetic_texture}
                      </td>
                      <td
                        className={`score-cell ${getScoreClass(
                          analysis.rhythm_flow
                        )}`}
                      >
                        {analysis.rhythm_flow}
                      </td>
                      <td
                        className={`score-cell ${getScoreClass(
                          analysis.musicality
                        )}`}
                      >
                        {analysis.musicality}
                      </td>
                      <td
                        className={`score-cell ${getScoreClass(
                          analysis.spectral_features
                        )}`}
                      >
                        {analysis.spectral_features}
                      </td>
                      <td
                        className={`score-cell ${getScoreClass(
                          analysis.distinctiveness
                        )}`}
                      >
                        {analysis.distinctiveness}
                      </td>
                      <td
                        className={`average-cell ${getScoreClass(
                          calculateAverage(analysis)
                        )}`}
                      >
                        {calculateAverage(analysis)}
                      </td>
                      <td className="actions-cell">
                        <button
                          onClick={() => handleDelete(index)}
                          className="delete-btn"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="emptyState" className="empty-state">
              <p>No names analyzed yet. Enter a name above to get started!</p>
            </div>
          )}
        </section>

        <section className="help-section card">
          <div className="card__header">
            <h3>How It Works</h3>
          </div>
          <div className="card__body">
            <div className="help-grid">
              <div className="help-item">
                <h4>Syllable Structure</h4>
                <p>
                  Analyzes the number and pattern of syllables, evaluating
                  rhythmic complexity and flow.
                </p>
              </div>
              <div className="help-item">
                <h4>Phonetic Texture</h4>
                <p>
                  Examines consonant clusters, vowel patterns, and the
                  smoothness of articulation.
                </p>
              </div>
              <div className="help-item">
                <h4>Rhythm & Flow</h4>
                <p>
                  Assesses how syllables transition and the overall rhythmic
                  quality of the name.
                </p>
              </div>
              <div className="help-item">
                <h4>Musicality</h4>
                <p>
                  Measures the melodic and harmonic qualities based on vowel
                  distribution and sound patterns.
                </p>
              </div>
              <div className="help-item">
                <h4>Spectral Features</h4>
                <p>
                  Conceptually analyzes the brightness and tonal
                  characteristics of the sounds.
                </p>
              </div>
              <div className="help-item">
                <h4>Distinctiveness</h4>
                <p>
                  Evaluates how unique and memorable the name sounds compared
                  to common patterns.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;

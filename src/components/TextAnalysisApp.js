import React, { useState } from 'react';
import './TextAnalysisApp.css'; // Import the CSS file

function TextAnalysisApp() {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [uniqueWordsInsensitive, setUniqueWordsInsensitive] = useState(null);
  const [uniqueWordsSensitive, setUniqueWordsSensitive] = useState(null);
  const [characterCount, setCharacterCount] = useState(null);
  const [activeOperation, setActiveOperation] = useState(null);

  // Handle text input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Calculate unique words (case-insensitive)
  const generateUniqueWordCountInsensitive = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    setUniqueWordsInsensitive(uniqueWords.size);
  };

  // Calculate unique words (case-sensitive)
  const generateUniqueWordCountSensitive = () => {
    const words = text.match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    setUniqueWordsSensitive(uniqueWords.size);
  };

  // Count characters excluding spaces and punctuation
  const generateCharacterCount = () => {
    const chars = text.replace(/[^a-zA-Z0-9]/g, '');
    setCharacterCount(chars.length);
  };

  // Handle string replacement and highlight replaced words
  const handleReplace = () => {
    const regex = new RegExp(`(${searchString})`, 'g');
    const replacedText = text.replaceAll(regex, `<mark>${replaceString}</mark>`);
    setModifiedText(replacedText);
  };

  // Clear all inputs and outputs
  const handleClear = () => {
    setText('');
    setSearchString('');
    setReplaceString('');
    setModifiedText('');
    setUniqueWordsInsensitive(null);
    setUniqueWordsSensitive(null);
    setCharacterCount(null);
    setActiveOperation(null);
  };

  return (
    <div className="app-container">
      <h1 className="title">Real-Time Text Analysis</h1>

      {/* Textarea for user input */}
      <textarea 
        className="text-area"
        rows="10" 
        cols="50" 
        value={text} 
        onChange={handleTextChange} 
        placeholder="Type or paste your text here..."
      />

      {/* Operation buttons */}
      <div className="operation-buttons">
        <button 
          className={`operation-button ${activeOperation === 'countWords' ? 'active' : ''}`} 
          onClick={() => {
            setActiveOperation('countWords');
            generateUniqueWordCountInsensitive();
            generateUniqueWordCountSensitive();
          }}
        >
          Count Words
        </button>
        <button 
          className={`operation-button ${activeOperation === 'countChars' ? 'active' : ''}`} 
          onClick={() => {
            setActiveOperation('countChars');
            generateCharacterCount();
          }}
        >
          Count Characters
        </button>
        <button 
          className={`operation-button ${activeOperation === 'replaceWord' ? 'active' : ''}`} 
          onClick={() => setActiveOperation('replaceWord')}
        >
          Replace Word
        </button>
        <button 
          className="clear-button"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {/* Conditional rendering based on selected operation */}
      {activeOperation === 'countWords' && (
        <div className="statistics">
          <p><strong>Unique Words (Case-Insensitive):</strong> {uniqueWordsInsensitive}</p>
          <p><strong>Unique Words (Case-Sensitive):</strong> {uniqueWordsSensitive}</p>
        </div>
      )}

      {activeOperation === 'countChars' && (
        <div className="statistics">
          <p><strong>Character Count (Excluding Spaces and Punctuation):</strong> {characterCount}</p>
        </div>
      )}

      {activeOperation === 'replaceWord' && (
        <div className="replace-section">
          <input 
            type="text" 
            className="input-box"
            placeholder="Search String" 
            value={searchString} 
            onChange={(e) => setSearchString(e.target.value)} 
          />
          <input 
            type="text" 
            className="input-box"
            placeholder="Replace With" 
            value={replaceString} 
            onChange={(e) => setReplaceString(e.target.value)} 
          />
          <button className="replace-button" onClick={handleReplace}>Replace All</button>

          {/* Display original and modified text */}
          {modifiedText && (
            <div className="output-section">
              <h3>Original Text:</h3>
              <div className="output-text original">{text}</div>

              <h3>Modified Text with Highlight:</h3>
              <div className="output-text modified" dangerouslySetInnerHTML={{ __html: modifiedText }}></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TextAnalysisApp;

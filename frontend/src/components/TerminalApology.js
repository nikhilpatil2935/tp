import React, { useState, useEffect, useRef } from 'react';
import './TerminalApology.css';

const TerminalApology = () => {
  const [lines, setLines] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerText, setSpinnerText] = useState('');
  const terminalRef = useRef(null);

  const spinnerFrames = ['|', '/', '-', '\\'];
  
  const asciiHeart = `       ♡♡♡     ♡♡♡
     ♡♡♡♡♡   ♡♡♡♡♡
   ♡♡♡♡♡♡♡ ♡♡♡♡♡♡♡
  ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
  ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
   ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
     ♡♡♡♡♡♡♡♡♡♡♡
       ♡♡♡♡♡♡♡
         ♡♡♡
          ♡`;

  const clearScreen = () => {
    setLines([]);
  };

  const addLine = (text, className = '') => {
    setLines(prev => [...prev, { text, className, id: Date.now() + Math.random() }]);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const typeText = async (text, delay = 50) => {
    let displayed = '';
    for (let char of text) {
      displayed += char;
      setLines(prev => {
        const newLines = [...prev];
        if (newLines.length > 0) {
          newLines[newLines.length - 1] = { 
            ...newLines[newLines.length - 1], 
            text: displayed 
          };
        }
        return newLines;
      });
      await sleep(delay);
    }
  };

  const showSpinnerAnimation = async (duration) => {
    setShowSpinner(true);
    const startTime = Date.now();
    let frameIndex = 0;
    
    while (Date.now() - startTime < duration) {
      setSpinnerText(spinnerFrames[frameIndex % spinnerFrames.length]);
      frameIndex++;
      await sleep(150);
    }
    
    setShowSpinner(false);
    setSpinnerText('');
  };

  const runApologyScript = async () => {
    setIsAnimating(true);
    
    // Clear screen
    clearScreen();
    await sleep(500);
    
    // Print header
    addLine('--- APOLOGY.EXE ---', 'header');
    await sleep(200);
    addLine('For: The Amazing Tejal', 'subtitle');
    
    // Wait 2 seconds
    await sleep(2000);
    
    // Scanning sequence with 1.5s pauses
    addLine('Scanning Boyfriend...', 'scanning');
    await sleep(1500);
    
    addLine('Brain.exe...', 'process');
    await sleep(300);
    addLine(' -> Status: Not Found', 'error');
    await sleep(1500);
    
    addLine('Heart.dll...', 'process');
    await sleep(300);
    addLine(' -> Status: Belongs to Tejal', 'success');
    await sleep(1500);
    
    // Analysis with spinner
    addLine('Analyzing recent idiocy...', 'analyzing');
    await sleep(500);
    
    // Show spinner for 4 seconds
    await showSpinnerAnimation(4000);
    
    // Clear screen for results
    clearScreen();
    await sleep(500);
    
    // Print results
    addLine('*** SCAN COMPLETE ***', 'complete');
    await sleep(300);
    addLine('Error: Critical Dumb-Dumb Failure.', 'error');
    await sleep(300);
    addLine('Severity: MAXIMUM.', 'severity');
    await sleep(300);
    addLine('Deploying Immediate Fix:', 'fix-header');
    await sleep(500);
    
    // Package contents
    const packages = [
      ' -> A lifetime supply of virtual chocolate.',
      ' -> One coupon for a proper head massage.',
      ' -> A solemn vow to watch endless Instagram reels together.',
      ' -> Full control over all speakers and screens.',
      ' -> And one massive, heartfelt...'
    ];
    
    for (let pkg of packages) {
      addLine(pkg, 'package');
      await sleep(800);
    }
    
    await sleep(500);
    addLine('"I AM SO, SO SORRY!"', 'apology');
    await sleep(1000);
    
    // ASCII Heart
    addLine(asciiHeart, 'heart');
    await sleep(1000);
    
    // Final message
    addLine('I was a total goofball.', 'final');
    await sleep(500);
    addLine('I love you.', 'final love');
    await sleep(500);
    addLine('', '');
    addLine('- Your very sorry guy.', 'signature');
    
    setIsAnimating(false);
  };

  useEffect(() => {
    // Auto-start the script when component mounts
    const timer = setTimeout(() => {
      runApologyScript();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="terminal-container" ref={terminalRef}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">Terminal - Apology Script</div>
      </div>
      
      <div className="terminal-content">
        {lines.map((line) => (
          <div key={line.id} className={`terminal-line ${line.className}`}>
            {line.text}
          </div>
        ))}
        
        {showSpinner && (
          <div className="terminal-line spinner">
            Analyzing recent idiocy... {spinnerText}
          </div>
        )}
        
        {isAnimating && (
          <div className="terminal-cursor">_</div>
        )}
      </div>
    </div>
  );
};

export default TerminalApology;
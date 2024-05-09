import React, { useEffect, useState } from 'react';
import './App.css'; // Import your CSS file

function App() {
  const [compressionRatio, setCompressionRatio] = useState(0.5); // Initial value

  useEffect(() => {
    const scripts = [
      'js/pdfkit-standalone-0.10.0.js',
      'js/blob-stream-0.1.3.js',
      'js/pdf.min-2.5.207.js',
      'js/FileSaver.min-2.0.4.js',
      'js/sortable.min.1.10.2.js'
    ];

    scripts.forEach(script => {
      const scriptElement = document.createElement('script');
      scriptElement.src = process.env.PUBLIC_URL + '/' + script; // Ensure correct paths
      scriptElement.defer = true;
      scriptElement.onload = () => console.log(`${script} loaded successfully`);
      scriptElement.onerror = (error) => console.error(`Error loading ${script}:`, error);
      document.body.appendChild(scriptElement);
    });
    // Any initialization code you want to run when the component mounts
    // This is where you might want to initialize your JavaScript functionality
    import('./script/index.js').then(module => {
      // Script is loaded, you can use its functionality here
    }).catch(error => {
      // Handle any errors that occurred during script loading
      console.error('An error occurred while loading the script:', error);
    });
  }, []);

  const handleCompressionChange = (event) => {
    setCompressionRatio(event.target.value);
  };

  return (
    <div id="main_container">
      <div id="pdf_input_container">
        <input id="pdf_input" type="file" accept="application/pdf" multiple />
      </div>
      <div id="selected_pdf_container">
        <div id="selected_pdf_list" title="Hold and drag the handle to order the output PDF pages"></div>
      </div>
      <div id="range_container">
        <input 
          id="compress_input" 
          title="Compression Ratio" 
          type="range" 
          min="0" 
          max="1" 
          value={compressionRatio} 
          step="0.1" 
          onChange={handleCompressionChange} // Add onChange handler
        />
        <p id="compress_input_output" title="Higher the Value, Better the Compression">
          {compressionRatio}
        </p>
      </div>
      <div id="compress_pdf_container">
        <button id="compress_pdf" title="Compress and Combine selected PDF files in Specified order">
          Compress PDF
        </button>
      </div>
      <div style={{ maxWidth: '0px', maxHeight: '0px', overflow: 'hidden' }}>
        <canvas id="page_canvas"></canvas>
      </div>
    </div>
  );
}

export default App;

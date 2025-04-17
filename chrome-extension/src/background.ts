// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ANALYZE_FILE') {
    handleFileAnalysis(message.file);
  }
});

async function handleFileAnalysis(file: File) {
  try {
    // Convert file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = async () => {
      const base64File = reader.result as string;
      
      // Send to your backend API
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: base64File,
          filename: file.name
        })
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();

      // Send result back to popup
      chrome.runtime.sendMessage({
        type: 'ANALYSIS_RESULT',
        data: {
          status: 'complete',
          data: result
        }
      });
    };

    reader.onerror = () => {
      chrome.runtime.sendMessage({
        type: 'ANALYSIS_RESULT',
        data: {
          status: 'error',
          error: 'Failed to read file'
        }
      });
    };
  } catch (error) {
    chrome.runtime.sendMessage({
      type: 'ANALYSIS_RESULT',
      data: {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    });
  }
} 
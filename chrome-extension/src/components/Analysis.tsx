import React, { useEffect, useState } from 'react';
import { IconLoader2 } from '@tabler/icons-react';
import { cn } from '../lib/utils';

interface AnalysisResult {
  status: 'loading' | 'complete' | 'error';
  data?: {
    verdict: string;
    confidence: number;
    details: string[];
  };
  error?: string;
}

export const Analysis: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult>({ status: 'loading' });

  useEffect(() => {
    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'ANALYSIS_RESULT') {
        setResult(message.data);
      }
    });
  }, []);

  if (result.status === 'loading') {
    return (
      <div className="flex items-center justify-center p-4">
        <IconLoader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Analyzing file...</span>
      </div>
    );
  }

  if (result.status === 'error') {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
        <p className="text-sm">{result.error}</p>
      </div>
    );
  }

  if (!result.data) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Analysis Result</h2>
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          result.data.verdict === 'malicious' ? "bg-destructive/10 text-destructive" :
          result.data.verdict === 'benign' ? "bg-green-500/10 text-green-500" :
          "bg-yellow-500/10 text-yellow-500"
        )}>
          {result.data.verdict}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Confidence</span>
          <span className="font-medium">{result.data.confidence}%</span>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Details</h3>
          <ul className="space-y-1">
            {result.data.details.map((detail, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}; 
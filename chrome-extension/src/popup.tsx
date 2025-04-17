import React from 'react';
import { createRoot } from 'react-dom/client';
import { FileUpload } from './components/FileUpload';
import { Analysis } from './components/Analysis';
import './styles/globals.css';

const Popup = () => {
  return (
    <div className="w-[400px] h-[600px] bg-background text-foreground p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">PayloadPrism</h1>
        <FileUpload />
        <Analysis />
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Popup />); 
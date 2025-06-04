// Import React and its DOM rendering functionality
import React from 'react'
import { createRoot } from 'react-dom/client'

// Import the main App component and global styles
import App from './App.tsx'
import './index.css'

// Get the root DOM element where the React app will be mounted
const rootElement = document.getElementById('root')

// Check if the root element exists in the DOM
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

// Create a root and render the application
const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

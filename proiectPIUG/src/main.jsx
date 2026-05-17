import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import App from "./Compoments/App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

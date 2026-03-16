import React from 'react';
import HomePage from './pages/HomePage';

/**
 * Componente principal de la aplicación.
 * @component
 */
function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <HomePage />
    </div>
  );
}

export default App;
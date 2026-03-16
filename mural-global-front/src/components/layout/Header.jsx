import React, { useState } from 'react';
import Icon from '../common/Icon';

/**
 * Barra de navegación superior.
 * @component
 */
function Header() {
  const [activeTab, setActiveTab] = useState('inicio');

  return (
    <header className="w-full max-w-[800px] flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
      <div className="flex items-center gap-3">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-slate-900">
          <Icon name="blur_on" className="font-bold" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Mural Global</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('inicio')}
            className={`text-sm font-semibold pb-1 transition-colors ${
              activeTab === 'inicio' 
                ? 'border-b-2 border-primary' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveTab('explorar')}
            className={`text-sm font-medium transition-colors ${
              activeTab === 'explorar'
                ? 'text-slate-900 dark:text-slate-100'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Explorar
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
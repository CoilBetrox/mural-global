import React from 'react';

/**
 * Pie de página de la aplicación.
 * @component
 */
function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full max-w-[800px] px-6 py-12 border-t border-slate-200 dark:border-slate-800 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <p className="text-sm font-bold">Mural Global</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Plataforma de discusión pública anónima. © {currentYear}
        </p>
      </div>
      
      <div className="flex gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <a 
          href="#" 
          className="hover:text-primary transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Privacidad
        </a>
        <a 
          href="#" 
          className="hover:text-primary transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Términos
        </a>
        <a 
          href="#" 
          className="hover:text-primary transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Contacto
        </a>
      </div>
    </footer>
  );
}

export default Footer;
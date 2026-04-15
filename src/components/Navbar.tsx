import { Logo } from './ui/Logo';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-scala-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="container-custom h-20 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#como-funciona" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Cómo funciona</a>
          <a href="#resultados" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Resultados</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/formulario" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button variant="primary" className="hidden sm:inline-flex text-sm py-2.5 px-5">
              Agendar llamada
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

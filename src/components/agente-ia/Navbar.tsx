import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-scala-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="container-custom h-20 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link to={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button variant="primary" className="hidden sm:inline-flex text-sm py-2.5 px-5">
              Implementar Sentinel
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

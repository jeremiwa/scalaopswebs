import { Logo } from './ui/Logo';

export const Footer = () => {
  return (
    <footer className="bg-[#030712] py-12 border-t border-white/5 text-center">
      <div className="container-custom flex flex-col items-center gap-6">
        <Logo />
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} SCALA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

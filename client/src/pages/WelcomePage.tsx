import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/UI/Button';
import logo from '@/assets/logo.png';
export const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-between p-6 py-12">
      {/* 1. Área Superior/Central: Logo */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-48 md:w-64 mb-8">
          {/* Si el logo es SVG o PNG */}
          <img
            src={logo}
            alt="Linguatribe Logo"
            className="w-full h-auto object-contain drop-shadow-sm"
          />
        </div>
        {/* Si el logo ya tiene las letras, borra este h1. Si es solo el icono, déjalo. */}
        {/* <h1 className="font-title text-4xl font-bold text-brand-dark tracking-widest mt-4">
          LINGUATRIBE
        </h1> */}
      </div>

      {/* 2. Área Inferior: Botones */}
      <div className="w-full max-w-sm space-y-4 mb-8">
        {/* Botón Sign In (Sólido) */}
        <Button
          fullWidth
          variant="primary"
          onClick={() => {
            void navigate('/login');
          }}
          className="bg-brand-dark hover:bg-[#005860] text-white border-none h-14 text-lg rounded-xl shadow-lg shadow-brand-dark/20"
        >
          Sign In
        </Button>

        {/* Botón Create Account (Borde) */}
        <Button
          fullWidth
          variant="outline"
          onClick={() => {
            void navigate('/register');
          }}
          className="border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white h-14 text-lg rounded-xl bg-transparent"
        >
          Create account
        </Button>
      </div>
    </div>
  );
};

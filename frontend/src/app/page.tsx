'use client';

import { useRouter } from 'next/navigation';
import { Pill, AlarmClock } from 'lucide-react'; // Importar ícones do Lucide
import CustomButton from './components/CustomButton';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      {/* Ícones juntos, azul */}
      <div className="flex items-center space-x-2 mb-4">
        <Pill size={36} className="text-blue-400" />
        <AlarmClock size={36} className="text-blue-400" />
      </div>

      <h1 className="text-3xl font-bold text-gray-700 text-center mb-10">
        LembreMed
      </h1>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        {/*<button
          onClick={() => router.push('/cadastro')}
          className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 rounded-2xl transition"
        >
          Cadastrar Lembrete
        </button>

        <button
          onClick={() => router.push('/consulta')}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-4 rounded-2xl transition"
        >
          Consultar Lembrete
        </button>*/}

        <CustomButton
          onClick={() => router.push('/cadastro')}
          variant="primary"
        >
          Cadastrar Lembrete
        </CustomButton>

        <CustomButton
          onClick={() => router.push('/consulta')}
          variant="secondary"
        >
          Consultar Lembrete
        </CustomButton>
      </div>
    </div>
  );
}

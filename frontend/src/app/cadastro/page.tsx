'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from '../components/CustomButton';
import CustomTextBox from '../components/CustomTextBox';

export default function CadastroPage() {
  const router = useRouter();  const [form, setForm] = useState({
    nome: '',
    idade: '',
    notificacao: false,
    telefone: '',
    email: '',
    medicamento: '',
    doseValor: '',
    doseUnidade: 'ml',
    usoContinuo: false,
    dias: '',
    horario: '',
    posologiaPorIntervalo: false, // para escolher entre horário fixo ou intervalo
    dataInicio: '',
    horarioInicio: '',
    intervalo: '',
    quantidade: '',
  });const [descricao, setDescricao] = useState('');
  const [carregandoDescricao, setCarregandoDescricao] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarErro, setMostrarErro] = useState(false);
  const [mostrarSucesso, setMostrarSucesso] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [mostrarExemploTelefone, setMostrarExemploTelefone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target;
  
    // Verifica se target é input do tipo checkbox
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();    // Validações básicas:
    if (!form.nome.trim() || !form.medicamento.trim()) {
      setMensagemErro('Por favor, preencha os campos Nome e Medicamento.');
      setMostrarErro(true);
      return;
    }

    if (!form.doseValor || Number(form.doseValor) <= 0) {
      setMensagemErro('Informe uma dose válida.');
      setMostrarErro(true);
      return;
    }

    if (!form.usoContinuo && !form.posologiaPorIntervalo && !form.horario) {
      setMensagemErro('Informe um horário fixo ou escolha posologia por intervalo.');
      setMostrarErro(true);
      return;
    }

    if (form.usoContinuo === false && !form.dias) {
      setMensagemErro('Informe por quantos dias.');
      setMostrarErro(true);
      return;
    }    if (form.posologiaPorIntervalo) {
      if (!form.dataInicio || !form.horarioInicio || !form.intervalo || !form.quantidade) {
        setMensagemErro('Preencha todos os campos de posologia por intervalo.');
        setMostrarErro(true);
        return;
      }
    }

    let telefoneFormatado = null;
    if (form.telefone) {
      const numeros = form.telefone.replace(/\D/g, '');
      telefoneFormatado = `+${numeros}`;
    }    const body = {
      nome: form.nome,
      idade: Number(form.idade),
      notificacao: form.notificacao,
      telefone: form.notificacao ? telefoneFormatado : null,
      email: form.notificacao ? form.email : null,
      medicamento: form.medicamento,
      doseValor: Number(form.doseValor),
      doseUnidade: form.doseUnidade,
      usoContinuo: form.usoContinuo,
      dias: form.usoContinuo ? null : Number(form.dias),
      horario: form.posologiaPorIntervalo ? form.horarioInicio : form.horario,
      usoInicio: form.posologiaPorIntervalo ? new Date(`${form.dataInicio}T${form.horarioInicio}`).toISOString() : null,
      intervalo: form.posologiaPorIntervalo ? Number(form.intervalo) : null,
      quantidade: form.posologiaPorIntervalo ? Number(form.quantidade) : null,
    };

    try {
      const response = await fetch('https://projetointegrador-4-6txb.onrender.com/lembrete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });      if (response.ok) {
        setMostrarSucesso(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);} else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 'Erro ao cadastrar lembrete. Tente novamente.';
        setMensagemErro(errorMessage);
        setMostrarErro(true);
      }
    } catch (error) {
      setMensagemErro('Erro de conexão. Verifique se o servidor está funcionando.');
      setMostrarErro(true);
      console.error('Erro ao cadastrar:', error);
    }
  }
  async function buscarDescricaoMedicamento() {
    if (!form.medicamento) {
      setMensagemErro('Por favor, preencha o nome do medicamento para pesquisar.');
      setMostrarErro(true);
      return;
    }

    setCarregandoDescricao(true);

    const resposta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Explique de forma resumida (em até 3 linhas) para que serve o medicamento ${form.medicamento}.`
          }]
        }]
      })
    });

    const data = await resposta.json();
    const textoGerado = data.candidates?.[0]?.content?.parts?.[0]?.text || "Descrição não encontrada.";

    setDescricao(textoGerado);
    setMostrarModal(true);
    setCarregandoDescricao(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Cadastrar Lembrete</h1>        {carregandoDescricao && (
          <p className="text-blue-500 text-center font-semibold mb-4">Buscando informações do medicamento...</p>
        )}

        <CustomTextBox name='nome' placeholder='Nome' value={form.nome} onChange={handleChange} required />
        <CustomTextBox name='idade' placeholder='Idade' value={form.idade} onChange={handleChange} required type="number" />

        <div className="flex items-center space-x-2">
          <input type="checkbox" name="notificacao" checked={form.notificacao} onChange={handleChange} />
          <label className="text-gray-600">Receber Notificação</label>
        </div>        {form.notificacao && (
          <>            
          <div className="relative">
            <input
              name="telefone"
              placeholder="+55 (11) 91234-5678"
              value={form.telefone}
              onChange={handleChange}
              onFocus={() => setMostrarExemploTelefone(true)}
              onBlur={() => setMostrarExemploTelefone(false)}
              type="tel"
              required
              className="w-full border border-gray-300 rounded-2xl text-gray-900 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {mostrarExemploTelefone && (
              <div className="mt-1 text-sm text-gray-500">
                <span className="font-medium">Exemplo:</span> +55 (11) 91234-5678
              </div>
            )}
          </div>

            <CustomTextBox
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </>
        )}

        <CustomTextBox name='medicamento' placeholder='Medicamento' value={form.medicamento} onChange={handleChange} required />

        <CustomButton type="button" onClick={buscarDescricaoMedicamento} variant="primary">Procurar informações sobre este medicamento</CustomButton>        {/* Dose - valor e unidade */}
        <div className="flex space-x-2">
          <CustomTextBox
            name="doseValor"
            placeholder="Dose (valor)"
            value={form.doseValor}
            onChange={handleChange}
            type="number"
            step="0.01"
            min="0"
            required
          />
          <select
            name="doseUnidade"
            value={form.doseUnidade}
            onChange={handleChange}
            className="border border-gray-300 rounded-2xl text-gray-900 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="ml">ml</option>
            <option value="g">g</option>
            <option value="cápsula">cápsula</option>
            <option value="comprimido">comprimido</option>
            <option value="gotas">gotas</option>
            {/* Adicione mais unidades se quiser */}
          </select>
        </div>

        {/* Uso contínuo */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="usoContinuo" checked={form.usoContinuo} onChange={handleChange} />
          <label className="text-gray-900">Uso contínuo</label>
        </div>

        {/* Dias (aparece só se não for uso contínuo) */}
        {!form.usoContinuo && (
          <CustomTextBox
            name="dias"
            placeholder="Por quantos dias"
            type="number"
            value={form.dias}
            onChange={handleChange}
            required
          />
        )}

        {/* Escolha entre horário fixo e posologia por intervalo */}
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="horarioFixo"
            name="posologiaPorIntervalo"
            value="false"
            checked={!form.posologiaPorIntervalo}
            onChange={() => setForm(prev => ({ ...prev, posologiaPorIntervalo: false }))}
          />
          <label htmlFor="horarioFixo" className="text-gray-600">Horário fixo</label>

          <input
            type="radio"
            id="posologiaIntervalo"
            name="posologiaPorIntervalo"
            value="true"
            checked={form.posologiaPorIntervalo}
            onChange={() => setForm(prev => ({ ...prev, posologiaPorIntervalo: true }))}
          />
          <label htmlFor="posologiaIntervalo" className="text-gray-600">Posologia por intervalo</label>
        </div>

        {/* Horário fixo */}
        {!form.posologiaPorIntervalo && (
          <CustomTextBox
            name="horario"
            placeholder="Horário (ex: 08:00)"
            value={form.horario}
            onChange={handleChange}
            type="time"
            required
          />
        )}        {/* Posologia por intervalo */}
        {form.posologiaPorIntervalo && (
          <>
            <CustomTextBox
              name="dataInicio"
              placeholder="Data de início"
              value={form.dataInicio}
              onChange={handleChange}
              type="date"
              required
            />

            <CustomTextBox
              name="horarioInicio"
              placeholder="Horário de início (ex: 08:00)"
              value={form.horarioInicio}
              onChange={handleChange}
              type="time"
              required
            />
            
            <CustomTextBox
              name="intervalo"
              placeholder="Intervalo (em horas)"
              type="number"
              value={form.intervalo}
              onChange={handleChange}
              required
            />

            <CustomTextBox
              name="quantidade"
              placeholder="Quantidade de doses"
              type="number"
              value={form.quantidade}
              onChange={handleChange}
              required
            />
          </>
        )}

        <CustomButton type="submit" variant="primary">Salvar Lembrete</CustomButton>
        <CustomButton onClick={() => router.push('/')} variant="secondary">Voltar ao Menu</CustomButton>
      </form>

      {/* Modal IA (busca medicamento) */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Informações sobre {form.medicamento}
            </h2>
            <p className="text-gray-700 mb-6">{descricao}</p>
            <CustomButton onClick={() => setMostrarModal(false)} variant="third" >
              Fechar
            </CustomButton>
          </div>
        </div>
      )}      {/* Modal ERRO (validações e erros) */}
      {mostrarErro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-red-500 mb-4">Erro!</h2>
            <p className="text-gray-900 mb-6">{mensagemErro}</p>
            <CustomButton onClick={() => setMostrarErro(false)} variant="third">
              Ok
            </CustomButton>
          </div>
        </div>
      )}

      {/* Modal SUCESSO */}
      {mostrarSucesso && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-green-500 mb-4">Sucesso!</h2>
            <p className="text-gray-900 mb-6">Lembrete cadastrado com sucesso!</p>
            <p className="text-gray-600 text-sm mb-6">Redirecionando para o menu principal...</p>
            <CustomButton onClick={() => router.push('/')} variant="third">
              Ir para Menu
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
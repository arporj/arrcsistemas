import { useState } from 'react';
import { mascararTelefone } from '@/components/exemplos/utilitarios';

const CAMPOS_TELEFONE = ['whatsapp', 'telefone'];

/**
 * Estado e validação dos formulários dos sites de exemplo.
 * Entrada: valores iniciais e uma função validar(valores) que devolve { campo: mensagem }.
 * Saída: valores, erros, enviado e as funções para ligar nos campos.
 * O envio só marca "enviado": os sites de exemplo não mandam dados para lugar nenhum.
 */
export const useFormulario = (iniciais, validar) => {
  const [valores, setValores] = useState(iniciais);
  const [erros, setErros] = useState({});
  const [enviado, setEnviado] = useState(false);

  const definir = (campo, valor) => {
    const novos = { ...valores, [campo]: valor };
    setValores(novos);
    if (erros[campo]) setErros((atuais) => ({ ...atuais, [campo]: validar(novos)[campo] }));
  };

  const alterar = (campo) => (e) => {
    const valor = CAMPOS_TELEFONE.includes(campo) ? mascararTelefone(e.target.value) : e.target.value;
    definir(campo, valor);
  };

  const conferir = (campo) => () => setErros((atuais) => ({ ...atuais, [campo]: validar(valores)[campo] }));

  const enviar = (e) => {
    e.preventDefault();
    const encontrados = validar(valores);
    setErros(encontrados);
    if (Object.keys(encontrados).length === 0) setEnviado(true);
  };

  const recomecar = () => {
    setValores(iniciais);
    setErros({});
    setEnviado(false);
  };

  /** Props comuns de um campo: id, valor, eventos e ligação com a mensagem de erro. */
  const ligar = (campo, prefixo) => ({
    id: `${prefixo}-${campo}`,
    name: campo,
    value: valores[campo],
    onChange: alterar(campo),
    onBlur: conferir(campo),
    'aria-invalid': Boolean(erros[campo]),
    'aria-describedby': erros[campo] ? `${prefixo}-${campo}-erro` : undefined,
  });

  return { valores, erros, enviado, definir, alterar, enviar, recomecar, ligar };
};

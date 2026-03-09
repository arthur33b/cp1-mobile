import { FirebaseError } from 'firebase/app';

type ErroTratado = {
  amigavel: string;
  bruto: string;
};

const mensagensPorCodigo: Record<string, string> = {
  'auth/invalid-email': 'O e-mail informado é inválido.',
  'auth/missing-password': 'A senha é obrigatória.',
  'auth/invalid-credential': 'Credenciais inválidas. Verifique e-mail e senha.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/email-already-in-use': 'Este e-mail já está em uso.',
  'auth/weak-password': 'A senha deve ter ao menos 6 caracteres.',
  'auth/network-request-failed': 'Falha de conexão. Verifique sua internet.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente em instantes.',
};

export function tratarErroFirebase(erro: unknown): ErroTratado {
  if (erro instanceof FirebaseError) {
    return {
      amigavel: mensagensPorCodigo[erro.code] ?? 'Não foi possível concluir a operação.',
      bruto: `${erro.code}: ${erro.message}`,
    };
  }

  if (erro instanceof Error) {
    return {
      amigavel: 'Não foi possível concluir a operação.',
      bruto: erro.message,
    };
  }

  return {
    amigavel: 'Não foi possível concluir a operação.',
    bruto: 'Erro desconhecido.',
  };
}

import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { AuthForm } from '@/components/auth/auth-form';
import { fazerCadastro } from '@/services/auth';
import { tratarErroFirebase } from '@/utils/firebase-error';

export default function CadastroScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    if (!email.trim() || !senha) {
      Alert.alert('Campos obrigatórios', 'Preencha e-mail e senha para continuar.');
      return;
    }

    try {
      setCarregando(true);
      const credencial = await fazerCadastro(email, senha);
      const emailCadastrado = credencial.user.email ?? email.trim();

      router.push({
        pathname: '/resultado',
        params: { tipo: 'sucesso', acao: 'cadastro', email: emailCadastrado },
      });
    } catch (erro) {
      const erroTratado = tratarErroFirebase(erro);
      router.push({
        pathname: '/resultado',
        params: {
          tipo: 'erro',
          acao: 'cadastro',
          mensagem: erroTratado.amigavel,
          erroFirebase: erroTratado.bruto,
        },
      });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthForm
      titulo="Criar conta"
      email={email}
      senha={senha}
      alterEmail={setEmail}
      alterSenha={setSenha}
      carregando={carregando}
      textoBotao="Cadastrar"
      onSubmit={cadastrar}
      rodape="Já possui conta?"
      textoLink="Fazer login"
      onPressLink={() => router.push('/')}
    />
  );
}

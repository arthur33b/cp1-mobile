import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type ParamsResultado = {
  tipo?: string;
  acao?: string;
  email?: string;
  mensagem?: string;
  erroFirebase?: string;
};

export default function ResultadoScreen() {
  const router = useRouter();
  const { tipo, acao, email, mensagem, erroFirebase } = useLocalSearchParams<ParamsResultado>();

  const sucesso = tipo === 'sucesso';
  const acaoFormatada = acao === 'cadastro' ? 'cadastro' : 'login';
  const titulo = sucesso ? 'Operação concluída' : 'Não foi possível concluir';
  const descricaoSucesso =
    acaoFormatada === 'cadastro'
      ? `Cadastro realizado com sucesso para ${email ?? 'usuário sem e-mail'}.`
      : `Login realizado com sucesso para ${email ?? 'usuário sem e-mail'}.`;
  const descricaoErro = mensagem ?? 'Erro inesperado.';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.status, sucesso ? styles.sucesso : styles.erro]}>{sucesso ? 'Sucesso' : 'Erro'}</Text>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descricao}>{sucesso ? descricaoSucesso : descricaoErro}</Text>

        {!sucesso && (
          <View style={styles.blocoErro}>
            <Text style={styles.tituloErro}>Resposta do Firebase</Text>
            <Text style={styles.textoErro}>{erroFirebase ?? 'Sem detalhes adicionais.'}</Text>
          </View>
        )}

        <View style={styles.botoes}>
          <Pressable style={styles.botaoSecundario} onPress={() => router.push('/')}>
            <Text style={styles.textoBotaoSecundario}>Ir para login</Text>
          </Pressable>
          <Pressable style={styles.botaoPrimario} onPress={() => router.push('/cadastro')}>
            <Text style={styles.textoBotaoPrimario}>Ir para cadastro</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f4f6f8',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: '#e4e7ec',
  },
  status: {
    fontWeight: '700',
    fontSize: 14,
  },
  sucesso: {
    color: '#15803d',
  },
  erro: {
    color: '#b42318',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#101828',
  },
  descricao: {
    color: '#344054',
    lineHeight: 21,
  },
  blocoErro: {
    marginTop: 6,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fef3f2',
    borderWidth: 1,
    borderColor: '#fecdca',
    gap: 4,
  },
  tituloErro: {
    fontWeight: '600',
    color: '#912018',
  },
  textoErro: {
    color: '#b42318',
    fontSize: 13,
  },
  botoes: {
    marginTop: 10,
    gap: 8,
  },
  botaoPrimario: {
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
  },
  botaoSecundario: {
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#98a2b3',
    backgroundColor: '#ffffff',
  },
  textoBotaoPrimario: {
    color: '#ffffff',
    fontWeight: '600',
  },
  textoBotaoSecundario: {
    color: '#1d2939',
    fontWeight: '600',
  },
});

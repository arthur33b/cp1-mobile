import { Dispatch, SetStateAction } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type AuthFormProps = {
  titulo: string;
  email: string;
  senha: string;
  alterEmail: Dispatch<SetStateAction<string>>;
  alterSenha: Dispatch<SetStateAction<string>>;
  carregando: boolean;
  textoBotao: string;
  onSubmit: () => Promise<void>;
  rodape: string;
  textoLink: string;
  onPressLink: () => void;
};

export function AuthForm({
  titulo,
  email,
  senha,
  alterEmail,
  alterSenha,
  carregando,
  textoBotao,
  onSubmit,
  rodape,
  textoLink,
  onPressLink,
}: AuthFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail (ex: aluno@email.com)"
        placeholderTextColor="#000000"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={alterEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#000000"
        secureTextEntry
        autoCapitalize="none"
        value={senha}
        onChangeText={alterSenha}
      />

      <Pressable style={[styles.botao, carregando && styles.botaoDesabilitado]} onPress={onSubmit} disabled={carregando}>
        {carregando ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.textoBotao}>{textoBotao}</Text>}
      </Pressable>

      <View style={styles.rodape}>
        <Text style={styles.textoRodape}>{rodape}</Text>
        <Pressable onPress={onPressLink}>
          <Text style={styles.link}>{textoLink}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f4f6f8',
    gap: 12,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#101828',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  botao: {
    marginTop: 6,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  textoBotao: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  rodape: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  textoRodape: {
    color: '#344054',
  },
  link: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

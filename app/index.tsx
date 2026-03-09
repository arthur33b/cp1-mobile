import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { AuthForm } from "@/components/auth/auth-form";
import { fazerLogin } from "@/services/auth";
import { tratarErroFirebase } from "@/utils/firebase-error";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha e-mail e senha para continuar.",
      );
      return;
    }

    try {
      setCarregando(true);
      const credencial = await fazerLogin(email, senha);
      const emailLogado = credencial.user.email ?? email.trim();

      router.push({
        pathname: "/resultado",
        params: { tipo: "sucesso", acao: "login", email: emailLogado },
      });
    } catch (erro) {
      const erroTratado = tratarErroFirebase(erro);
      router.push({
        pathname: "/resultado",
        params: {
          tipo: "erro",
          acao: "login",
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
      titulo="Entrar na conta"
      email={email}
      senha={senha}
      alterEmail={setEmail}
      alterSenha={setSenha}
      carregando={carregando}
      textoBotao="Entrar"
      onSubmit={entrar}
      rodape="Não tem conta?"
      textoLink="Criar cadastro"
      onPressLink={() => router.push("/cadastro")}
    />
  );
}

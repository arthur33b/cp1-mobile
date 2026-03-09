import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth, firebaseConfigError } from '@/config/firebase';

function obterAuthConfigurado(): Auth {
  if (!auth) {
    throw new Error(firebaseConfigError ?? 'Firebase não configurado.');
  }

  return auth;
}

export async function fazerLogin(email: string, senha: string): Promise<UserCredential> {
  const authConfigurado = obterAuthConfigurado();
  return signInWithEmailAndPassword(authConfigurado, email.trim(), senha);
}

export async function fazerCadastro(email: string, senha: string): Promise<UserCredential> {
  const authConfigurado = obterAuthConfigurado();
  return createUserWithEmailAndPassword(authConfigurado, email.trim(), senha);
}

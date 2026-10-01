const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const MAIUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%&*-_+=?";

const TAMANHO = 12;
const USAR_MAIUSCULAS = true;
const USAR_NUMEROS = true;
const USAR_SIMBOLOS = true;

function montarAlfabeto() {
  let alfabeto = MINUSCULAS;
  if (USAR_MAIUSCULAS) alfabeto += MAIUSCULAS;
  if (USAR_NUMEROS) alfabeto += NUMEROS;
  if (USAR_SIMBOLOS) alfabeto += SIMBOLOS;
  return alfabeto;
}

function sortearSenha(tamanho, alfabeto) {
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * alfabeto.length);
    senha += alfabeto[indice];
  }
  return senha;
}

console.log(sortearSenha(TAMANHO, montarAlfabeto()));

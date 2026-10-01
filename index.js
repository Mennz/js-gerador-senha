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

function calcularForca(senha) {
  let variedade = 0;
  if (/[a-z]/.test(senha)) variedade++;
  if (/[A-Z]/.test(senha)) variedade++;
  if (/[0-9]/.test(senha)) variedade++;
  if (/[^a-zA-Z0-9]/.test(senha)) variedade++;

  const pontos = variedade + (senha.length >= 12 ? 2 : senha.length >= 8 ? 1 : 0);

  if (pontos <= 2) return "fraca";
  if (pontos <= 4) return "media";
  return "forte";
}

const senha = sortearSenha(TAMANHO, montarAlfabeto());
console.log(senha);
console.log("forca:", calcularForca(senha));

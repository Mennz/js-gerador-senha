const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const MAIUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%&*-_+=?";

function sortearSenha(tamanho, alfabeto) {
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * alfabeto.length);
    senha += alfabeto[indice];
  }
  return senha;
}

const alfabeto = MINUSCULAS + MAIUSCULAS + NUMEROS + SIMBOLOS;
console.log(sortearSenha(12, alfabeto));

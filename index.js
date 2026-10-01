const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const MAIUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%&*-_+=?";

const argumentos = process.argv.slice(2);

function temFlag(nome) {
  return argumentos.includes(nome);
}

function lerOpcoes() {
  const indiceTamanho = argumentos.indexOf("--tamanho");
  const tamanho = indiceTamanho === -1 ? 12 : Number(argumentos[indiceTamanho + 1]);

  return {
    tamanho,
    usarMaiusculas: !temFlag("--sem-maiusculas"),
    usarNumeros: !temFlag("--sem-numeros"),
    usarSimbolos: !temFlag("--sem-simbolos"),
  };
}

function montarAlfabeto(opcoes) {
  let alfabeto = MINUSCULAS;
  if (opcoes.usarMaiusculas) alfabeto += MAIUSCULAS;
  if (opcoes.usarNumeros) alfabeto += NUMEROS;
  if (opcoes.usarSimbolos) alfabeto += SIMBOLOS;
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

const opcoes = lerOpcoes();
const senha = sortearSenha(opcoes.tamanho, montarAlfabeto(opcoes));
console.log(senha);
console.log("forca:", calcularForca(senha));

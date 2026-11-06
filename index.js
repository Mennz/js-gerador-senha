const { execSync } = require("child_process");

const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const MAIUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%&*-_+=?";
const AMBIGUOS = "il1Lo0O";

const argumentos = process.argv.slice(2);

function temFlag(nome) {
  return argumentos.includes(nome);
}

function lerOpcoes() {
  const indiceTamanho = argumentos.indexOf("--tamanho");
  let tamanho = indiceTamanho === -1 ? 12 : Number(argumentos[indiceTamanho + 1]);

  // --tamanho sem numero valido voltava senha vazia e sem aviso nenhum
  if (!Number.isInteger(tamanho) || tamanho <= 0) {
    console.log("tamanho invalido, usando 12");
    tamanho = 12;
  }

  const indiceQuantidade = argumentos.indexOf("--quantidade");
  let quantidade = indiceQuantidade === -1 ? 1 : Number(argumentos[indiceQuantidade + 1]);

  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    console.log("quantidade invalida, usando 1");
    quantidade = 1;
  }

  return {
    tamanho,
    quantidade,
    usarMaiusculas: !temFlag("--sem-maiusculas"),
    usarNumeros: !temFlag("--sem-numeros"),
    usarSimbolos: !temFlag("--sem-simbolos"),
    semAmbiguos: temFlag("--sem-ambiguos"),
    copiar: temFlag("--copiar"),
  };
}

// clip e o comando do windows pra mandar texto pra area de transferencia
function copiarParaAreaDeTransferencia(texto) {
  try {
    execSync("clip", { input: texto });
    return true;
  } catch (erro) {
    return false;
  }
}

function montarAlfabeto(opcoes) {
  let alfabeto = MINUSCULAS;
  if (opcoes.usarMaiusculas) alfabeto += MAIUSCULAS;
  if (opcoes.usarNumeros) alfabeto += NUMEROS;
  if (opcoes.usarSimbolos) alfabeto += SIMBOLOS;

  if (opcoes.semAmbiguos) {
    for (const letra of AMBIGUOS) {
      alfabeto = alfabeto.split(letra).join("");
    }
  }

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

// entropia = quantos bits de "sorte" a senha tem, log2(alfabeto^tamanho)
function calcularEntropia(tamanho, alfabeto) {
  return tamanho * Math.log2(alfabeto.length);
}

const opcoes = lerOpcoes();
const alfabeto = montarAlfabeto(opcoes);
const entropia = calcularEntropia(opcoes.tamanho, alfabeto);

let ultimaSenha = "";
for (let i = 0; i < opcoes.quantidade; i++) {
  const senha = sortearSenha(opcoes.tamanho, alfabeto);
  console.log(senha, "-", "forca:", calcularForca(senha), "-", entropia.toFixed(1), "bits");
  ultimaSenha = senha;
}

if (opcoes.copiar) {
  if (opcoes.quantidade > 1) {
    console.log("--copiar so funciona com 1 senha, ignorando");
  } else if (copiarParaAreaDeTransferencia(ultimaSenha)) {
    console.log("copiada para a area de transferencia");
  } else {
    console.log("nao deu pra copiar (so funciona no windows)");
  }
}

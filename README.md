# Gerador de senha

Gerador de senhas aleatorias que roda no terminal, feito em Node puro (sem
dependencias). Da pra escolher o tamanho e quais tipos de caractere entram,
e o programa mostra um medidor simples de forca da senha gerada.

## O que pratiquei

- Montar um alfabeto juntando strings de acordo com flags
- Sortear caractere por caractere com `Math.random`
- Ler flags e valores de `process.argv`
- Um medidor de forca bem simples, baseado em variedade de caracteres e
  tamanho
- Um bug real: `--tamanho` com valor invalido (ou zero) fazia o loop do
  sorteio nao rodar nenhuma vez e devolver senha vazia, sem nenhum aviso

## Como rodar

```bash
node index.js
node index.js --tamanho 20
node index.js --tamanho 8 --sem-maiusculas --sem-simbolos
```

Flags disponiveis: `--tamanho <numero>`, `--sem-maiusculas`, `--sem-numeros`,
`--sem-simbolos`. Minusculas sempre entram na senha.

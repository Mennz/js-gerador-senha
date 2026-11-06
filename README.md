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
- Gerar varias senhas numa chamada so, com `--quantidade`
- Tirar do alfabeto os caracteres que se confundem visualmente (`i`, `l`,
  `1`, `o`, `0`...)
- Calcular entropia (`tamanho * log2(tamanho do alfabeto)`) pra ter uma
  nocao numerica de forca, alem do rotulo fraca/media/forte
- Copiar a senha pra area de transferencia chamando o `clip` do Windows via
  `child_process`

## Como rodar

```bash
node index.js
node index.js --tamanho 20
node index.js --tamanho 8 --sem-maiusculas --sem-simbolos
node index.js --quantidade 5
node index.js --sem-ambiguos --copiar
```

Flags disponiveis: `--tamanho <numero>`, `--quantidade <numero>`,
`--sem-maiusculas`, `--sem-numeros`, `--sem-simbolos`, `--sem-ambiguos`,
`--copiar`. Minusculas sempre entram na senha. `--copiar` so funciona
gerando 1 senha e so no Windows (usa o `clip`).

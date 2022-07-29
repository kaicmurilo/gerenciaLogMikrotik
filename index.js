const chalk = require(`chalk`);
const pegaArquivo = require(`./funcoes.js`);
// const caminho = process.argv;

async function processaTexto(caminhoDeArquivo) {
    const resultado = await pegaArquivo(caminhoDeArquivo);
    console.log(resultado)
}

processaTexto('./log/tmplog.log')
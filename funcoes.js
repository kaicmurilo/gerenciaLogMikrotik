const chalk = require('chalk');
const fs = require('fs');
var dns = require("dns")

function trataerr(err) {
    throw new Error(chalk.red(err));
}

async function VerificaDNS(IP) {

    try {
        const dnsPromises = dns.promises.reverse(IP, (err, hostnames) => {
            return dnsPromises
        });
    } catch (err) {
        trataerr(err)
    }
    return 'DNS nao encontrado'

    // const dns = await dns.reverse(IP, function (err, hosts) {
    //     try {
    //         const hostname = [];
    //         hostname.push(hosts)
    //         if (hostname.includes(undefined) === true) {
    //             return `DNS NÃO ENCONTRADO`
    //         }
    //         return hostname;
    //     } catch (err) {
    //         trataerr(err)
    //         return 'Nulo errado'
    //     }
    // })


}

async function ExtraiIps(texto) {
    const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
    const arryResultados = [];
    const arrayResultadoFinal = [];
    let temp;
    while ((temp = regex.exec(texto)) !== null) {
        arryResultados.push(temp[1])
    }
    for (let i = 0; i < arryResultados.length; i = i + 3) {
        // console.log(arryResultados[i] + ',' + arryResultados[i + 1] + ',' + arryResultados[i + 2])
        // arrayResultadoFinal[k]
        const resultadoDNS = await VerificaDNS(arryResultados[i + 1])
        arrayResultadoFinal.push({ Initiator: arryResultados[i], AcessoHttp: arryResultados[i + 1], Gateway: arryResultados[i + 2], DNS: resultadoDNS })
        // arrayResultadoFinal[k].acesso.push(arryResultados[i + 1])
        // arrayResultadoFinal[k].gateway.push(arryResultados[i + 2])

    }
    return arrayResultadoFinal.length === 0 ? `Nao ha Ips` : arrayResultadoFinal;
}

async function pegaLog(caminhoDoArquiv) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoDoArquiv, encoding)
        return ExtraiIps(texto)
    } catch (err) {
        trataerr(err)
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }

}

module.exports = pegaLog;
/*global $*/
/*global setCharAt*/

function MaquinaDeTuring() {
    var alfabetoInicial;
    var alfabetoFinal;
    var alfabetoNaFitaF1;
    var alfabetoNaFitaF2;
    var simboloVazio;
    var estados;
    var estadoInicial;
    var stop;
    var offSet;
    var i;

    this.estados = [];
    this.alfabetoFinal = [];
    this.alfabetoInicial = [];
    this.alfabetoNaFitaF1 = "";
    this.alfabetoNaFitaF2 = "";
    this.estadoInicial = false;
    this.simboloVazio = '□';
    this.offSet = 5;
};

function Estado(_q, _nome) {
    var q;
    var nome;
    var transicoes;
    var estadoFinal;
    var estadoInicial;

    this.q = _q;
    this.nome = _nome;
    this.transicoes = [];
    this.estadoFinal = false;
    this.estadoInicial = false;

};

// <from>0</from>;
// <to>0</to>;
// <read tape="1">1</read>;
// <write tape="1">1</write>;
// <move tape="1">R</move>;
// <read tape="2"/>;
// <write tape="2">1</write>;
// <move tape="2">R</move>;

function Transicao() {
    var proximoEstado;

    var lidoNaFitaF1;
    var escritoNaFitaF1;
    var movimentoF1;

    var lidoNaFitaF2;
    var escritoNaFitaF2;
    var movimentoF2;

    this.proximoEstado = 0;

    this.lidoNaFitaF1 = null;
    this.escritoNaFitaF1 = null;
    this.movimentoF1 = 0;

    this.lidoNaFitaF2 = null;
    this.escritoNaFitaF2 = null;
    this.movimentoF2 = 0;
};

var maquinaDeTuring;
var refreshIntervalId;

var calculaMaquina = function() {
    // setTimeout(
    //     function() {
    //         clearInterval(refreshIntervalId);
    //         maquinaDeTuring.i = 0;
    //         calculaMaquina();
    //     }, 9);

    // refreshIntervalId = setInterval(function() {
    //     maquinaDeTuring.i++;
    //     console.log(maquinaDeTuring.i);
    // }, 1);

    var cabecoteF1 = maquinaDeTuring.offSet;
    var cabecoteF2 = maquinaDeTuring.offSet;
    var estadoAtual = maquinaDeTuring.estadoInicial;

    console.log("Movimentos = {");

    while (!maquinaDeTuring.estados[estadoAtual].estadoFinal) {
        var palavraValida = false;

        var saida = "\t(Q[" + estadoAtual + "], {F1: " + maquinaDeTuring.alfabetoNaFitaF1[cabecoteF1] + " | F2: " + maquinaDeTuring.alfabetoNaFitaF2[cabecoteF2] + "}) => ";
        for (var i = 0; i < maquinaDeTuring.estados[estadoAtual].transicoes.length; i++) {
            if (
                (maquinaDeTuring.estados[estadoAtual].transicoes[i].lidoNaFitaF1 === maquinaDeTuring.alfabetoNaFitaF1[cabecoteF1]) &&
                (maquinaDeTuring.estados[estadoAtual].transicoes[i].lidoNaFitaF2 === maquinaDeTuring.alfabetoNaFitaF2[cabecoteF2])) {
                saida += "(Q[" + maquinaDeTuring.estados[estadoAtual].transicoes[i].proximoEstado + "]";
                saida += ", Escr { F1:" + maquinaDeTuring.estados[estadoAtual].transicoes[i].escritoNaFitaF1;
                saida += " | F2: " + maquinaDeTuring.estados[estadoAtual].transicoes[i].escritoNaFitaF2 + "}";
                saida += ", Mov {F1: " + maquinaDeTuring.estados[estadoAtual].transicoes[i].movimentoF1 + " | ";
                saida += "F2: " + maquinaDeTuring.estados[estadoAtual].transicoes[i].movimentoF2 + "})";

                maquinaDeTuring.alfabetoNaFitaF1 = setCharAt(maquinaDeTuring.alfabetoNaFitaF1, cabecoteF1, maquinaDeTuring.estados[estadoAtual].transicoes[i].escritoNaFitaF1);
                maquinaDeTuring.alfabetoNaFitaF2 = setCharAt(maquinaDeTuring.alfabetoNaFitaF2, cabecoteF2, maquinaDeTuring.estados[estadoAtual].transicoes[i].escritoNaFitaF2);

                cabecoteF1 += verificaMovimento(maquinaDeTuring.estados[estadoAtual].transicoes[i].movimentoF1); //movimenta o cabeçote de leitura
                cabecoteF2 += verificaMovimento(maquinaDeTuring.estados[estadoAtual].transicoes[i].movimentoF2); //movimenta o cabeçote de leitura
                //insere simbolo vazio no final da fitaF2 caso estiver no final do array
                if(maquinaDeTuring.alfabetoNaFitaF2[cabecoteF2]===undefined){
                    maquinaDeTuring.alfabetoNaFitaF2 +='□';
                }

                estadoAtual = parseInt(maquinaDeTuring.estados[estadoAtual].transicoes[i].proximoEstado);
                palavraValida = true;
                break;
            }
        }
        if (!palavraValida) {
            $("#resultado").html(
                "Nenhuma Transicao encontrada na posicao: F1[" +
                cabecoteF1 + "], Caracter F1: " + maquinaDeTuring.alfabetoNaFitaF1[cabecoteF1] +
                " | F2[" + cabecoteF2 + "], Caracter F2: " + maquinaDeTuring.alfabetoNaFitaF2[cabecoteF2]
            );
            break;
        }
        console.log(saida);
    }
    console.log("}");
    if (maquinaDeTuring.estados[estadoAtual].estadoFinal) {
        $("#resultado").html("Palavra válida!");
    }
    else {
        //$("#resultado").html("Palavra inválida!");
    }
    console.log("Execução encerrada!");
    // maquinaDeTuring.alfabetoNaFita = maquinaDeTuring.alfabetoNaFita.substr(0, maquinaDeTuring.alfabetoNaFita.length - 1);
    $("#fitaCalculadaF1").val(maquinaDeTuring.alfabetoNaFitaF1);
    $("#fitaCalculadaF2").val(maquinaDeTuring.alfabetoNaFitaF2);
    $("#saida").show('slow');
};

var verificaMovimento = function(movimento) {
    switch (movimento) {
        case 'R':
            return 1;
            break;
        case 'S':
            return 0;
            break;
        case 'L':
            return -1;
            break;
    }
};

var mostraMaquina = function() {

    console.log(maquinaDeTuring);
    $("#maquina").show('slow');
    var trs = "";
    var ests = "<strong>Q</strong>={";
    var finais = "<strong>F</strong>={";
    for (var i = 0; i < maquinaDeTuring.estados.length; i++) {
        ests += "q" + i + ", ";
        if (maquinaDeTuring.estados[i].estadoFinal) finais += "q" + i + ", ";
        for (var j = 0; j < maquinaDeTuring.estados[i].transicoes.length; j++) {
            trs += "\t&nbsp;&nbsp;&nbsp;&nbsp;<strong>&delta;</strong>(q" + i + ", \'" + maquinaDeTuring.estados[i].transicoes[j].lidoNaFitaF1 + "\'  |  \'" + maquinaDeTuring.estados[i].transicoes[j].lidoNaFitaF2 + "\') = ";
            trs += "(q" + maquinaDeTuring.estados[i].transicoes[j].proximoEstado + ", \'" +
                maquinaDeTuring.estados[i].transicoes[j].escritoNaFitaF1 +
                "\'  |  \'" + maquinaDeTuring.estados[i].transicoes[j].escritoNaFitaF2 + "\', ";
            trs += maquinaDeTuring.estados[i].transicoes[j].movimentoF1 + "  |  " + maquinaDeTuring.estados[i].transicoes[j].movimentoF1 + ")\n</br>";
        }
    }

    ests = ests.substr(0, ests.length - 2);
    ests += "}";
    finais = finais.substr(0, finais.length - 2);
    finais += "}";

    $("#conjuntoEstados").html(ests);
    $("#alfabetoEntrada").html("<strong>&Sigma;</strong> = {" + maquinaDeTuring.alfabetoInicial + "}");
    $("#alfabetoDaFita").html("<strong>&Gamma;</strong> = {" + maquinaDeTuring.alfabetoFinal + "}");
    $("#funcaoTransicao").html(trs);
    $("#estadoInicial").html("<strong>S</strong> = q" + maquinaDeTuring.estadoInicial);
    $("#branco").html("<strong>&epsilon;</strong> = \'" + maquinaDeTuring.simboloVazio + "\'");
    $("#estadosFinais").html(finais);

    $("#entrada").show('slow');

};
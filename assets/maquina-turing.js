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

    this.estados = [];
    this.alfabetoFinal = [];
    this.alfabetoInicial = [];
    this.alfabetoNaFitaF1 = "";
    this.alfabetoNaFitaF2 = "";
    this.estadoInicial = false;
    this.simboloVazio ='□';

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
var calculaMaquina = function(mq) {
    var cabecoteF1 = 0;
    var cabecoteF2 = 0;
    var estadoAtual = mq.estadoInicial;

    console.log("Movimentos = {");

    while (cabecote < mq.alfabetoNaFita.length) {
        var palavraValida = false;

        var saida = "\t(Q[" + estadoAtual + "], Lido: " + mq.alfabetoNaFita[cabecote] + ") => ";
        for (var i = 0; i < mq.estados[estadoAtual].transicoes.length; i++) {
            if (mq.estados[estadoAtual].transicoes[i].lidoNaFita === mq.alfabetoNaFita[cabecote]) {

                saida += "(Q[" + mq.estados[estadoAtual].transicoes[i].proximoEstado + "], Escrito: " + mq.estados[estadoAtual].transicoes[i].escritoNaFita +
                    " , Mov: " + mq.estados[estadoAtual].transicoes[i].movimento + ")";

                mq.alfabetoNaFita = setCharAt(mq.alfabetoNaFita, cabecote, mq.estados[estadoAtual].transicoes[i].escritoNaFita);

                cabecote += parseInt(mq.estados[estadoAtual].transicoes[i].movimento); //movimenta o cabeçote de leitura
                estadoAtual = parseInt(mq.estados[estadoAtual].transicoes[i].proximoEstado);

                palavraValida = true;

                break;
            }
        }

        if (!palavraValida) {
            $("#resultado").html("Nenhuma Transicao encontrada na posicao: " + cabecote + ", Caracter: " + mq.alfabetoNaFita[cabecote]);
            break;
        }

        console.log(saida);

    }
    console.log("}");
    if (mq.estados[estadoAtual].estadoFinal) {
        $("#resultado").html("Palavra válida!");
    }
    else {
        $("#resultado").html("Palavra inválida!");
    }
    console.log("Execução encerrada!");
    // maquinaDeTuring.alfabetoNaFita = maquinaDeTuring.alfabetoNaFita.substr(0, maquinaDeTuring.alfabetoNaFita.length - 1);
    $("#fitaCalculadaF1").val(maquinaDeTuring.alfabetoNaFitaF1);
    $("#fitaCalculadaF2").val(maquinaDeTuring.alfabetoNaFitaF2);
    $("#saida").show('slow');
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
            trs += "\t&nbsp;&nbsp;&nbsp;&nbsp;<strong>&delta;</strong>(q" + i + ", \'" + maquinaDeTuring.estados[i].transicoes[j].lidoNaFitaF1 + "\'  |  \'"+ maquinaDeTuring.estados[i].transicoes[j].lidoNaFitaF2+"\') = ";
            trs += "(q" + maquinaDeTuring.estados[i].transicoes[j].proximoEstado + ", \'" +
                maquinaDeTuring.estados[i].transicoes[j].escritoNaFitaF1 +
                "\'  |  \'"+ maquinaDeTuring.estados[i].transicoes[j].escritoNaFitaF2+ "\', ";
                trs += maquinaDeTuring.estados[i].transicoes[j].movimentoF1 + "  |  " +maquinaDeTuring.estados[i].transicoes[j].movimentoF1 +")\n</br>";
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
    $("#branco").html("<strong>&epsilon;</strong> = \'" + maquinaDeTuring.simboloVazio+"\'");
    $("#estadosFinais").html(finais);

    $("#entrada").show('slow');

};
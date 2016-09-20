/*global $*/
/*global setCharAt*/

function MaquinaDeTuring() {
    var alfabetoInicial;
    var alfabetoFinal;
    var alfabetoNaFita;
    var simboloVazio;
    var estados;
    var estadoInicial;

    this.estados = [];
    this.alfabetoFinal = [];
    this.alfabetoInicial = [];
    this.alfabetoNaFita = "";
    this.estadoInicial = false;

};

function Estado(_q) {
    var q;
    var transicoes;
    var estadoFinal;

    this.q = _q;
    this.transicoes = [];
    this.estadoFinal = false;

};

function Transicao() {
    var proximoEstado;
    var lidoNaFita;
    var escritoNaFita;
    var movimento;

    this.proximoEstado = 0;
    this.lidoNaFita = null;
    this.escritoNaFita = null;
    this.movimento = 0;

};

var maquinaDeTuring;

var calculaMaquina = function(mq) {
    var cabecote = 0;
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
    $("#fitaCalculada").val(maquinaDeTuring.alfabetoNaFita);
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
            trs += "\t&nbsp;&nbsp;&nbsp;&nbsp;<strong>&delta;</strong>(q" + i + ", \'" + maquinaDeTuring.estados[i].transicoes[j].lidoNaFita + "\') = ";
            trs += "(q" + maquinaDeTuring.estados[i].transicoes[j].proximoEstado + ", \'" +
                maquinaDeTuring.estados[i].transicoes[j].escritoNaFita +
                "\' , ";
            switch (parseInt(maquinaDeTuring.estados[i].transicoes[j].movimento)) {
                case -1:
                    trs += "L)\n</br>";
                    break;
                case 0:
                    trs += "S)\n</br>";
                    break;
                case 1:
                    trs += "R)\n</br>";
                    break;
            }
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
    $("#branco").html("<strong>&epsilon;</strong> = " + maquinaDeTuring.simboloVazio);
    $("#estadosFinais").html(finais);

    $("#entrada").show('slow');
    
};
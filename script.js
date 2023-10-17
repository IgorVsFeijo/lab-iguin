var faixas = {
    cbuq : {

        peneiras :
        ['3/4"', '5/8"', '1/2"', '3/8"', '4#', '10#', '40#', '80#', '200#'],

        wmx3045 : {
                min : [96, 90, 80, 66.8, 50.2, 33, 12.3, 7, 3.3], //Faixa minima
                max : [100, 100, 93.9, 85, 60.2, 43, 21, 13, 7.3] //Faixa maxima
        },
        ab08 : {
            min : [96, 90, 80, 66.8, 46.4, 29.9, 9.9, 6.1, 3.8], //Faixa minima
            max : [100, 100, 95, 80, 56.4, 39.6, 19.9, 12.1, 7.8] //Faixa maxima
        }       
    },

    bgs : {

        peneiras: ['2"', '1"', '3/4"', '3/8"', '4#', '10#', '40#', '200#'],

        embu : {
                min : [100, 79, 73.32, 59.12, 34.8, 21.86, 13.23, 5.37], //Faixa minima
                max : [100, 95, 85, 70, 44.8, 31.86, 17.23, 9.37] //Faixa maxima
        },
        julio: {
                min : [100, 86, 73, 49, 34, 24, 11, 3], //Faixa minima
                max : [100, 95, 85, 63, 44, 34, 15, 7] //Faixa maxima
        }       
    }
};

var linhabase = document.getElementById("principal")
var corpotabela = document.getElementById("corpotabela");

function montarlinha(peneira, fxmin, fxmax){
    var clone = linhabase.cloneNode(true);

    clone.firstElementChild.innerHTML = peneira;

    clone.childNodes[7].innerHTML = fxmin;

    clone.childNodes[9].innerHTML = fxmax;

    console.log(clone);
    return clone;
}

function puxarfaixa(fxselecionada){
    tipo = fxselecionada.split(" ")[0];
    traco = fxselecionada.split(" ")[1];

    corpotabela.innerHTML = "";

    contador = 0;
    var fxtipo = faixas[tipo]
    var fxtipoetraco = faixas[tipo][traco]

    fxtipo.peneiras.forEach(peneira => {
        console.log(peneira);
        var fxminima = fxtipoetraco.min[contador];
        var fxmaxima = fxtipoetraco.max[contador];

        corpotabela.appendChild(montarlinha(peneira, fxminima, fxmaxima));

        //corpotabela.lastElementChild.id = "resultado" + contador;

        contador++;

    });

};

var entradafaixa = document.getElementById("faixa");

entradafaixa.addEventListener("click", (valor)=>{
    puxarfaixa(valor.target.value);

    console.log(document.getElementsByName("pesoretido"))

    for(entrada of document.getElementsByName("pesoretido")){

        entrada.disabled = false;

        entrada.addEventListener("change", (evento)=>{

            valorinicial = evento.target.value;
            valortotal = document.getElementById("total").value;
            percentualretido = valorinicial/valortotal*100

            linhaevento = evento.target.parentElement.parentElement;

            linhaevento.childNodes[5].innerHTML = percentualretido.toFixed(2);

            limitesuperior = linhaevento.childNodes[9].innerHTML;
            limiteinferior = linhaevento.childNodes[7].innerHTML;

            console.log(percentualretido > limiteinferior && percentualretido < limitesuperior);

            if(percentualretido > limiteinferior && percentualretido < limitesuperior){
                linhaevento.childNodes[5].style.color = "blue";
            }
            else{
                linhaevento.childNodes[5].style.color = "red";
            }

        })
    }
})




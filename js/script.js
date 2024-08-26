//! SIMULADOR DE PRESUPUESTO PERSONAL
// Iniciar calculo presupuesto
let botonCalcular = document.getElementById("calcularPresupuesto");
botonCalcular.addEventListener("click", function(){
    iniciarSimulador();
});

// Guardar en LocalStorage
function guardarEnLocalStorage(clave, valor) {
    localStorage.setItem(clave, valor.toString());
};

function cargarDesdeLocalStorage() {
    if (localStorage.getItem("gastosFijos")) {
        gastosFijos = localStorage.getItem("gastosFijos").split(',').map(Number);
        gastosVariables = localStorage.getItem("gastosVariables").split(',').map(Number);
        totalGastos = parseFloat(localStorage.getItem("totalGastos"));
        fijo = parseFloat(localStorage.getItem("ingresoFijo"));
        
        mostrarResumen();
    }
}


//  Funcionamiento
function iniciarSimulador(){
    // *Variables
    let totalGastos = 0;
    let categoriaGastoFijo = "";
    let gastosFijos = [];
    let gastosVariables = [];

    // *Llamando ID
    let resumenGastosHTML = document.getElementById("resumenGastos");
    let totalIngreso = document.getElementById('ingreso');
    let ingresoGastado = document.getElementById('ingresoGastado');
    let quedan = document.getElementById('quedanIngresos');

    // *Llamando a inputs
    let ingresando = document.getElementById('Ingreso');
    let gastosSeguros = document.getElementById('gastosSeguros');
    let gastoAzar = document.getElementById('gastosAzar');
    let select = document.getElementById('categoriasSeguros');


    let ingresoFijo = parseFloat(ingresando.value);
    // Ingreso fijo
    const fijo = ingresoFijo;
    if (ingresoFijo > 0) {
        alert("Ingreso actualizado");
        mostrarResumen();
    }else{
        alert("Ingreso no válido");
        return;
    }


    // Añadir gastos
    let botonGastos = document.getElementById("agregarGastos");
    botonGastos.addEventListener("click", function(){
        agregarGastosFijos();
        agregarGastos();
        mostrarResumen();
    });

    select.addEventListener("change", function(){
        categoriaGastoFijo = select.value;
    });


    // Función para añadir gastos fijos
    function agregarGastosFijos(){
        let gastosSiempre = parseFloat(gastosSeguros.value);
        if ((gastosSiempre > 0) && (gastosSiempre != "")){
            gastosFijos.push(gastosSiempre);
            totalGastos += gastosSiempre; 
            actualizarIngreso(gastosSiempre);
        
            resumenGastosHTML.innerHTML += '<p>Gasto fijo: ' + gastosSiempre +  '- Categoría: ' + categoriaGastoFijo + '</p>';

            guardarEnLocalStorage("gastosFijos", gastosFijos);
            guardarEnLocalStorage("totalGastos", totalGastos);
            guardarEnLocalStorage("ingresoFijo", fijo);

        }else if((gastosSiempre <=0) || (gastosSiempre === "")){
            alert("Gasto no válido");
        }
    }

    // Añadir gastos sueltos
    function agregarGastos(){
        let gastosUsuales = parseFloat(gastoAzar.value);
        if ((gastosUsuales > 0) && (gastosUsuales != "")){
            gastosVariables.push(gastosUsuales);
            totalGastos += gastosUsuales;
            actualizarIngreso(gastosUsuales);
        
            resumenGastosHTML.innerHTML += '<p>Gasto suelto: ' + gastosUsuales + '</p>';

            guardarEnLocalStorage("gastosVariables", gastosVariables);
            guardarEnLocalStorage("totalGastos", totalGastos);
            guardarEnLocalStorage("ingresoFijo", fijo);

        }else if((gastosUsuales <= 0) || (gastosUsuales === "")){
            alert("Gasto no válido");
        }
    }


    // Actualizar ingresos
    function actualizarIngreso(gastoNuevo){
        ingresoFijo -= gastoNuevo;
        if(ingresoFijo <= 0){
            alert("Ya no tienes dinero, o tus gastos exceden tu dinero actual");
        }
        guardarEnLocalStorage("quedan", ingresoFijo);
    }

    function mostrarResumen(){
        totalIngreso.innerHTML =  fijo;
        ingresoGastado.innerHTML =  totalGastos;
        quedan.innerHTML = ingresoFijo;
        guardarEnLocalStorage("quedan", ingresoFijo);
        ingresando.value = "";
        gastosSeguros.value = "";
        gastoAzar.value = "";
    }
}
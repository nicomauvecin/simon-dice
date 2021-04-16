const $botonEmpezar = document.querySelector('#boton-empezar');
const $botonReiniciar = document.querySelector('#boton-reiniciar');
const $tablero = document.querySelector('#tablero');
const $cuadros = document.querySelectorAll('.cuadro');
let turno = 0;
let secuenciaComputadora = [];
let secuenciaUsuario = [];


$botonEmpezar.onclick = function(){
    manejarRondas();
    $botonEmpezar.classList.add('oculto');
}

$botonReiniciar.onclick = function(){
    turno = 0;
    document.querySelector('#ronda').innerText = `${turno}`
    document.querySelector('#estado').innerText = 'Haz click en el botón Empezar para jugar :)';
    secuenciaComputadora = [];
    secuenciaUsuario = [];
    $botonReiniciar.classList.add('oculto');
    $botonEmpezar.classList.remove('oculto');
}

function manejarRondas(){
    actualizarEstadoComputadora();
    turno++;
    secuenciaUsuario = []
    document.querySelector('#ronda').innerText = `${turno}`
    turnoComputadora();
    const RETRASO_TURNO_JUGADOR = (turno + 1) * 1000; 
    setTimeout(function(){
        actualizarEstadoUsuario();
        turnoUsuario();
    }, RETRASO_TURNO_JUGADOR);
}

function turnoComputadora(){
    actualizarEstadoComputadora();
    generarSecuencia();

    secuenciaComputadora.forEach(function(cuadro, index) {
        const RETRASO_TURNO_COMPUTADORA = (index + 1) * 1000;
        setTimeout(function() {
            iluminarCuadro(cuadro);
        }, RETRASO_TURNO_COMPUTADORA);
      });
}

function generarSecuencia(){
    let numAleatorio = Math.floor(Math.random() * (5 - 1)) + 1;
    secuenciaComputadora.push(document.querySelector(`#cuadro-${numAleatorio}`));
}

function turnoUsuario(){
    $tablero.onclick = function(e){
        let cuadroSeleccionado = e.target;
        iluminarCuadro(cuadroSeleccionado);
        secuenciaUsuario.push(cuadroSeleccionado);
        comprobarResultado(cuadroSeleccionado);
    }
}

function comprobarResultado(cuadroSeleccionado){
    if(cuadroSeleccionado != secuenciaComputadora[secuenciaUsuario.length-1]){
        perder();
        return;
    }

    if(secuenciaUsuario.length === secuenciaComputadora.length){
        bloquearUsuario();
        setTimeout(function(){
            manejarRondas();
        }, 1000)
    }
}

function perder(){
    bloquearUsuario();
    document.querySelector('#estado').innerText = '¡PERDISTE! :('
    $botonReiniciar.classList.remove('oculto');
};

function bloquearUsuario(){
    $tablero.onclick = function(){
        return;
    }
}

function iluminarCuadro(cuadro){
    cuadro.style.opacity = '1'
    setTimeout(function(){
        cuadro.style.opacity = '0.5';
    }, 500);
}

function actualizarEstadoComputadora(){
    document.querySelector('#estado').innerText = '¡Turno de la computadora!';
}

function actualizarEstadoUsuario(){
    document.querySelector('#estado').innerText = '¡Ahora es tu turno!';
}


let listaNombresGastos = [];
let listaDescripcionGasto = [];
let listaValoresGastos = [];
let modoEdicion = false;
let indiceEdicion = -1;

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;

    if (modoEdicion) {
        listaNombresGastos[indiceEdicion] = nombreGasto;
        listaDescripcionGasto[indiceEdicion] = descripcionGasto;
        listaValoresGastos[indiceEdicion] = valorGasto;

        document.getElementById('botonFormulario').textContent = "Agregar Gasto";

        modoEdicion = false;
        indiceEdicion = -1;
    } else {
    listaNombresGastos.push(nombreGasto);
    listaDescripcionGasto.push(descripcionGasto)
    listaValoresGastos.push(valorGasto);
    }

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos [posicion]);
        const descripcionGasto = listaDescripcionGasto [posicion];
        htmlLista += `<li>
                        <span>${elemento}</span>
                        <span>${descripcionGasto}</span>
                        <span>USD ${valorGasto.toFixed(2)}</span>
        <button id="botonModificar" onclick="modificarGasto(${posicion});"> <img src="./assets/img/edit_note.svg" alt="Imagen Editar"></button>
        <button id="botonModificar" onclick="eliminarGasto(${posicion});"> <img src="./assets/img/delete_forever.svg" alt="Imagen Eliminar"></button></button>
        </li>`;
        totalGastos += Number(valorGasto);

        if (totalGastos > 150) {
            const mensajeAlerta = document.getElementById('mensajeAlerta');
            const imagenAdvertencia = document.querySelector('#restultParas img');
            const resultParas = document.getElementById('restultParas');

            mensajeAlerta.textContent = `Gastaste USD${valorGasto.toFixed(2)} en ${elemento}. ¿Quizás podrías buscar alternativas más económicas?`
            mensajeAlerta.style.color = '#FCFAEE';
            mensajeAlerta.style.fontWeight = "bold"; 
            mensajeAlerta.style.display = 'block'; //Mostrar el mensaje.

            //Mostamos la imagen y agregar id para el fondo
            imagenAdvertencia.style.display = 'inline';
            resultParas.classList.add('alerta-activa');
            
            //Desaoparece mensaje después de 3 segundos.
            setTimeout(() => {
               mensajeAlerta.style.display = 'none';
               imagenAdvertencia.style.display = 'none';
               resultParas.classList.remove('alerta-activa');
           }, 5000);
        }
    })

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();    
}

function modificarGasto(posicion) {
    const cajaNombreGasto = document.getElementById('nombreGasto');
    const cajaDescripcionGasto = document.getElementById('descripcionGasto');
    const cajaValorGasto = document.getElementById('valorGasto');
    
    cajaNombreGasto.value = listaNombresGastos[posicion];
    cajaDescripcionGasto.value = listaDescripcionGasto[posicion];
    cajaValorGasto.value = listaValoresGastos[posicion];

    document.getElementById('botonFormulario').textContent = "Guardar Cambios";

    modoEdicion = true;
    indiceEdicion = posicion;
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
    document.getElementById('valorGasto').value = '';     
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion,1),
    listaValoresGastos.splice(posicion,1);
    actualizarListaGastos();
}
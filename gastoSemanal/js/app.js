//variables
const presupuestoUsuario = prompt('Cual es tu Presupuesto Semanal??');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;




//clases
//clase de presupuesto
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    //metodo para ir restando
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}

//clase de interfaz
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //insertar al html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
        
    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));
        //insertar en el dom
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

         //quitar el alert despues de 3segundos
         setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }

    //inserta los gastos a la lusta
    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');

        //crear el li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        //insertar el gasto
        li.innerHTML = `
            ${nombre}
            <span class='badge badge-primary badge-pill'> $${cantidad} </span>
        `;

        //insertar al html
        gastosListado.appendChild(li);
    }

    //compuerba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        //leemos el presupuesto restante y actualizamos
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }

    //cambia el color de restante
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //comprobar el 25% del gasto
        if((presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}



//eventlistener
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    }else{
        //instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);       
       
    }
});


formulario.addEventListener('submit', function(e){
    e.preventDefault();

    //leer  del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //instanciar la interfaz
    const ui = new Interfaz();

    //comprobar que lo gastos no esten vavios
    if(nombreGasto === '' || cantidadGasto === ''){
        //2 paramentros memsaje y tipo
        ui.imprimirMensaje('Hubo un Error',  'error');
    }else{
        //insertar en el html
        ui.imprimirMensaje('Correcto...', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});
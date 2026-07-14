import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    obtenerAlumnos,
    registrarPago,
    calcularDeuda
} from "../services/supabaseService";


function Pagos(){


const [alumnos,setAlumnos]=useState([]);

const [alumnoSeleccionado,setAlumnoSeleccionado]=useState("");

const [deuda,setDeuda]=useState(0);

const [monto,setMonto]=useState("");



useEffect(()=>{


async function cargar(){

const data = await obtenerAlumnos();

setAlumnos(data);

}


cargar();


},[]);





async function cambiarAlumno(id){


setAlumnoSeleccionado(id);


if(id){

const resultado = await calcularDeuda(Number(id));

setDeuda(resultado.deuda);

}
else{

setDeuda(0);

}


}




async function guardarPago(e){


e.preventDefault();


if(!alumnoSeleccionado)

return alert("Seleccione alumno");


if(!monto)

return alert("Ingrese monto");



await registrarPago({

alumno_id:Number(alumnoSeleccionado),

monto:Number(monto)

});



alert("Pago registrado");


setMonto("");



const resultado =
await calcularDeuda(Number(alumnoSeleccionado));


setDeuda(resultado.deuda);


}





return (

<div className="container">


<Link to="/">
⬅ Volver
</Link>



<h1>
💰 Pagos
</h1>




<select

value={alumnoSeleccionado}

onChange={(e)=>cambiarAlumno(e.target.value)}

style={{
width:"100%",
padding:"12px"
}}

>


<option value="">
Seleccionar alumno
</option>


{

alumnos.map(a=>(

<option

key={a.id}

value={a.id}

>

{a.nombre}

</option>

))

}


</select>



<h3>

Deuda actual:

S/ {deuda.toFixed(2)}

</h3>




<form onSubmit={guardarPago}>


<input

type="number"

placeholder="Monto"

value={monto}

onChange={(e)=>setMonto(e.target.value)}

style={{
width:"100%",
padding:"12px"
}}

/>




<button

style={{
marginTop:"15px"
}}

>

Registrar pago

</button>


</form>



</div>

);


}


export default Pagos;
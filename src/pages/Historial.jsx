import {useEffect,useState} from "react";

import {Link} from "react-router-dom";


import {

obtenerAlumnos,

obtenerHistorialCompleto,

resumenMovimientos

}

from "../services/supabaseService";


import ResumenCuenta from "../components/ResumenCuenta";

import HistorialTable from "../components/HistorialTable";




function Historial(){


const [alumnos,setAlumnos]=useState([]);

const [movimientos,setMovimientos]=useState([]);

const [resumen,setResumen]=useState({

consumido:0,

pagado:0,

deuda:0

});





useEffect(()=>{


async function cargar(){


const data=

await obtenerAlumnos();


setAlumnos(data);


}



cargar();


},[]);






async function seleccionar(id){



if(!id){

setMovimientos([]);

return;

}



const data=

await obtenerHistorialCompleto(Number(id));



setMovimientos(data);



setResumen(

resumenMovimientos(data)

);



}





return (

<div className="container">


<Link to="/">
⬅ Volver
</Link>



<h1 style={{marginTop:"20px"}}>

📖 Historial

</h1>




<select

onChange={e=>seleccionar(e.target.value)}

style={{
width:"100%",
padding:"12px",
marginTop:"20px"
}}

>


<option>

Seleccionar alumno

</option>



{

alumnos.map(a=>

<option

key={a.id}

value={a.id}

>

{a.nombre}

</option>

)

}



</select>





<ResumenCuenta

resumen={resumen}

/>




<HistorialTable

movimientos={movimientos}

/>




</div>

);


}


export default Historial;
import {useEffect,useState} from "react";

import {Link} from "react-router-dom";

import {
obtenerAlumnos,
registrarAlumno,
actualizarAlumno,
eliminarAlumno
}
from "../services/supabaseService";

import SearchAlumno from "../components/SearchAlumno";

import AlumnoCard from "../components/AlumnoCard";



function Alumnos(){


const [alumnos,setAlumnos]=useState([]);

const [busqueda,setBusqueda]=useState("");

const [nombre,setNombre]=useState("");

const [nivel,setNivel]=useState("Inicial");

const [grado,setGrado]=useState("3 años");

const [editando,setEditando]=useState(null);



const grados={

Inicial:[
"3 años",
"4 años",
"5 años"
],

Primaria:[
"1er grado",
"2do grado",
"3er grado",
"4to grado",
"5to grado",
"6to grado"
]

};



async function cargar(){

const data=await obtenerAlumnos();
grado: grado.toLowerCase()
setAlumnos(data);

}



useEffect(()=>{

cargar();

},[]);



async function guardar(e){

e.preventDefault();


if(editando){

await actualizarAlumno(
editando.id,
{
nombre,
nivel,
grado
}
);


}else{


await registrarAlumno({
nombre,
nivel,
grado
});


}



setNombre("");

setEditando(null);

cargar();


}



function editar(alumno){

setEditando(alumno);

setNombre(alumno.nombre);

setNivel(alumno.nivel);

setGrado(alumno.grado);

}



async function eliminar(id){

if(confirm("¿Eliminar alumno?")){

await eliminarAlumno(id);

cargar();

}

}



const lista=alumnos.filter(a=>

a.nombre
.toLowerCase()
.includes(busqueda.toLowerCase())

);



return (

<div className="container">


<Link to="/">
⬅ Volver
</Link>



<h1 style={{marginTop:"20px"}}>
👨‍🎓 Alumnos
</h1>



<form
onSubmit={guardar}
style={{
background:"#fff",
padding:"20px",
borderRadius:"12px",
marginTop:"20px"
}}
>


<h3>
{
editando
?"Editar alumno"
:"Nuevo alumno"
}
</h3>



<input

placeholder="Nombre"

value={nombre}

onChange={(e)=>setNombre(e.target.value)}

style={{
width:"100%",
padding:"10px",
marginBottom:"10px"
}}

/>



<select

value={nivel}

onChange={(e)=>{

setNivel(e.target.value);

setGrado(grados[e.target.value][0]);

}}

style={{
width:"100%",
padding:"10px",
marginBottom:"10px"
}}

>


<option>
Inicial
</option>


<option>
Primaria
</option>


</select>



<select

value={grado}

onChange={(e)=>setGrado(e.target.value)}

style={{
width:"100%",
padding:"10px"
}}

>


{
grados[nivel].map(g=>

<option key={g}>
{g}
</option>

)
}


</select>



<button

style={{
marginTop:"15px",
width:"100%",
padding:"12px"
}}

>

Guardar

</button>


</form>




<h3 style={{marginTop:"25px"}}>
Lista de alumnos
</h3>


<SearchAlumno

busqueda={busqueda}

setBusqueda={setBusqueda}

/>



<div style={{marginTop:"15px"}}>


{
lista.map(alumno=>

<AlumnoCard

key={alumno.id}

alumno={alumno}

onEditar={editar}

onEliminar={eliminar}

/>

)
}



</div>



</div>


);


}


export default Alumnos;
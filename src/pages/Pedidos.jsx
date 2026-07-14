import {useEffect,useState} from "react";

import {Link} from "react-router-dom";


import {
obtenerAlumnos,
registrarPedido
}
from "../services/supabaseService";


import PedidoForm from "../components/PedidoForm";



function Pedidos(){


const [alumnos,setAlumnos]=useState([]);



async function cargar(){

const data=await obtenerAlumnos();

setAlumnos(data);

}



useEffect(()=>{

cargar();

},[]);



async function guardar(pedido){

await registrarPedido(pedido);


alert("Pedido registrado");

}



return (

<div className="container">


<Link to="/">
⬅ Volver
</Link>



<h1 style={{marginTop:"20px"}}>
🍽 Registrar Pedido
</h1>



<PedidoForm

alumnos={alumnos}

onGuardar={guardar}

/>



</div>

);


}


export default Pedidos;
import {useEffect,useState} from "react";

import {Link} from "react-router-dom";

import {supabase} from "../supabaseClient";



function Cocina(){


const [pedidos,setPedidos]=useState([]);



async function cargarPedidos(){


const hoy =
new Date()
.toISOString()
.split("T")[0];



const {data,error}=await supabase

.from("movimientos")

.select(`

id,

fecha_almuerzo,

tipo,

alumnos(

nombre,

nivel,

grado

)

`)

.eq("tipo","pedido")

.eq("fecha_almuerzo",hoy);



if(error){

console.log(error);

return;

}



setPedidos(data);



}



useEffect(()=>{


cargarPedidos();



const canal =
supabase

.channel("cocina-tiempo-real")

.on(

"postgres_changes",

{

event:"*",

schema:"public",

table:"movimientos"

},

()=>{

cargarPedidos();

}

)


.subscribe();



return ()=>{

supabase.removeChannel(canal);

}



},[]);





const grupos = {


"3 años":[],

"4 años":[],

"5 años":[],

"1er grado":[],

"2do grado":[],

"3er grado":[],

"4to grado":[],

"5to grado":[],

"6to grado":[]


};



pedidos.forEach(p=>{


if(
p.alumnos &&
grupos[p.alumnos.grado]
){

grupos[p.alumnos.grado]
.push(
p.alumnos.nombre
);

}


});





const total = pedidos.length;




return (


<div className="container">



<Link to="/">
⬅ Volver
</Link>




<h1 style={{marginTop:"20px"}}>

🍳 Cocina

</h1>




<div

style={{

background:"#dcfce7",

padding:"20px",

borderRadius:"15px",

textAlign:"center"

}}

>


<h2>

Total de almuerzos

</h2>


<h1>

{total}

</h1>


</div>





<h2 style={{marginTop:"25px"}}>

Lista de preparación

</h2>





{

Object.entries(grupos)

.map(([grado,nombres])=>{


if(nombres.length===0)

return null;



return (

<div

key={grado}

style={{

background:"#fff",

padding:"20px",

borderRadius:"15px",

marginBottom:"15px",

boxShadow:"0 2px 5px #ddd"

}}

>



<h2>

{grado}

</h2>



<hr />



{

nombres.map((nombre,index)=>(


<p

key={index}

style={{

fontSize:"18px"

}}

>

🍽️ {nombre}

</p>


))

}



</div>


)


})


}



</div>


);


}


export default Cocina;
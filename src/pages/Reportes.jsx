import {useState} from "react";

import {Link} from "react-router-dom";

import {supabase} from "../supabaseClient";



function Reportes(){


const [fecha,setFecha]=useState(
new Date()
.toISOString()
.split("T")[0]
);


const [reporte,setReporte]=useState([]);

const [resumen,setResumen]=useState({

total:0,

venta:0,

pagado:0,

deuda:0

});




async function buscar(){


const {data,error}=await supabase

.from("movimientos")

.select(`

id,

tipo,

monto,

fecha_almuerzo,

detalle,

alumnos(

nombre,

nivel,

grado

)

`)

.eq(
"fecha_almuerzo",
fecha
);



if(error){

console.log(error);

return;

}



let total=0;

let venta=0;

let pagado=0;



data.forEach(m=>{


if(m.tipo==="pedido"){

total++;

venta += Number(m.monto);

}


if(m.tipo==="pago"){

pagado += Number(m.monto);

}


});



setReporte(data);


setResumen({

total,

venta,

pagado,

deuda:
venta-pagado

});



}




return (


<div className="container">


<Link to="/">
⬅ Volver
</Link>



<h1 style={{marginTop:"20px"}}>

📊 Reportes

</h1>




<div

style={{

background:"#fff",

padding:"20px",

borderRadius:"12px"

}}

>


<h3>

Seleccionar fecha

</h3>



<input

type="date"

value={fecha}

onChange={
e=>setFecha(e.target.value)
}

style={{

width:"100%",

padding:"12px"

}}

/>



<button

onClick={buscar}

style={{

width:"100%",

padding:"12px",

marginTop:"15px"

}}

>

Ver reporte

</button>



</div>





<div

style={{

marginTop:"20px",

display:"grid",

gap:"10px"

}}

>



<div>

🍽 Almuerzos:

<b>
 {resumen.total}
</b>

</div>



<div>

💰 Venta:

<b>

S/ {resumen.venta.toFixed(2)}

</b>

</div>



<div>

✅ Pagado:

<b>

S/ {resumen.pagado.toFixed(2)}

</b>

</div>



<div>

🔴 Pendiente:

<b>

S/ {resumen.deuda.toFixed(2)}

</b>

</div>



</div>





<h2>

Detalle

</h2>




{

reporte.map(m=>(


<div

key={m.id}

style={{

background:"#fff",

padding:"15px",

marginBottom:"10px",

borderRadius:"10px"

}}

>



<b>

{m.alumnos?.nombre}

</b>



<p>

{m.alumnos?.nivel}

-

{m.alumnos?.grado}

</p>



<p>

{

m.tipo==="pedido"

?

"🍽 Pedido"

:

"💰 Pago"

}

:

S/ {Number(m.monto).toFixed(2)}

</p>



</div>


))


}



</div>


);


}


export default Reportes;
function HistorialTable({movimientos}){


function mostrarFecha(fecha, esFechaAlmuerzo){

if(!fecha){

return "";

}


if(esFechaAlmuerzo){

const [anio,mes,dia] = fecha.split("-");

return `${dia}/${mes}/${anio}`;

}


const fechaLocal = new Date(fecha);

const dia = String(fechaLocal.getDate()).padStart(2,"0");

const mes = String(fechaLocal.getMonth() + 1).padStart(2,"0");

const anio = fechaLocal.getFullYear();

return `${dia}/${mes}/${anio}`;

}



return (

<div

style={{

marginTop:"20px",

background:"#fff",

padding:"15px",

borderRadius:"10px"

}}

>


<h3>
Movimientos
</h3>



{

movimientos.length===0

?

<p>
Sin movimientos
</p>


:

<table

style={{

width:"100%",

marginTop:"10px"

}}

>


<thead>

<tr>

<th>
Fecha
</th>


<th>
Tipo
</th>


<th>
Monto
</th>


</tr>

</thead>



<tbody>


{

movimientos.map(m=>{


const esPedido = m.tipo === "pedido";


const fechaMostrar = mostrarFecha(

esPedido

?

m.fecha_almuerzo

:

m.fecha_registro,

esPedido

);



return (

<tr key={m.id}>


<td>

{fechaMostrar}

</td>



<td>

{

m.tipo==="pedido"

?

"🍽 Pedido"

:

m.tipo==="pago"

?

"💰 Pago"

:

"❌ Cancelado"

}


</td>



<td>

S/ {Number(m.monto).toFixed(2)}

</td>


</tr>

);

})

}



</tbody>


</table>


}



</div>

);


}


export default HistorialTable;
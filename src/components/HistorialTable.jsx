function HistorialTable({movimientos}){


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

movimientos.map(m=>(


<tr key={m.id}>


<td>

{
new Date(m.fecha_registro)
.toLocaleDateString()
}

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


))

}



</tbody>


</table>


}



</div>

);


}


export default HistorialTable;
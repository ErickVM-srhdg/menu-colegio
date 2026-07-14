function ReporteResumen({resumen}){


return (

<div

style={{

display:"grid",

gridTemplateColumns:"repeat(4,1fr)",

gap:"10px",

marginTop:"20px"

}}

>


<div className="card">

<h2>

{resumen.pedidos}

</h2>

<p>
Almuerzos
</p>

</div>



<div className="card">

<h2>

S/ {resumen.ventas.toFixed(2)}

</h2>

<p>
Ventas
</p>

</div>



<div className="card">

<h2>

S/ {resumen.pagos.toFixed(2)}

</h2>

<p>
Cobrado
</p>

</div>




<div className="card">

<h2>

S/ {resumen.pendiente.toFixed(2)}

</h2>

<p>
Pendiente
</p>

</div>



</div>

);


}


export default ReporteResumen;
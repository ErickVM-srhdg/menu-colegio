function ResumenCuenta({resumen}){


return (

<div

style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"10px",
marginTop:"20px"
}}

>


<div

style={{
background:"#fef3c7",
padding:"15px",
borderRadius:"10px",
textAlign:"center"
}}

>

<p>
Consumido
</p>

<h2>

S/ {resumen.consumido.toFixed(2)}

</h2>


</div>



<div

style={{
background:"#dcfce7",
padding:"15px",
borderRadius:"10px",
textAlign:"center"
}}

>

<p>
Pagado
</p>

<h2>

S/ {resumen.pagado.toFixed(2)}

</h2>


</div>




<div

style={{
background: resumen.deuda>0 ? "#fee2e2":"#dcfce7",
padding:"15px",
borderRadius:"10px",
textAlign:"center"
}}

>

<p>
Debe
</p>

<h2>

S/ {resumen.deuda.toFixed(2)}

</h2>


</div>



</div>

);


}


export default ResumenCuenta;
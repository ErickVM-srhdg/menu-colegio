function ListaDeudores({deudores}){


return (

<div

style={{

marginTop:"25px"

}}

>


<h2>
⚠ Deudores
</h2>



{

deudores.length===0

?

<p>
No existen deudas.
</p>



:


deudores.map((d,index)=>(


<div

key={index}

style={{

background:"#fee2e2",

padding:"15px",

marginBottom:"10px",

borderRadius:"10px"

}}

>


<b>
{d.nombre}
</b>


<p>

{d.nivel}

</p>



<h3>

Debe:

S/ {d.deuda.toFixed(2)}

</h3>


</div>



))


}



</div>

);


}



export default ListaDeudores;
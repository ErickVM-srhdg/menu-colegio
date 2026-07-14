function ListaCocina({pedidos}){


return (

<div

style={{
marginTop:"20px"
}}

>


<h2>
🍽 Lista de preparación
</h2>



{

pedidos.length===0

?

<p>
No hay pedidos para hoy.
</p>


:


pedidos.map((p,index)=>{


const tarde=

new Date(p.fecha_registro)
.getHours()>=11;



return (

<div

key={p.id}

style={{

background:"#fff",

padding:"15px",

marginBottom:"10px",

borderRadius:"10px",

borderLeft:

tarde

?

"6px solid orange"

:

"6px solid green"

}}

>


<b>

#{index+1}

{" "}

{p.alumnos.nombre}

</b>


<p>

{p.alumnos.nivel}

-

{p.alumnos.grado}

</p>


{

tarde &&

<span

style={{
color:"orange",
fontWeight:"bold"
}}

>

⚠ Pedido tardío

</span>

}



</div>


)


})

}



</div>

);


}


export default ListaCocina;
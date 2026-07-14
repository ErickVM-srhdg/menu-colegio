function AlumnoCard({alumno,onEditar,onEliminar}){


return (

<div
style={{
background:"white",
padding:"15px",
borderRadius:"12px",
marginBottom:"10px",
boxShadow:"0 2px 5px rgba(0,0,0,.1)"
}}
>


<h3>
{alumno.nombre}
</h3>


<p>
{alumno.nivel} - {alumno.grado}
</p>


<div style={{display:"flex",gap:"10px"}}>


<button
onClick={()=>onEditar(alumno)}
>
✏️ Editar
</button>


<button
onClick={()=>onEliminar(alumno.id)}
>
🗑️ Eliminar
</button>


</div>


</div>

);


}


export default AlumnoCard;
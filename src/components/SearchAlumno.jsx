function SearchAlumno({busqueda,setBusqueda}){


return (

<input

type="text"

placeholder="Buscar alumno..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

style={{
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"1px solid #ccc",
fontSize:"16px"
}}

/>

);


}


export default SearchAlumno;
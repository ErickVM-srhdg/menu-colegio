import {useState} from "react";


function PagoForm({alumnos,onGuardar,deuda}){


const [alumno,setAlumno]=useState("");

const [monto,setMonto]=useState("");



function seleccionar(id){

setAlumno(id);

}



function guardar(e){

e.preventDefault();


if(!alumno)

return alert("Seleccione alumno");



if(!monto || Number(monto)<=0)

return alert("Ingrese monto");



onGuardar({

alumno_id:Number(alumno),

monto:Number(monto)

});


setMonto("");

}



return (

<form

onSubmit={guardar}

style={{
background:"#fff",
padding:"20px",
borderRadius:"12px"
}}

>


<h3>
Registrar pago
</h3>



<select

value={alumno}

onChange={e=>seleccionar(e.target.value)}

style={{
width:"100%",
padding:"12px"
}}

>


<option value="">
Seleccionar alumno
</option>


{
alumnos.map(a=>

<option
key={a.id}
value={a.id}
>

{a.nombre}

</option>

)
}


</select>



{
deuda &&

<div

style={{
marginTop:"15px",
padding:"15px",
background:"#fee2e2",
borderRadius:"10px"
}}

>

Debe:

<b>
S/ {deuda.toFixed(2)}
</b>


</div>

}



<input

type="number"

placeholder="Monto a pagar"

value={monto}

onChange={e=>setMonto(e.target.value)}

style={{
width:"100%",
padding:"12px",
marginTop:"15px"
}}

/>



<button

style={{
width:"100%",
padding:"12px",
marginTop:"15px"
}}

>

Registrar pago

</button>


</form>

);


}


export default PagoForm;
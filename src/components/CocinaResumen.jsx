function CocinaResumen({cantidad}){


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
padding:"20px",
borderRadius:"12px",
textAlign:"center"
}}

>

<h2>
{cantidad.inicial}
</h2>

<p>
Inicial
</p>

</div>




<div

style={{
background:"#dbeafe",
padding:"20px",
borderRadius:"12px",
textAlign:"center"
}}

>

<h2>
{cantidad.primaria}
</h2>

<p>
Primaria
</p>

</div>




<div

style={{
background:"#dcfce7",
padding:"20px",
borderRadius:"12px",
textAlign:"center"
}}

>

<h2>
{cantidad.total}
</h2>

<p>
Total
</p>

</div>



</div>

);


}


export default CocinaResumen;
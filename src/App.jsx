import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import Alumnos from "./pages/Alumnos";
import Pedidos from "./pages/Pedidos";
import Pagos from "./pages/Pagos";
import Historial from "./pages/Historial";
import Cocina from "./pages/Cocina";
import Reportes from "./pages/Reportes";



function Inicio(){


return (

<div className="container">


<h1>
🍽️ Menú Colegio
</h1>


<p>
Control de almuerzos y pagos
</p>



<div

style={{

display:"grid",

gap:"12px",

marginTop:"25px"

}}

>


<Link to="/alumnos">

<button>
👨‍🎓 Alumnos
</button>

</Link>



<Link to="/pedidos">

<button>
🍽 Pedidos
</button>

</Link>



<Link to="/pagos">

<button>
💰 Pagos
</button>

</Link>



<Link to="/historial">

<button>
📖 Historial
</button>

</Link>



<Link to="/cocina">

<button>
🍳 Cocina
</button>

</Link>



<Link to="/reportes">

<button>
📊 Reportes
</button>

</Link>



</div>


</div>

);


}





function App(){


return (

<BrowserRouter>


<Routes>



<Route

path="/"

element={<Inicio/>}

/>



<Route

path="/alumnos"

element={<Alumnos/>}

/>



<Route

path="/pedidos"

element={<Pedidos/>}

/>



<Route

path="/pagos"

element={<Pagos/>}

/>



<Route

path="/historial"

element={<Historial/>}

/>



<Route

path="/cocina"

element={<Cocina/>}

/>



<Route

path="/reportes"

element={<Reportes/>}

/>



</Routes>


</BrowserRouter>


);


}



export default App;
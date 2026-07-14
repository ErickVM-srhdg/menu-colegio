import { Link } from "react-router-dom";

const botones = [
  {
    titulo: "Registrar Pedido",
    icono: "🍽️",
    ruta: "/pedidos",
    color: "#2563eb",
  },
  {
    titulo: "Registrar Pago",
    icono: "💰",
    ruta: "/pagos",
    color: "#16a34a",
  },
  {
    titulo: "Alumnos",
    icono: "👨‍🎓",
    ruta: "/alumnos",
    color: "#7c3aed",
  },
  {
    titulo: "Historial",
    icono: "📖",
    ruta: "/historial",
    color: "#ea580c",
  },
  {
    titulo: "Cocina",
    icono: "🍳",
    ruta: "/cocina",
    color: "#0891b2",
  },
  {
    titulo: "Reportes",
    icono: "📊",
    ruta: "/reportes",
    color: "#dc2626",
  },
];

function Home() {
  return (
    <div className="container">

      <header className="header">

        <h1>🍱 Menús Colegio</h1>

        <p>Sistema de Control</p>

      </header>

      <div className="grid">

        {botones.map((boton) => (

          <Link
            key={boton.ruta}
            to={boton.ruta}
            className="card"
            style={{ backgroundColor: boton.color }}
          >
            <span className="icon">{boton.icono}</span>

            <h2>{boton.titulo}</h2>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Home;
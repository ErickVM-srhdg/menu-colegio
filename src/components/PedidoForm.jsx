import { useState } from "react";


function PedidoForm({ alumnos, onGuardar }) {


    const [nivel, setNivel] = useState("");

    const [grado, setGrado] = useState("");

    const [alumno, setAlumno] = useState("");

    const [estado, setEstado] = useState("debe");

    const [usarFechaAnterior, setUsarFechaAnterior] = useState(false);

    const [fecha, setFecha] = useState(
        new Date().toLocaleDateString("en-CA")
    );



    const grados = {

        Inicial: [
            "3 años",
            "4 años",
            "5 años"
        ],

        Primaria: [
            "1er grado",
            "2do grado",
            "3er grado",
            "4to grado",
            "5to grado",
            "6to grado"
        ]

    };



    function guardar(e) {

        e.preventDefault();


        if (!nivel || !grado || !alumno) {

            alert("Complete todos los campos");

            return;

        }



        const seleccionado = alumnos.find(

            a => a.id === Number(alumno)

        );



        const precio =
            seleccionado.nivel === "Inicial"
                ?
                8
                :
                9;



        onGuardar({

            alumno_id: seleccionado.id,

            monto: precio,

            pagado: estado === "pago",

            fecha_almuerzo: fecha

        });



        setAlumno("");

        setEstado("debe");

        setUsarFechaAnterior(false);

        setFecha(
            new Date().toLocaleDateString("en-CA")
        );


    }



    const alumnosMostrar = alumnos.filter(

        a =>

            a.nivel === nivel &&
            a.grado === grado

    );



    const hoy = new Date().toLocaleDateString("en-CA");



    return (

        <form

            onSubmit={guardar}

            style={{

                background: "#fff",

                padding: "20px",

                borderRadius: "12px"

            }}

        >


            <h3>
                🍽 Nuevo pedido
            </h3>



            <label>
                Nivel
            </label>


            <select

                value={nivel}

                onChange={e => {

                    setNivel(e.target.value);

                    setGrado("");

                    setAlumno("");

                }}

                style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "15px"
                }}

            >


                <option value="">
                    Seleccionar
                </option>


                <option value="Inicial">
                    Inicial
                </option>


                <option value="Primaria">
                    Primaria
                </option>


            </select>




            {

                nivel &&

                <>


                    <label>
                        Grado / Edad
                    </label>


                    <select

                        value={grado}

                        onChange={e => {

                            setGrado(e.target.value);

                            setAlumno("");

                        }}

                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px"
                        }}

                    >


                        <option value="">
                            Seleccionar
                        </option>


                        {

                            grados[nivel].map(g => (

                                <option

                                    key={g}

                                    value={g}

                                >

                                    {g}

                                </option>

                            ))

                        }


                    </select>


                </>

            }




            {

                grado &&

                <>


                    <label>
                        Alumno
                    </label>


                    <select

                        value={alumno}

                        onChange={e => setAlumno(e.target.value)}

                        style={{
                            width: "100%",
                            padding: "12px"
                        }}

                    >


                        <option value="">
                            Seleccionar alumno
                        </option>


                        {

                            alumnosMostrar.map(a => (

                                <option

                                    key={a.id}

                                    value={a.id}

                                >

                                    {a.nombre}

                                </option>

                            ))

                        }


                    </select>


                </>

            }




            {

                alumno &&

                <>


                    <div

                        style={{

                            background: "#dcfce7",

                            padding: "15px",

                            marginTop: "15px",

                            borderRadius: "10px"

                        }}

                    >

                        Precio:

                        <b>

                            S/ {nivel === "Inicial" ? 8 : 9}

                        </b>


                    </div>



                    <h4>
                        Estado del pedido
                    </h4>


                    <label>

                        <input

                            type="radio"

                            checked={estado === "pago"}

                            onChange={() => setEstado("pago")}

                        />

                        🟢 Pagó

                    </label>



                    <br />



                    <label>

                        <input

                            type="radio"

                            checked={estado === "debe"}

                            onChange={() => setEstado("debe")}

                        />

                        🔴 Debe

                    </label>



                    <h4 style={{ marginTop: "20px" }}>
                        Fecha del menú
                    </h4>



                    <label>

                        <input

                            type="checkbox"

                            checked={usarFechaAnterior}

                            onChange={e => {

                                setUsarFechaAnterior(e.target.checked);

                                setFecha(hoy);

                            }}

                        />

                        Registrar pedido de una fecha anterior

                    </label>



                    {

                        usarFechaAnterior &&

                        <div style={{ marginTop: "10px" }}>

                            <input

                                type="date"

                                value={fecha}

                                max={hoy}

                                onChange={e => setFecha(e.target.value)}

                                style={{

                                    width: "100%",

                                    padding: "12px"

                                }}

                            />

                            <p style={{

                                fontSize: "14px",

                                marginTop: "8px",

                                color: "#666"

                            }}>

                                Solo se pueden seleccionar fechas anteriores a hoy.

                            </p>

                        </div>

                    }



                    <button

                        style={{

                            width: "100%",

                            padding: "12px",

                            marginTop: "20px"

                        }}

                    >

                        Registrar pedido

                    </button>


                </>

            }


        </form>

    );

}


export default PedidoForm;
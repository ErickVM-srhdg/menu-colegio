import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { obtenerEstadoCuentas } from "../services/supabaseService";


function EstadoCuentas(){

    const [alumnos,setAlumnos] = useState([]);
    const [cargando,setCargando] = useState(true);
    const [abierto,setAbierto] = useState(null);


    useEffect(()=>{

        async function cargar(){

            try{

                const data = await obtenerEstadoCuentas();

                setAlumnos(data);

            }catch(error){

                console.error(error);
                alert("No se pudo cargar el estado de cuentas");

            }finally{

                setCargando(false);

            }

        }

        cargar();

    },[]);


    function obtenerResumen(alumno){

        let consumido = 0;
        let pagado = 0;


        alumno.movimientos?.forEach(m=>{

            if(m.tipo === "pedido"){

                consumido += Number(m.monto);

            }

            if(m.tipo === "pago"){

                pagado += Number(m.monto);

            }

        });


        return {

            consumido,
            pagado,
            deuda: consumido - pagado

        };

    }


    const totalDeuda = alumnos.reduce((total,alumno)=>{

        const resumen = obtenerResumen(alumno);

        return total + Math.max(resumen.deuda,0);

    },0);


    const niveles = [
        {
            nombre:"Inicial",
            icono:"👶",
            grados:[
                "3 años",
                "4 años",
                "5 años"
            ]
        },
        {
            nombre:"Primaria",
            icono:"🎒",
            grados:[
                "1er grado",
                "2do grado",
                "3er grado",
                "4to grado",
                "5to grado",
                "6to grado"
            ]
        }
    ];


    function mostrarDetalle(alumno){

        if(abierto === alumno.id){

            setAbierto(null);

        }else{

            setAbierto(alumno.id);

        }

    }


    if(cargando){

        return (
            <div className="container">

                <Link to="/">⬅ Volver</Link>

                <h1 style={{marginTop:"20px"}}>
                    📋 Estado de cuentas
                </h1>

                <p>Cargando...</p>

            </div>
        );

    }


    return (

        <div className="container">

            <Link to="/">⬅ Volver</Link>


            <h1 style={{marginTop:"20px"}}>
                📋 Estado de cuentas
            </h1>


            {/* TOTAL DEUDA */}

            <div
                style={{
                    background:"#fff",
                    padding:"20px",
                    borderRadius:"12px",
                    marginTop:"20px",
                    marginBottom:"25px"
                }}
            >

                <h2 style={{marginTop:0}}>
                    💰 Total pendiente
                </h2>

                <div
                    style={{
                        fontSize:"28px",
                        fontWeight:"bold"
                    }}
                >
                    S/ {totalDeuda.toFixed(2)}
                </div>

            </div>


            {/* NIVELES */}

            {niveles.map(nivel=>{

                return (

                    <div key={nivel.nombre}>

                        <h2 style={{marginTop:"30px"}}>
                            {nivel.icono} {nivel.nombre}
                        </h2>


                        {nivel.grados.map(grado=>{

                            const alumnosGrado = alumnos.filter(
                                alumno =>
                                    alumno.nivel === nivel.nombre &&
                                    alumno.grado === grado
                            );


                            if(alumnosGrado.length === 0){

                                return null;

                            }


                            return (

                                <div key={grado} style={{marginBottom:"25px"}}>

                                    <h3>
                                        {grado}
                                    </h3>


                                    {alumnosGrado.map(alumno=>{

                                        const resumen =
                                            obtenerResumen(alumno);

                                        const debe =
                                            resumen.deuda > 0;


                                        return (

                                            <div
                                                key={alumno.id}
                                                style={{
                                                    background:"#fff",
                                                    padding:"15px",
                                                    borderRadius:"10px",
                                                    marginBottom:"10px",
                                                    cursor:"pointer"
                                                }}
                                                onClick={() =>
                                                    mostrarDetalle(alumno)
                                                }
                                            >

                                                <div
                                                    style={{
                                                        display:"flex",
                                                        justifyContent:"space-between",
                                                        alignItems:"center"
                                                    }}
                                                >

                                                    <div>

                                                        <strong>
                                                            {debe
                                                                ? "🔴"
                                                                : "🟢"
                                                            }{" "}
                                                            {alumno.nombre}
                                                        </strong>

                                                    </div>


                                                    <div>

                                                        {debe

                                                            ?

                                                            <strong>
                                                                Debe: S/{" "}
                                                                {resumen.deuda.toFixed(2)}
                                                            </strong>

                                                            :

                                                            <span>
                                                                Al día
                                                            </span>

                                                        }

                                                    </div>

                                                </div>


                                                {abierto === alumno.id && (

                                                    <div
                                                        style={{
                                                            marginTop:"15px",
                                                            paddingTop:"15px",
                                                            borderTop:"1px solid #ddd"
                                                        }}
                                                    >

                                                        <p>
                                                            <strong>
                                                                Consumido:
                                                            </strong>{" "}
                                                            S/ {resumen.consumido.toFixed(2)}
                                                        </p>

                                                        <p>
                                                            <strong>
                                                                Pagado:
                                                            </strong>{" "}
                                                            S/ {resumen.pagado.toFixed(2)}
                                                        </p>

                                                        <p>
                                                            <strong>
                                                                Deuda:
                                                            </strong>{" "}
                                                            S/ {Math.max(resumen.deuda,0).toFixed(2)}
                                                        </p>


                                                        <h4>
                                                            Movimientos
                                                        </h4>


                                                        {alumno.movimientos?.length === 0

                                                            ?

                                                            <p>
                                                                Sin movimientos
                                                            </p>

                                                            :

                                                            alumno.movimientos.map(m=>{

                                                                const fecha =
                                                                    m.tipo === "pedido"
                                                                        ? m.fecha_almuerzo
                                                                        : m.fecha_registro;


                                                                let fechaMostrar = "";


                                                                if(fecha){

                                                                    if(m.tipo === "pedido"){

                                                                        const [anio,mes,dia] =
                                                                            fecha.split("-");

                                                                        fechaMostrar =
                                                                            `${dia}/${mes}/${anio}`;

                                                                    }else{

                                                                        const fechaLocal =
                                                                            new Date(fecha);

                                                                        const dia =
                                                                            String(
                                                                                fechaLocal.getDate()
                                                                            ).padStart(2,"0");

                                                                        const mes =
                                                                            String(
                                                                                fechaLocal.getMonth()+1
                                                                            ).padStart(2,"0");

                                                                        const anio =
                                                                            fechaLocal.getFullYear();

                                                                        fechaMostrar =
                                                                            `${dia}/${mes}/${anio}`;

                                                                    }

                                                                }


                                                                return (

                                                                    <div
                                                                        key={m.id}
                                                                        style={{
                                                                            padding:"8px 0",
                                                                            borderBottom:"1px solid #eee"
                                                                        }}
                                                                    >

                                                                        {m.tipo === "pedido"
                                                                            ? "🍽 Pedido"
                                                                            : "💰 Pago"
                                                                        }

                                                                        {" — "}

                                                                        {fechaMostrar}

                                                                        {" — S/ "}

                                                                        {Number(m.monto).toFixed(2)}

                                                                    </div>

                                                                );

                                                            })

                                                        }

                                                    </div>

                                                )}

                                            </div>

                                        );

                                    })}

                                </div>

                            );

                        })}

                    </div>

                );

            })}

        </div>

    );

}


export default EstadoCuentas;
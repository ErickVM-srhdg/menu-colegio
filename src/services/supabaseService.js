import { supabase } from "../supabaseClient";


// ===============================
// ALUMNOS
// ===============================

export async function obtenerAlumnos() {

    const { data, error } = await supabase
        .from("alumnos")
        .select("*")
        .eq("activo", true)
        .order("nombre", { ascending: true });


    if (error) throw error;

    return data;
}



export async function registrarAlumno(alumno) {

    const { data, error } = await supabase
        .from("alumnos")
        .insert([
            {
                nombre: alumno.nombre,
                nivel: alumno.nivel,
                grado: alumno.grado
            }
        ])
        .select();


    if(error) throw error;

    return data[0];

}



export async function actualizarAlumno(id, alumno) {

    const { data, error } = await supabase
        .from("alumnos")
        .update({
            nombre: alumno.nombre,
            nivel: alumno.nivel,
            grado: alumno.grado
        })
        .eq("id", id)
        .select();


    if(error) throw error;

    return data[0];

}



export async function eliminarAlumno(id) {

    const { error } = await supabase
        .from("alumnos")
        .update({
            activo:false
        })
        .eq("id", id);


    if(error) throw error;

}



export async function buscarAlumnos(texto){

    const {data,error}=await supabase
        .from("alumnos")
        .select("*")
        .eq("activo",true)
        .ilike("nombre", `%${texto}%`)
        .order("nombre");


    if(error) throw error;


    return data;

}
// ===============================
// PEDIDOS
// ===============================


export async function registrarPedido(pedido){


const movimientos = [];


// Siempre registra el pedido

movimientos.push({

alumno_id:pedido.alumno_id,

tipo:"pedido",

monto:pedido.monto,

fecha_almuerzo:
new Date()
.toISOString()
.split("T")[0],

detalle:"Pedido de almuerzo"

});




// Si pagó, registra también el pago

if(pedido.pagado){


movimientos.push({

alumno_id:pedido.alumno_id,

tipo:"pago",

monto:pedido.monto,

fecha_almuerzo:
new Date()
.toISOString()
.split("T")[0],

detalle:"Pago del almuerzo"

});


}



const {data,error}=await supabase

.from("movimientos")

.insert(movimientos);



if(error)

throw error;



return data;


}



export async function obtenerPedidosHoy(fecha){

    const {data,error}=await supabase
    .from("movimientos")
    .select(`
        id,
        fecha_almuerzo,
        estado,
        alumnos(
            id,
            nombre,
            nivel,
            grado
        )
    `)
    .eq("tipo","pedido")
    .eq("fecha_almuerzo",fecha)
    .neq("estado","cancelado")
    .order("id");


    if(error) throw error;


    return data;

}



export async function cancelarPedido(id){

    const {error}=await supabase
    .from("movimientos")
    .update({
        estado:"cancelado",
        tipo:"cancelacion"
    })
    .eq("id",id);



    if(error) throw error;

}

// ===============================
// PAGOS Y ESTADO DE CUENTA
// ===============================


export async function obtenerMovimientosAlumno(alumno_id){


    const {data,error}=await supabase

    .from("movimientos")

    .select("*")

    .eq("alumno_id",alumno_id)

    .order("fecha_registro",{ascending:false});



    if(error) throw error;


    return data;

}




export async function calcularDeuda(alumno_id){


    const movimientos = await obtenerMovimientosAlumno(alumno_id);


    let consumido=0;

    let pagado=0;



    movimientos.forEach(m=>{


        if(m.tipo==="pedido"){

            consumido += Number(m.monto);

        }


        if(m.tipo==="pago"){

            pagado += Number(m.monto);

        }


    });



    return {

        consumido,

        pagado,

        deuda: consumido-pagado

    };


}





export async function registrarPago(pago){


    const {data,error}=await supabase

    .from("movimientos")

    .insert([

        {

            alumno_id:pago.alumno_id,

            tipo:"pago",

            monto:pago.monto,

            fecha_almuerzo:new Date(),

            detalle:"Pago realizado"

        }

    ])

    .select();



    if(error) throw error;


    return data[0];


}

// ===============================
// HISTORIAL
// ===============================


export async function obtenerHistorialCompleto(alumno_id){


const {data,error}=await supabase

.from("movimientos")

.select("*")

.eq("alumno_id",alumno_id)

.order("fecha_registro",{ascending:false});



if(error) throw error;


return data;


}





export function resumenMovimientos(movimientos){


let consumido=0;

let pagado=0;



movimientos.forEach(m=>{


if(m.tipo==="pedido"){

consumido+=Number(m.monto);

}



if(m.tipo==="pago"){

pagado+=Number(m.monto);

}



});



return {


consumido,

pagado,

deuda:consumido-pagado


};



}
// ===============================
// COCINA
// ===============================


export async function obtenerPedidosCocina(fecha){


const {data,error}=await supabase

.from("movimientos")

.select(`
    id,
    monto,
    fecha_almuerzo,
    fecha_registro,
    estado,
    alumnos(
        id,
        nombre,
        nivel,
        grado
    )
`)

.eq("tipo","pedido")

.eq("fecha_almuerzo",fecha)

.neq("estado","cancelado")

.order("fecha_registro",{ascending:true});



if(error) throw error;


return data;


}



export function contarPedidos(pedidos){


let inicial=0;

let primaria=0;



pedidos.forEach(p=>{


if(p.alumnos.nivel==="Inicial"){

inicial++;

}



if(p.alumnos.nivel==="Primaria"){

primaria++;

}


});



return {

inicial,

primaria,

total:inicial+primaria

};


}
// ===============================
// REPORTES
// ===============================


export async function obtenerReporteDia(fecha){


const {data,error}=await supabase

.from("movimientos")

.select(`
    *,
    alumnos(
        nombre,
        nivel,
        grado
    )
`)

.eq("fecha_almuerzo",fecha);



if(error) throw error;


return data;


}




export function generarResumenDia(movimientos){


let ventas=0;

let pagos=0;

let pedidos=0;



movimientos.forEach(m=>{


if(m.tipo==="pedido"){

ventas+=Number(m.monto);

pedidos++;

}



if(m.tipo==="pago"){

pagos+=Number(m.monto);

}


});



return {


pedidos,

ventas,

pagos,

pendiente:ventas-pagos


};



}







export function obtenerDeudores(movimientos){



const alumnos={};



movimientos.forEach(m=>{


const id=m.alumno_id;



if(!alumnos[id]){


alumnos[id]={

nombre:m.alumnos.nombre,

nivel:m.alumnos.nivel,

consumido:0,

pagado:0

};


}



if(m.tipo==="pedido"){

alumnos[id].consumido += Number(m.monto);

}



if(m.tipo==="pago"){

alumnos[id].pagado += Number(m.monto);

}



});




return Object.values(alumnos)

.filter(a=>

a.consumido-a.pagado>0

)

.map(a=>({

...a,

deuda:

a.consumido-a.pagado

}));



}
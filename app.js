const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;

app.use(express.json());

// Empleados - REBOLLOSO SAUCEDO ANA PAOLA
// ID (entero autoincremental)
// Nombre (cadena de texto)
// Apellido (cadena de texto)
// Fecha de nacimiento (fecha)
// Cargo (cadena de texto)

let empleados = [
    {id:1,nombre:"Ana", apellido:"Rebolloso", fecha_nacimiento:"03-07-2002", cargo:"Editor"},
    {id:2,nombre:"Sagrario", apellido:"Medina", fecha_nacimiento:"05-06-2001", cargo:"Fotógrafo"},
    {id:3,nombre:"Rubí", apellido:"Conde", fecha_nacimiento:"20-09-2002", cargo:"Videografo"},
    {id:4,nombre:"Alejandro", apellido:"Saucedo", fecha_nacimiento:"20-10-2001", cargo:"Fotógrafo"},
    {id:5,nombre:"Pilar", apellido:"Chairez", fecha_nacimiento:"12-10-2001", cargo:"Videografo"},
    {id:6,nombre:"Iván", apellido:"García", fecha_nacimiento:"30-08-1998", cargo:"Videografo"},
    {id:7,nombre:"Luis", apellido:"Sánchez", fecha_nacimiento:"26-12-2003", cargo:"Diseñador"},
    {id:8,nombre:"Raquel", apellido:"Sandate", fecha_nacimiento:"19-12-1980", cargo:"Auxiliar"},
    {id:9,nombre:"Victoria", apellido:"Rodríguez", fecha_nacimiento:"10-04-2002", cargo:"Editor"},
    {id:10,nombre:"Gerardo", apellido:"Rebolloso", fecha_nacimiento:"27-02-2000", cargo:"Auxiliar"}
];

app.get('/empresa/v1/empleados', (req, res) => {
    //Todos los empleados
    // 1. Verificar si existen empleados
    if (empleados.length>0){
        // 2. Mostrar con un estado y mensaje
        res.status(200).json({
            estado:1,
            mensaje: "Existen empleados",
            empleados: empleados
        })
    }else{
        // 3. No existen, mostrar estado y mensaje
        res.status(404).json({
            estado:0,
            mensaje: "No existen empleados"
        })
    }
});

app.get('/empresa/v1/empleados/:id', (req, res) => {
    const id = req.params.id;
    const empleado = empleados.find(empleado => empleado.id == id);

    if(empleado){
        //Si se encontró al empleado
        res.status(200).json({
            estado:1,
            mensaje: "Se encontró al empleado",
            empleado: empleado
        })
    }else{
        //No se encontró empleado
        res.status(404).json({
            estado:0,
            mensaje: "No se encontró empleado"
        })
    }
});

app.post('/empresa/v1/empleados', (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const cargo = req.body.cargo;

    // Generar un ID aleatorio único
    //-----------------------------------------------------------------------------------
    let id;
    let empleadoExistente;

    do {
        id = Math.round(Math.random() * 1000);
        empleadoExistente = empleados.find(empleado => empleado.id === id);
    } while (empleadoExistente);
    //-----------------------------------------------------------------------------------

    if(nombre==undefined || apellido==undefined || fecha_nacimiento==undefined || cargo==undefined){
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parámetros en la solicitud"
        })
    }else{
        const empleado = {id:id, nombre:nombre, apellido:apellido, fecha_nacimiento:fecha_nacimiento, cargo:cargo}
        let logitudInicial = empleados.length;
        empleados.push(empleado)
        // Comprobar que se creó un nuevo empleado
        if(empleados.length > logitudInicial){
            res.status(200).json({
                estado:1,
                mensaje:"Empleado creado",
                empleado:empleado
            })
        }else{
            res.status(500).json({
                estado:0,
                mensaje:"Ocurrió un error desconocido"
            })
        }
    }
});

app.put('/empresa/v1/empleados/:id', (req, res) => {
    //Actualizar datos de empleado
    const id = req.params.id;
    const {nombre, apellido, fecha_nacimiento, cargo} = req.body;
    
    if(nombre==undefined || apellido==undefined || fecha_nacimiento==undefined || cargo==undefined){
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parámetros en la solicitud"
        })
    }else{
        const posActualizar = empleados.findIndex(empleado => empleado.id == id)
        if(posActualizar != -1){
            //Si encontro al empleado con el id buscado
            empleados[posActualizar].nombre = nombre;
            empleados[posActualizar].apellido = apellido;
            empleados[posActualizar].fecha_nacimiento = fecha_nacimiento;
            empleados[posActualizar].cargo = cargo;

            res.status(200).json({
                estado: 1,
                mensaje: "Empleado actualizado",
                empleado: empleados[posActualizar]
            })
        }else{
            //No se encontró
            res.status(404).json({
                estado: 0,
                mensaje: "No se encontró empleado"
            })
        }
    }    
});

app.delete('/empresa/v1/empleados/:id', (req, res) => {
    //Eliminar empleado
    const id = req.params.id;
    const posEliminar = empleados.findIndex(empleado => empleado.id == id)
    
    if(posEliminar != -1){
        //Si encontro al empleado con el id buscado
        empleados.splice(posEliminar, 1); 

        res.status(201).json({
            estado: 1,
            mensaje: "Empleado eliminado"
        })
    }else{
        //No se encontró
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontró empleado"
        })
    }
});


app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto: ', puerto);

});
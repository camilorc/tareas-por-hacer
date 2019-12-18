const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = ()=>{

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json',data,(err)=>{
        if(err) throw new Error('No se puedo guardar el archivo',err);
    });

}

const cargarBD = ()=>{

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    } 

    
}

const listar = ()=>{
    cargarBD();
    return listadoPorHacer;
}

const crear = (descripcion)=>{

    cargarBD();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;

}

const actualizarPorHacer = (descripcion, completado = true) => {

    cargarBD();

    let index  = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    });

    listadoPorHacer[index].completado = completado;

    guardarDB();

    if(index >= 0) return true;
    return false;
}

const borrarPorHacer = (descripcion) => {

    cargarBD();

    let nuevoListado  = listadoPorHacer.filter( tarea => {
        return tarea.descripcion !== descripcion
    })

    if(nuevoListado.length === listadoPorHacer.length){
        return false
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    
}

module.exports = {
    crear,
    listar,
    actualizarPorHacer,
    borrarPorHacer
}
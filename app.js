const argv = require('./config/yargs').argv;

const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch(comando){
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
    break;

    case 'listar':
        let listarPorHacer = porHacer.listar();
        for(let tarea of listarPorHacer){
            console.log('====Por Hacer====');
            console.log(tarea.descripcion);
            console.log('Estado',tarea.completado);
            console.log('=================');
        }
    break;

    case 'actualizar':
        let actualizar = porHacer.actualizarPorHacer(argv.descripcion,argv.completado);
        console.log(actualizar);
    break;

    case 'borrar':
        let borrar = porHacer.borrarPorHacer(argv.descripcion);
        console.log(borrar);
    break;

    default:
            console.log('Comando no reconocido');
    break;
}

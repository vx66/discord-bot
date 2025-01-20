// Archivo: app.js
const EventEmitter = require('events');
const events = new EventEmitter();

// Función para simular errores
function runApp() {
    console.log("La aplicación está iniciando...");

    setTimeout(() => {
        console.log("Ejecutando una tarea...");
        try {
            throw new Error("¡Algo salió mal durante la ejecución!");
        } catch (error) {
            // Emitir un evento de error
            events.emit('error', error);
        }
    }, 2000);

    setTimeout(() => {
        console.log("Ejecutando otra tarea...");
        try {
            JSON.parse("{ invalidJson }"); // Esto causará un error
        } catch (error) {
            // Emitir un evento de error
            events.emit('error', error);
        }
    }, 4000);
}

// Exportar el EventEmitter para que el bot pueda usarlo
module.exports = { runApp, events };
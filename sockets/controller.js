import { TicketControl } from './../models/ticket-control.js';

const ticketControl = new TicketControl();

const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es necesario'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets'
            });
        } else {
            callback({
                ok: true,
                ticket,
                pendientes: ticketControl.tickets.length
            });
        }
    });
};

export { socketController };

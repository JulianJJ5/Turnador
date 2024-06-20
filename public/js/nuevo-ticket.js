document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io();
    const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
    const btnCrear = document.querySelector('button');

    if (!lblNuevoTicket || !btnCrear) {
        console.error('Elementos DOM no encontrados');
        return;
    }

    socket.on('connect', () => {
        btnCrear.disabled = false;
    });

    socket.on('disconnect', () => {
        btnCrear.disabled = true;
    });

    btnCrear.addEventListener('click', () => {
        socket.emit('siguiente-ticket', null, (ticket) => {
            lblNuevoTicket.innerText = `${ticket}`;
        });
    });

    socket.on('ultimo-ticket', (ultimo) => {
        lblNuevoTicket.innerText = `Ticket ${ultimo}`;
    });
});

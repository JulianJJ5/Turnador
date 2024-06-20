document.addEventListener(`DOMContentLoaded`, () => {
    const socket = io();
    const searchParams = new URLSearchParams(window.location.search);
    const escritorio = searchParams.get('escritorio');
    console.log(escritorio);
    const lblAtendiendo = document.querySelector('small');
    const btnAtender = document.querySelector('button');
    const lblPendientes = document.querySelector('#lblPendientes');

    document.querySelector('h1').innerText = `${escritorio}`;
    const sound = new Audio('./audio/new-ticket.mp3');

    btnAtender.addEventListener('click', () => {
        socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, pendientes }) => {
            sound.play();
            if (!ok) //Si ok es false, significa que no hay más tickets disponibles 
            {
                lblAtendiendo.innerText = 'No hay Tickets Pendientes';
                return alert('No hay más tickets');
            }

            lblAtendiendo.innerText = `Ticket ${ticket.numero}`;
            lblPendientes.innerText = pendientes;

        });
    });
    socket.on(`tickets-pendientes`, (pendientes) => {
        lblPendientes.innerText = pendientes;
    });

});


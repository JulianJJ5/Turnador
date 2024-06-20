document.addEventListener('DOMContentLoaded', (event) => {
    const lblOnline = document.querySelector('#lblOnline');
    const lblOffline = document.querySelector('#lblOffline');
    const btnEnviar = document.querySelector('#btnEnviar');
    const txtMensaje = document.querySelector('#txtMensaje');
    const socket = io();

    socket.on('connect', () => {
        if (lblOnline) {
            lblOnline.style.display = 'block';
        }
        if (lblOffline) {
            lblOffline.style.display = 'none';
        }
    });

    socket.on('disconnect', () => {
        if (lblOnline) {
            lblOnline.style.display = 'none';
        }
        if (lblOffline) {
            lblOffline.style.display = 'block';
        }
    });

    if (btnEnviar) {
        btnEnviar.addEventListener('click', () => {
            const mensaje = txtMensaje.value;
            const payload = {
                mensaje,
                id: '123ABC',
                fecha: new Date().getTime()
            };
            socket.emit('enviar-mensaje', payload, (id) => {
                console.log('Desde el server', id);
            });
        });
    }
});

import express from 'express';
import cors from 'cors';
import http from 'http';
import * as io from "socket.io";
import { socketController } from './../sockets/controller.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = http.createServer(this.app);
        this.io = new io.Server(this.server);

        this.middlewares();
        this.routes();
        this.sockets();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    routes() {
        // Define aquí las rutas si es necesario
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export { Server };

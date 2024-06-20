import {} from 'dotenv/config.js'
import {Server} from './models/server.js'


const server = new Server();



server.listen(process.env.PORT, ()=>{
    console.log(`Conectado en el Puerto ${process.env.PORT}`);
});
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0 
        this.hoy = new Date().getDate();
        this.tickets = []; //almacen de tickets
        this.ultimos4 = []; //tickets que se muestran en pantalla "publico.html"

    }

    siguiente() {
        this.ultimo += 1; 
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio){
        if (this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // elimina el ultimo elemento
        }

        return ticket;

    }
}

export { TicketControl };
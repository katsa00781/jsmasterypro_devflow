// get by id // path: app/api/tickets/[id].ts
import { NextResponse } from "next/server";

import tickets from "@/app/database";




export async function GET(_ : Request, {params} : {params: Promise<{id: string}>}) {
    const { id } = await params;

    const ticket = tickets.find((ticket) => ticket.id === parseInt(id));

    return NextResponse.json(ticket);
}

/**
 * Jegy frissítése a rendszerben a megadott azonosító és kérés törzs alapján.
 * 
 * @param request - HTTP kérés objektum, amely tartalmazza a frissítési adatokat
 * @param params - Az útvonal paramétereket tartalmazó objektum
 * @param params.id - A frissítendő jegy egyedi azonosítója
 * 
 * @returns {Promise<NextResponse>} Egy Promise, amely a következőket adhatja vissza:
 * - Siker (200): A frissített jegy objektum
 * - Hiba (404): Ha nem található jegy a megadott azonosítóval
 * 
 * @example
 * // Példa kérés törzs:
 * {
 *   "name": "Frissített Jegy Neve",
 *   "status": "folyamatban",
 *   "type": "hiba"
 * }
 * 
 * @throws {Error} Ha nem található a megadott azonosítójú jegy
 * 
 * @note Csak a megadott mezők kerülnek frissítésre; a kihagyott mezők megtartják eredeti értéküket
 */

export async function PUT(request: Request, {params} : {params: Promise<{id: string}>}) {
    const { id } = await params;
    const {name, status, type} = await request.json();

    const ticket = tickets.find((ticket) => ticket.id === parseInt(id));

    if (!ticket) return NextResponse.json(new Error("Ticket not found"), {status: 404});

    if (name) ticket.name = name;
    if (status) ticket.status = status;
    if (type) ticket.type = type;

    return NextResponse.json(ticket);

}

/**
 * Jegy törlése a rendszerből a megadott azonosító alapján.
 * 
 * @param request - HTTP kérés objektum, amely tartalmazza a törlési adatokat
 * @param params - Az útvonal paramétereket tartalmazó objektum
 * @param params.id - A törlendő jegy egyedi azonosítója
 * 
 * @returns {Promise<NextResponse>} Egy Promise, amely a következőket adhatja vissza:
 * - Siker (200): A törölt jegy objektum
 * - Hiba (404): Ha nem található jegy a megadott azonosítóval
 * 
 * @throws {Error} Ha nem található a megadott azonosítójú jegy
 */

export async function DELETE(_: Request, {params} : {params: Promise<{id: string}>}) {
    const { id } = await params;

    const ticketIndex = tickets.findIndex((ticket) => ticket.id === parseInt(id));

    if (ticketIndex === -1) return NextResponse.json(new Error("Ticket not found"), {status: 404});

    const [ticket] = tickets.splice(ticketIndex, 1);

    return NextResponse.json(ticket);
}

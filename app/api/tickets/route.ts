import { NextResponse } from "next/server";

import tickets from "@/app/database";

// get all tickets // path: app/api/tickets/index.ts
export async function GET() {
    return NextResponse.json(tickets);
}

export async function POST(request: Request) {
    const ticket = await request.json();

   tickets.push({id: ticket.legth + 1, ...ticket});

    return NextResponse.json(ticket);
}


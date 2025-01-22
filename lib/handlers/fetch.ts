import { ActionResponse } from "@/types/global";

import { RequestError } from "../http-errors";
import handleError from "./error";
import logger from "./loggers";

// FetchOptions interfész kiterjeszti a beépített RequestInit-et
// timeOut: Opcionális időtúllépés milliszekundumban
interface FetchOptions extends RequestInit {
    timeOut?: number;
}

// Típus őr függvény a hibaobjektum ellenőrzéséhez
// Megvizsgálja, hogy a kapott error objektum Error példány-e
function isError(error: unknown): error is Error {
    return error instanceof Error;
};

// Generic fetch handler függvény típusos válaszokhoz
// T: A válasz típusa amit várunk az API-tól
// url: Az API végpont címe
// options: Fetch beállítások időtúllépéssel
export async function fetchHandler<T>(url: string, options: FetchOptions = {}): Promise<ActionResponse<T>> {
    // Opciók destruktúrálása alapértelmezett értékekkel
    const {
        timeOut = 5000,                  // Alapértelmezett 5mp időtúllépés
        headers: customHeaders = {},      // Egyedi fejlécek
        ...restOptions                   // További fetch opciók
    } = options;

    // AbortController a kérés megszakításához időtúllépés esetén
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeOut);

    // Alapértelmezett fejlécek beállítása JSON kommunikációhoz
    const defaultHeaders: HeadersInit = {
        'content-type': 'application/json',
        accept: 'application/json',
    };

    // Fejlécek összefűzése: alapértelmezett + egyedi
    const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };

    // Végső fetch konfiguráció összeállítása
    const config: RequestInit = {
        ...restOptions,                  // További opciók átadása
        headers,                         // Összesített fejlécek
        signal: controller.signal        // Megszakítás vezérlő
    };

    try {
        const response = await fetch(url, config);

        clearTimeout(id);

        if (!response.ok) {
            throw new RequestError(response.status, `HTTP error: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        const error = isError(err) ? err : new Error('Unknown error');

        if (error.name === 'AbortError') {
            logger.warn(`Request to ${url} timed out `);
        } else {
            logger.error(`Error fetching ${url}: ${error.message}`);
        }
        return handleError(error, 'api') as ActionResponse<T>;
    }
}
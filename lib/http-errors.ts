export class RequestError extends Error {
    statusCode: number;
    errors?: Record<string, string[]>;

    constructor(
        statusCode: number,
        message: string,
        errors?: Record<string, string[]>) {
        super(message);

        this.statusCode = statusCode;
        this.errors = errors;
        this.name = 'RequestError';
    }
}


/**
 * ValidationError osztály
 * A RequestError osztályból származik, validációs hibák kezelésére szolgál
 * HTTP 400 Bad Request hibakódot használ
 */
export class ValidationError extends RequestError {
    /**
     * @param fieldErrors - Objektum, ami tartalmazza a mezőkhöz tartozó hibaüzeneteket
     * Kulcs: mező neve, Érték: hibaüzenetek tömbje
     */
    constructor(fieldErrors: Record<string, string[]>) {
        const message = ValidationError.formatFieldErrors(fieldErrors);
        super(400, message, fieldErrors);
        this.name = 'ValidationError';
        this.errors = fieldErrors;
    }

    /**
     * Hibaüzenetek formázása olvasható formátumra
     * @param errors - Hibaobjektum (mező név -> hibaüzenetek tömb)
     * @returns Formázott hibaüzenet string
     * 
     * Példa:
     * Input: { name: ['required'], email: ['invalid', 'required'] }
     * Output: "Name is required, Email invalid and required"
     */
    static formatFieldErrors(errors: Record<string, string[]>): string {
        const formatedMessage = Object.entries(errors).map(([field, messages]) => {
           // Mező nevének nagybetűsítése
           const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

           // Speciális kezelés 'required' esetén
           if (messages[0] === 'required') {
            return `${fieldName} is required`;
           } else {
            // Többi hibaüzenet összefűzése 'and'-del
            return messages.join(' and');
           }
        });   
        return formatedMessage.join(', ');
    }
}

export class NotFoundError extends RequestError {
    constructor(message: string) {
        super(404, message);
        this.name = 'NotFoundError';
    }
}

export class ForbiddenError extends RequestError {
    constructor(message: string = 'Forbidden') {
        super(403, message);
        this.name = 'ForbiddenError';
    }
}

export class UnauthorizedError extends RequestError {
    constructor(message: string = 'Unauthorized') {
        super(401, message);
        this.name = 'UnauthorizedError';
    }
}


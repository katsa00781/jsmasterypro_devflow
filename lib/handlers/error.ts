import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-errors";
import { ZodError } from "zod";

export type ResponseType = 'api' | 'server';

/**
 * Egységes hibaválasz formázó függvény
 * API és oldal renderelési hibák kezelésére szolgál
 * 
 * @param responseType - Válasz típusa ('api' vagy 'page')
 * @param status - HTTP státuszkód (pl. 400, 404, 500)
 * @param message - Hibaüzenet szövege
 * @param errors - Opcionális részletes hibainformációk mezőnként
 * 
 * @returns API esetén NextResponse objektum, oldal esetén hibaobjektum
 * 
 * Példa használat:
 * API: formatResponse('api', 400, 'Validation failed', {email: ['required']})
 * Page: formatResponse('page', 404, 'Page not found')
 */
const formatResponse = (
    responseType: ResponseType,
    status: number,
    message: string,
    errors? : Record<string, string[]>
) => {
    const responseContent = {
        success: false,
        error: {
            message,
            details: errors
        },
    };
    return responseType === 'api' 
    ? NextResponse.json(responseContent, {status})
    : {status, ...responseContent}; 
    };


const handleError (error: unknown, responseType: "server") => {
    if (error instanceof RequestError) {
        return formatResponse(
            responseType,
             error.statusCode,
              error.message,
               error.errors);
    } 
    if (error instanceof ZodError) {
        const validationError = new ValidationError(error.flatten().fieldErrors as Record<string, string[]>);
        return formatResponse(responseType, validationError.statusCode, validationError.message, validationError.errors);
    };
    if (error instanceof Error) {
        return formatResponse(responseType, 500, error.message);
    };
    return formatResponse(responseType, 500, 'Internal Server Error');
}
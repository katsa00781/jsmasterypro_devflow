import { NextResponse } from "next/server";

interface Tag {
    _id: string;
    name: string;
}

interface Author {
    _id: string;
    name: string;
    image: string;
}

interface Question {
    _id: string;
    title: string;
    content: string;
    tags: Tag[];
    author: Author;
    createdAt: string;
    upVotes: number;
    answers: number;
    views: number;
    createdAt: Date;
}

type ActionResponse <T = null> = {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        details?: Record<string, string[]>;
    };
    status?: number;
}

type SuccessResponse <T = null> = ActionResponse<T> & {success: true};
type ErrorResponse = ActionResponse<undefined> & {success: false};

type ApiErrorResponse = NextResponse<ErrorResponse>;

type ApiResponse<T = null> = NextResponse<SuccessResponse<T>> | ErrorResponse;
import { NextResponse } from "next/server";

import User from "@/lib/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { ApiErrorResponse } from "@/types/global";



export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) throw new NotFoundError("Account");

  try {
    const account = await User.findById(id);
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

// DELETE /api/users/[id]

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) throw new NotFoundError("Account");

  try {
    const account = await User.findByIdAndDelete(id);
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

// PUT /api/users/[id]

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");

  try {
    await dbConnect();

    const body = await request.json();
    const validatedData = AccountSchema.partial().safeParse(body);

    if(!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const updatedAccount = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedAccount) throw new NotFoundError("User");

    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

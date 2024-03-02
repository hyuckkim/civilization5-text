import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export function PUT(request: NextRequest) {
    revalidatePath("/maps");
    return NextResponse.json("revalidated");   
}
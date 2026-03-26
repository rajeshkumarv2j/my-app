import { NextResponse } from "next/server";
//http://localhost:3000/api/hello
export function GET() {
    return NextResponse.json({ message: "Hello from the API route!" });
}
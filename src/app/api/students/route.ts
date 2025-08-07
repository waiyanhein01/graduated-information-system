import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: NextResponse.error, message: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const student = await prisma.student.create({
      data: {
        ...data,
        graduationDate: data.graduationDate
          ? new Date(data.graduationDate)
          : null,
        graduationYear: data.graduationDate
          ? new Date(data.graduationDate).getFullYear()
          : null,
        gpa: data.gpa ? Number.parseFloat(data.gpa) : null,
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: NextResponse.error, message: "Failed to create student" },
      { status: 500 }
    );
  }
}

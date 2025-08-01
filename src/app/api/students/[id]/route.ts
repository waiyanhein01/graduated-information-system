import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: params.id },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const student = await prisma.student.create({
      data: {
        ...data,
        enrollmentDate: new Date(data.enrollmentDate),
        graduationDate: data.graduationDate
          ? new Date(data.graduationDate)
          : null,
        graduationYear: data.graduationDate
          ? new Date(data.graduationDate).getFullYear()
          : null,
        gpa: data.gpa ? Number.parseFloat(data.gpa) : null,
      },
    });
    return NextResponse.json({
      status: 201,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    const student = await prisma.student.update({
      where: { id: params.id },
      data: {
        ...data,
        enrollmentDate: new Date(data.enrollmentDate),
        graduationDate: data.graduationDate
          ? new Date(data.graduationDate)
          : null,
        graduationYear: data.graduationDate
          ? new Date(data.graduationDate).getFullYear()
          : null,
        gpa: data.gpa ? Number.parseFloat(data.gpa) : null,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

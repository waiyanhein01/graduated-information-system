import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get graduation statistics by year
    const graduationStats = await prisma.student.groupBy({
      by: ["graduationYear"],
      where: {
        graduationYear: {
          not: null,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        graduationYear: "desc",
      },
    });

    // Get overall statistics
    const totalStudents = await prisma.student.count();
    const graduatedStudents = await prisma.student.count({
      where: { status: "GRADUATED" },
    });
    const enrolledStudents = await prisma.student.count({
      where: { status: "ENROLLED" },
    });

    // Get department statistics
    const departmentStats = await prisma.student.groupBy({
      by: ["department"],
      _count: {
        id: true,
      },
    });

    return NextResponse.json({
      graduationByYear: graduationStats,
      overview: {
        total: totalStudents,
        graduated: graduatedStudents,
        enrolled: enrolledStudents,
      },
      byDepartment: departmentStats,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}

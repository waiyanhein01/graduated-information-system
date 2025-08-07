"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { GraduationCap, Users, BookOpen } from "lucide-react";

interface StatisticsProps {
  data: {
    graduationByYear: Array<{ graduationYear: number; _count: { id: number } }>;
    graduationByYearAndGender: Array<{
      graduationYear: number;
      gender: string;
      _count: { id: number };
    }>;
    overview: {
      total: number;
    };
    byDepartment: Array<{ department: string; _count: { id: number } }>;
  };
}

export function StatisticsDashboard({ data }: StatisticsProps) {
  // Add defensive checks to ensure arrays are not undefined
  const graduationByYear = data.graduationByYear || [];
  const graduationByYearAndGender = data.graduationByYearAndGender || [];
  const byDepartment = data.byDepartment || [];

  const chartData = graduationByYear.map((item) => ({
    year: item.graduationYear,
    graduates: item._count.id,
  }));

  // Process gender data for chart
  const genderChartDataMap = new Map<
    number,
    {
      year: number;
      Male?: number;
      Female?: number;
      Other?: number;
      "Prefer not to say"?: number;
    }
  >();

  graduationByYearAndGender.forEach((item) => {
    if (!genderChartDataMap.has(item.graduationYear)) {
      genderChartDataMap.set(item.graduationYear, {
        year: item.graduationYear,
      });
    }
    const currentYearData = genderChartDataMap.get(item.graduationYear)!;
    currentYearData[item.gender as keyof typeof currentYearData] =
      item._count.id;
  });

  const genderChartData = Array.from(genderChartDataMap.values()).sort(
    (a, b) => a.year - b.year
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Total Students({data?.overview?.total})
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Graduates by Year</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="graduates" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* New Chart: Graduates by Year and Gender */}
        <Card>
          <CardHeader>
            <CardTitle>Graduates by Year and Gender</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genderChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Male" fill="#82ca9d" name="Male Graduates" />
                <Bar dataKey="Female" fill="#ffc658" name="Female Graduates" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Students by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {byDepartment.map(
                (
                  dept // Use the defensively checked byDepartment
                ) => (
                  <div
                    key={dept.department}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">
                      {dept.department}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (dept._count.id / data.overview.total) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {dept._count.id}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

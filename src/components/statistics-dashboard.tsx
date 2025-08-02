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
import { GraduationCap, Users, BookOpen, TrendingUp } from "lucide-react";

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
      graduated: number;
      enrolled: number;
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.overview?.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.graduated}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Currently Enrolled
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.enrolled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Graduation Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.total > 0
                ? Math.round(
                    (data.overview.graduated / data.overview.total) * 100
                  )
                : 0}
              %
            </div>
          </CardContent>
        </Card>
      </div>

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
                <Bar dataKey="Other" fill="#ff7300" name="Other Graduates" />
                <Bar
                  dataKey="Prefer not to say"
                  fill="#0088FE"
                  name="Prefer not to say"
                />
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

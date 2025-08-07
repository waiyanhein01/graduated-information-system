"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Mars, Printer, Search, Users, Venus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  program: string;
  gender?: string;
  department: string;
  graduationDate?: string;
  gpa?: number;
  graduationYear?: number;
}

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
}

export function StudentList({ students, onEdit }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("ALL");

  const uniqueGraduationYears = useMemo(() => {
    const years = new Set<number>();
    students.forEach((student) => {
      if (student.graduationYear) {
        years.add(student.graduationYear);
      }
    });
    return Array.from(years).sort((a, b) => b - a); // Sort descending
  }, [students]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.graduationYear &&
        student.graduationYear.toString().includes(searchTerm));

    const matchesYear =
      yearFilter === "ALL" || student.graduationYear?.toString() === yearFilter;

    return matchesSearch && matchesYear;
  });

  const handlePrint = () => {
    // This will print the entire window, but browsers are smart enough
    // to focus on the main content. For more control, you'd use a dedicated
    // print library or more complex CSS media queries.
    window.print();
  };

  return (
    <Card className="printable-table-card w-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 mb-4 ">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-auto h-auto">
              <CardTitle className="text-sm font-medium">Male</CardTitle>
              <Mars className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  filteredStudents.filter(
                    (student) => student.gender === "Male"
                  ).length
                }
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-auto h-auto">
              <CardTitle className="text-sm font-medium">Female</CardTitle>
              <Venus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  filteredStudents.filter(
                    (student) => student.gender === "Female"
                  ).length
                }
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-auto h-auto">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredStudents.length}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex gap-4 print:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name, ID, department, or graduation year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Years</SelectItem>
              {uniqueGraduationYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2 border border-slate-500 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="items-center justify-between hidden print:flex mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Graduated Students Information
            </h1>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Graduation Year</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Graduation Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.studentId}
                  </TableCell>
                  <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.graduationYear || "N/A"}</TableCell>
                  <TableCell>
                    {student.gpa ? student.gpa.toFixed(2) : "N/A"}
                  </TableCell>
                  <TableCell>
                    {student.graduationDate
                      ? new Date(student.graduationDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

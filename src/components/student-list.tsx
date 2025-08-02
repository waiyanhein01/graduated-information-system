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
import { Edit, Search } from "lucide-react";
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
  enrollmentDate: string;
  graduationDate?: string;
  status: string;
  gpa?: number;
  thesis?: string;
  advisor?: string;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Students ({filteredStudents.length})</CardTitle>
        <div className="flex gap-4">
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
        </div>
      </CardHeader>
      <CardContent>
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

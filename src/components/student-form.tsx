"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  program: string;
  department: string;
  enrollmentDate: string;
  graduationDate?: string;
  status: string;
  gpa?: number;
  thesis?: string;
  advisor?: string;
}

interface StudentFormProps {
  student?: Student;
  onSubmit: (student: Student) => void;
  onCancel: () => void;
}

export function StudentForm({ student, onSubmit, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState<Student>({
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    email: student?.email || "",
    studentId: student?.studentId || "",
    program: student?.program || "",
    department: student?.department || "",
    enrollmentDate: student?.enrollmentDate?.split("T")[0] || "",
    graduationDate: student?.graduationDate?.split("T")[0] || "",
    status: student?.status || "ENROLLED",
    gpa: student?.gpa || undefined,
    thesis: student?.thesis || "",
    advisor: student?.advisor || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    onSubmit(formData);
    setIsLoading(false);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border border-neutral-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {student ? "Edit Student" : "Add New Student"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                placeholder="e.g., John"
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="e.g., Doe"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g., gjC5o@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              *email must be unique.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                placeholder="e.g., YDNB-1234"
                onChange={(e) => handleChange("studentId", e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground p-0 m-0">
                *student id must be unique.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleChange("department", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">Program</Label>
            <Input
              id="program"
              value={formData.program}
              onChange={(e) => handleChange("program", e.target.value)}
              placeholder="e.g., PhD Computer Science, MS Data Science"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <Input
                id="enrollmentDate"
                type="date"
                value={formData.enrollmentDate}
                onChange={(e) => handleChange("enrollmentDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ENROLLED">Enrolled Graduate</SelectItem>
                  <SelectItem value="GRADUATED">Graduated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="graduationDate">Graduation Date</Label>
              <Input
                id="graduationDate"
                type="date"
                value={formData.graduationDate}
                onChange={(e) => handleChange("graduationDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                type="number"
                step="0.01"
                min="0"
                max="4"
                placeholder="e.g., 3.5"
                value={formData.gpa || ""}
                onChange={(e) =>
                  handleChange("gpa", Number.parseFloat(e.target.value))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="advisor">Advisor</Label>
            <Input
              id="advisor"
              value={formData.advisor}
              onChange={(e) => handleChange("advisor", e.target.value)}
              placeholder="e.g., Dr. Smith"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thesis">Thesis Title</Label>
            <Textarea
              id="thesis"
              value={formData.thesis}
              onChange={(e) => handleChange("thesis", e.target.value)}
              placeholder="Enter thesis title (if applicable)"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {isLoading && <span>Loading...</span>}
              {student ? "Update Student" : "Add Student"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 bg-transparent border border-neutral-500"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

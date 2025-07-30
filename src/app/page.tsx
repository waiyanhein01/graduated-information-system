"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentForm } from "@/components/student-form";
import { StudentList } from "@/components/student-list";
import { StatisticsDashboard } from "@/components/statistics-dashboard";
import { Plus, BarChart3, Users } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
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

export default function GraduateSystem() {
  const [students, setStudents] = useState<Student[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState("students");

  useEffect(() => {
    fetchStudents();
    fetchStatistics();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch("/api/statistics");
      const data = await response.json();
      setStatistics(data);
    } catch (error) {
      toast.error("Failed to fetch statistics");
    }
  };

  const handleSubmit = async (studentData: any) => {
    try {
      const url = editingStudent
        ? `/api/students/${editingStudent.id}`
        : "/api/students";
      const method = editingStudent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        toast.success(
          `Student ${editingStudent ? "updated" : "created"} successfully`
        );
        setShowForm(false);
        setEditingStudent(null);
        fetchStudents();
        fetchStatistics();
      }
    } catch (error) {
      toast.error(`Failed to ${editingStudent ? "update" : "create"} student`);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`/api/students/${id}`, { method: "DELETE" });

      if (response.ok) {
        toast.success("Student deleted successfully");
        fetchStudents();
        fetchStatistics();
      }
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  if (showForm) {
    return (
      <div className="container mx-auto p-6">
        <StudentForm
          student={editingStudent || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Graduate Student Information System
          </h1>
          <p className="text-muted-foreground">
            Manage graduate students and track graduation statistics
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-6">
          <StudentList
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          {statistics && <StatisticsDashboard data={statistics} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

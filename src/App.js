import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const API = "http://localhost:5000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load students from JSON server on mount
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(API);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Add new student (POST)
  const addStudent = async (student) => {
    try {
      // Don't provide id; json-server will create one
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      const newStudent = await res.json();
      setStudents((prev) => [...prev, newStudent]);
    } catch (err) {
      console.error("Add failed:", err);
      // Fallback: update local state (offline)
      setStudents((prev) => [...prev, { ...student, id: Date.now() }]);
    }
  };

  // Delete student (DELETE)
  const deleteStudent = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setStudents((prev) => prev.filter((s) => s.id !== id));
      // if currently editing this student, cancel edit
      if (editingStudent && editingStudent.id === id) setEditingStudent(null);
    } catch (err) {
      console.error("Delete failed:", err);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Prepare to edit: populate form
  const editStudent = (student) => {
    setEditingStudent(student);
    // scroll to top (optional)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update student (PUT)
  const updateStudent = async (updatedStudent) => {
    if (!updatedStudent?.id) {
      console.error("updateStudent requires an id");
      return;
    }

    try {
      const res = await fetch(`${API}/${updatedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });
      const saved = await res.json();

      setStudents((prev) =>
        prev.map((s) => (s.id === saved.id ? saved : s))
      );
      setEditingStudent(null);
    } catch (err) {
      console.error("Update failed:", err);
      // Fallback: update local state
      setStudents((prev) =>
        prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      );
      setEditingStudent(null);
    }
  };

  return (
    <div className="app-container">
      <h1>🎓 Student Management System</h1>

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editingStudent={editingStudent}
      />

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <StudentList
          students={students}
          deleteStudent={deleteStudent}
          editStudent={editStudent}
        />
      )}
    </div>
  );
}

export default App;

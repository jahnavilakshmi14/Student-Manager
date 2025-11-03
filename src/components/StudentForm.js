import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editingStudent }) {
  // include id in state so updates keep the id
  const [student, setStudent] = useState({ id: null, name: "", email: "", course: "" });

  useEffect(() => {
    if (editingStudent) {
      // make sure we copy the object
      setStudent({
        id: editingStudent.id ?? null,
        name: editingStudent.name ?? "",
        email: editingStudent.email ?? "",
        course: editingStudent.course ?? "",
      });
    } else {
      setStudent({ id: null, name: "", email: "", course: "" });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name.trim() || !student.email.trim() || !student.course.trim()) {
      alert("Please fill all fields.");
      return;
    }

    // If id exists -> update, else add
    if (student.id) {
      updateStudent(student);
    } else {
      // For add, don't send id (server will create)
      const { id, ...payload } = student;
      addStudent(payload);
    }

    // reset form (after a short delay to allow parent to clear editingStudent)
    setTimeout(() => {
      setStudent({ id: null, name: "", email: "", course: "" });
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
      />
      <input
        name="course"
        type="text"
        placeholder="Course"
        value={student.course}
        onChange={handleChange}
      />
      <button type="submit">{student.id ? "Update Student" : "Add Student"}</button>
    </form>
  );
}

export default StudentForm;

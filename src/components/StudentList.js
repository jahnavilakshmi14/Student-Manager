import React from "react";
import { Edit, Trash2 } from "lucide-react"; // import icons

function StudentList({ students, deleteStudent, editStudent }) {
  if (!students.length) return <p>No students yet.</p>;

  return (
    <div className="student-list">
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Email</th>
            <th style={{ textAlign: "left" }}>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>
                {/* Edit Button */}
                <button
                  onClick={() => editStudent(s)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  title="Edit"
                >
                  <Edit color="blue" size={20} />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    if (window.confirm("Delete this student?"))
                      deleteStudent(s.id);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title="Delete"
                >
                  <Trash2 color="blue" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rno, setRno] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:8081/Student");
    setStudents(response.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      await axios.put(`http://localhost:8081/students/${id}`, { name, rno });
    } else {
      await axios.post("http://localhost:8081/Student", { name, rno });
    }
    setName("");
    setRno("");
    setId(null);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setName(student.name);
    setRno(student.rno);
    setId(student.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8081/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-4xl font-bold text-center mb-8">Student Management</h1>
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Roll Number"
        value={rno}
        onChange={(e) => setRno(e.target.value)}
        required
        className="input input-bordered w-full max-w-xs"
      />
      <button
        type="submit"
        className="btn btn-primary"
      >
        {id ? 'Update' : 'Add'}
      </button>
    </form>
    <ul className="list-none p-0">
      {students.map((student) => (
        <li
          key={student.id}
          className="border rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          <span>{student.name} ({student.rno})</span>
          <div className="space-x-2">
            <button
              onClick={() => handleEdit(student)}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(student.id)}
              className="btn btn-error"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default App;
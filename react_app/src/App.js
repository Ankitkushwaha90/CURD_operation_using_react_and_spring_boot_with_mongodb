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
    <div className="App">
      <h1>Student Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rno}
          onChange={(e) => setRno(e.target.value)}
          required
        />
        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} ({student.rno})
            <button onClick={() => handleEdit(student)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
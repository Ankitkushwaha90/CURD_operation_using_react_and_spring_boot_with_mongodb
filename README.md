# Backend framework using from Spring boot 
- from this link
- [click me](https://start.spring.io/)
### using dependency 
- Spring Web
- Spring Data MongoDB
- Lombok
### GRDLE spring-boot-3.1.5 java
- jar
- java --version 17
### Create model in /com.MongoSpring.MongoSpring/
- Controller/MainController.java
```java
package com.mongodb.Firstapp.Controller;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.Firstapp.Model.Student;
import com.mongodb.Firstapp.StudentRepo.StudentRepo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@RestController

public class MainController {
    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Autowired
    StudentRepo studentRepo;

    // add Student
    @PostMapping("/Student")
    public Student addStudent(@RequestBody Student student) {
        return studentRepo.save(student);
    }

    // get allstudent
    @GetMapping("/Student")
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    // get student by id
    @GetMapping("/Student/{id}")
    public Student StudentById(@PathVariable String id) {
        Optional<Student> student = studentRepo.findById(id);
        if(student.isPresent()){
            return student.get();
        }else{
            throw new RuntimeException("Student not found by id" + id);
        }
    }

    @GetMapping("/students/name/{name}")
    public List<Student> getStudentsByName(@PathVariable String name) {
        return studentRepo.findByname(name);
    }

    // Update a student by ID
    @PutMapping("/students/{id}")
    public Student updateStudent(@PathVariable String id, @RequestBody Student studentDetails) {
        Student student = studentRepo.findById(id).orElseThrow(() -> new RuntimeException("Student not found with id " + id));

        student.setName(studentDetails.getName());
        student.setId(studentDetails.getId());
        student.setRno(studentDetails.getRno());
        studentRepo.deleteById(id);
        return studentRepo.save(student);
    }

    // Delete a student by ID
    @DeleteMapping("/students/{id}")
    public String deleteStudent(@PathVariable String id) {
        studentRepo.deleteById(id);
        return "Student deleted with id " + id;
    }
  
}

```
- Model/student.java
```java
package com.mongodb.Firstapp.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor

public class Student {
    @Id
    private String id;
    private String name;
    private Integer rno;

}
```
- Repository/StudentRepo.java
```java
package com.mongodb.Firstapp.StudentRepo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mongodb.Firstapp.Model.Student;

public interface StudentRepo extends MongoRepository<Student, String>{
    List<Student> findByname(String name);   
}
```
/main/resources/application.properties
```java
spring.application.name=MongoSpring
server.port:8081
spring.data.mongodb.uri=mongdb_url_from_your_account

```
# Fronend framework using react
```jsx
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
    <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg">
  <h1 className="text-4xl font-bold text-center mb-8">Student Management</h1>
  <form onSubmit={handleSubmit} className="mb-8 flex flex-col items-center space-y-4">
    <div className="w-full max-w-xs flex flex-col">
      <label htmlFor="name" className="mb-1 text-gray-700 dark:text-gray-300">Name</label>
      <input
        id="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 hover:border-blue-300"
      />
    </div>
    <div className="w-full max-w-xs flex flex-col">
      <label htmlFor="rno" className="mb-1 text-gray-700 dark:text-gray-300">Roll Number</label>
      <input
        id="rno"
        type="text"
        placeholder="Roll Number"
        value={rno}
        onChange={(e) => setRno(e.target.value)}
        required
        className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 hover:border-blue-300"
      />
    </div>
    <button
      type="submit"
      className="btn btn-primary bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {id ? 'Update' : 'Add'}
    </button>
  </form>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
          <th className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
        {students.map((student) => (
          <tr key={student.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.rno}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => handleEdit(student)}
                className="btn btn-secondary bg-gray-600 border border-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="btn btn-error bg-red-600 border border-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default App;
```

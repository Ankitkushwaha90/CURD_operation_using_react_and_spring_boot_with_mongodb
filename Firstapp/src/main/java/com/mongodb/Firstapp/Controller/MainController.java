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

        return studentRepo.save(student);
    }

    // Delete a student by ID
    @DeleteMapping("/students/{id}")
    public String deleteStudent(@PathVariable String id) {
        studentRepo.deleteById(id);
        return "Student deleted with id " + id;
    }

    // Find students by name
    // @GetMapping("/students/name/{name}")
    // public Optional<Student> getStudentsByName(@PathVariable String name) {
    //     return studentRepo.findByName(name);
    // }
    
    
    


    
    
}

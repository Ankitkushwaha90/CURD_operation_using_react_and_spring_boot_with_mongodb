package com.mongodb.Firstapp.StudentRepo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mongodb.Firstapp.Model.Student;

public interface StudentRepo extends MongoRepository<Student, String>{
    List<Student> findByname(String name);   
}

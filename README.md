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
package com.MongoSpring.MongoSpring.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.MongoSpring.MongoSpring.Model.Student;
import com.MongoSpring.MongoSpring.Repository.StudentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class MainController {

    @Autowired
    StudentRepo studentRepo;

    @PostMapping("/addStudent")
    public void addStudent(@RequestBody Student student) {
        studentRepo.save(student);
    }
    
}

```
- Model/student.java
```java
package com.MongoSpring.MongoSpring.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    private Integer rno;
     

    private String name;

    private String address;
}
```
- Repository/StudentRepo.java
```java
package com.MongoSpring.MongoSpring.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.MongoSpring.MongoSpring.Model.Student;

public interface StudentRepo extends MongoRepository<Student, Integer>{
   
}
```
/main/resources/application.properties
```java
spring.application.name=MongoSpring
server.port:8081
spring.data.mongodb.uri=mongdb_url_from_your_account

```

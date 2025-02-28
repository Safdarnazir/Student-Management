package com.dailycodework.sbrdemo.controller;

import com.dailycodework.sbrdemo.model.Student;
import com.dailycodework.sbrdemo.service.IStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final IStudentService studentService;

    /**
     * Get all students (Only accessible by authenticated users)
     */
    @GetMapping("/view")
    public ResponseEntity<List<Student>> getStudents() {
        String username = getLoggedInUsername();
        System.out.println("Current logged-in user: " + username);

        List<Student> students = studentService.getStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    /**
     * Add a new student (Only accessible by authenticated users)
     */
    @PostMapping
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        String email = getLoggedInUsername(); // Get logged-in user's email
        studentService.addStudent(student, email);
        return new ResponseEntity<>("Student added successfully!", HttpStatus.CREATED);
    }

    /**
     * Update a student by ID
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student, @PathVariable Long id) {
        Student updatedStudent = studentService.updateStudent(student, id);
        return ResponseEntity.ok(updatedStudent);
    }

    /**
     * Delete a student by ID
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully!");
    }

    /**
     * Get student by ID
     */
    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    /**
     * Get the currently logged-in user's username/email
     */
    private String getLoggedInUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Returns the logged-in username (email in this case)
    }
}

package com.dailycodework.sbrdemo.service;

import com.dailycodework.sbrdemo.model.Student;

import java.util.List;



public interface IStudentService {
    List<Student> getStudents();
    Student addStudent(Student student, String email);

    Student updateStudent(Student student, Long id);
    Student getStudentById(Long id);
    void deleteStudent(Long id);
}

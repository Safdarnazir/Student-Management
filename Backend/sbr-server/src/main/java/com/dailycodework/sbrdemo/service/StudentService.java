package com.dailycodework.sbrdemo.service;

import com.dailycodework.sbrdemo.exception.StudentAlreadyExistsException;
import com.dailycodework.sbrdemo.exception.StudentNotFoundException;
import com.dailycodework.sbrdemo.model.Student;
import com.dailycodework.sbrdemo.model.User;
import com.dailycodework.sbrdemo.repository.StudentRepository;
import com.dailycodework.sbrdemo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService implements IStudentService{
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;


    @Override
    public List<Student> getStudents() {
        System.out.println("Before");
//        try{
//            Optional<User> optionalUser = userRepository.findByEmail(email);
//            if (optionalUser.isEmpty()){
//                throw new StudentNotFoundException("User with email " + email + " not found");
//            }
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//        System.out.println("After");

        return studentRepository.findAll();
    }
//    @Override
//    public Student addStudent(Student student) {
//        if (studentAlreadyExists(student.getEmail())){
//            throw  new StudentAlreadyExistsException(student.getEmail()+ " already exists!");
//        }
//        return studentRepository.save(student);
//    }
@Override
public Student addStudent(Student student, String email) {
    // Check for duplicate student email if needed

    if (studentAlreadyExists(student.getEmail())){
        throw new StudentAlreadyExistsException(student.getEmail() + " already exists!");
    }
    Optional<User> optionalUser = userRepository.findByEmail(email);
    if (optionalUser.isEmpty()){
        throw new RuntimeException("User with email " + email + " not found");
    }

    User user = optionalUser.get();
    student.setUser(user);

    return studentRepository.save(student);
}


    @Override
    public Student updateStudent(Student student, Long id) {
        return studentRepository.findById(id).map(st -> {
            st.setFirstName(student.getFirstName());
            st.setLastName(student.getLastName());
            st.setEmail(student.getEmail());
            st.setDepartment(student.getDepartment());
            return studentRepository.save(st);
        }).orElseThrow(() -> new StudentNotFoundException("Sorry, this student could not be found"));
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Sorry, no student found with the Id :" +id));
    }

    @Override
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)){
            throw new StudentNotFoundException("Sorry, student not found");
        }
        studentRepository.deleteById(id);
    }
    private boolean studentAlreadyExists(String email) {
        return studentRepository.findByEmail(email).isPresent();
    }
}

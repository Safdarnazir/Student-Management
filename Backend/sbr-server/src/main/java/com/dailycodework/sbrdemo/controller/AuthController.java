package com.dailycodework.sbrdemo.controller;

import com.dailycodework.sbrdemo.model.User;
import com.dailycodework.sbrdemo.service.UserService;
import com.dailycodework.sbrdemo.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public String signup(@RequestBody Map<String, String> request) {
        userService.registerUser(request.get("email"), request.get("password"));
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> request) {
        Optional<User> user = userService.loginUser(request.get("email"), request.get("password"));
        return user.map(value -> jwtUtil.generateToken(value.getEmail()))
                .orElse("Invalid credentials!");
    }
}
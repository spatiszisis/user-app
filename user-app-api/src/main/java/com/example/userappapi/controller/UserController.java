package com.example.userappapi.controller;

import com.example.userappapi.model.UpdateUserResource;
import com.example.userappapi.model.User;
import com.example.userappapi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers(@RequestParam(value = "searchTerm", required = false) String searchTerm) {
        return ResponseEntity.ok(userService.getAllUsers(searchTerm));
    }

    @GetMapping()
    public ResponseEntity<User> getUser(
            @RequestParam(value = "name", required = true) String name,
            @RequestParam(value = "surname", required = true) String surname
    ) {
        return ResponseEntity.ok(userService.getUser(name, surname));
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PutMapping()
    public ResponseEntity<User> updateUser(@RequestBody UpdateUserResource user) {
        return ResponseEntity.ok(userService.updateUser(user.getUpdatedUser(), user.getCurrentUser()));
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteUser(
            @RequestParam(value = "name", required = true) String name,
            @RequestParam(value = "surname", required = true) String surname) {
        userService.deleteUser(name, surname);
        return ResponseEntity.noContent().build();
    }
}

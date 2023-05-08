package com.example.userappapi.controller;

import com.example.userappapi.dto.UserDto;
import com.example.userappapi.model.User;
import com.example.userappapi.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
    public ResponseEntity<Page<UserDto>> getUsers(
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "pageNumber", required = true) Integer pageNumber) {
        return ResponseEntity.ok(userService.getAllUsers(sort, pageNumber));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(
            @RequestParam(value = "searchTerm", required = false) String searchTerm
    ) {
        return ResponseEntity.ok(userService.searchUser(searchTerm));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(
            @PathVariable(value = "id") Long id
    ) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody @Validated User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable(value = "id") Long id,
            @RequestBody UserDto updatedUser
    ) {
        return ResponseEntity.ok(userService.updateUser(updatedUser, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable(value = "id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

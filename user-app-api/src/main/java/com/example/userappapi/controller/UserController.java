package com.example.userappapi.controller;

import com.example.userappapi.dto.UserDto;
import com.example.userappapi.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<Page<UserDto>> getUsers(
            @RequestParam(value = "pageNumber", required = true) Integer pageNumber,
            @RequestParam(value = "pageSize", required = true) Integer pageSize,
            @RequestParam(value = "sortProperty", required = false) String sortProperty,
            @RequestParam(value = "sortDirection", required = false) String sortDirection) {
        return ResponseEntity.ok(userService.getAllUsers(pageNumber, pageSize, sortProperty, sortDirection));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(
            @RequestParam(value = "searchTerm", required = true) String searchTerm
    ) {
        return ResponseEntity.ok(userService.searchUser(searchTerm));
    }

    @GetMapping("/{id}")
    public ResponseEntity getUser(
            @PathVariable(value = "id") Long id
    ) {
        try {
            return ResponseEntity.ok(userService.getUser(id));
        } catch (Exception error) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error.getMessage());
        }
    }

    @PostMapping()
    public ResponseEntity createUser(@RequestBody UserDto userDto) {
        try {
            return ResponseEntity.ok(userService.createUser(userDto));
        } catch (Exception error) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateUser(
            @PathVariable(value = "id") Long id,
            @RequestBody UserDto updatedUserDto
    ) {
        try {
            return ResponseEntity.ok(userService.updateUser(updatedUserDto, id));
        } catch (Exception error) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(
            @PathVariable(value = "id") Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception error) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error.getMessage());
        }
    }
}

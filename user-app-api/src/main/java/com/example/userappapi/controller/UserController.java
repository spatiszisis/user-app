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
            @RequestParam(value = "sortProperty", required = false) String sortProperty) {
        return ResponseEntity.ok(userService.getAllUsers(pageNumber, pageSize, sortProperty));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(
            @RequestParam(value = "searchTerm", required = true) String searchTerm
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
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.createUser(userDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable(value = "id") Long id,
            @RequestBody UserDto updatedUserDto
    ) {
        return ResponseEntity.ok(userService.updateUser(updatedUserDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable(value = "id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}

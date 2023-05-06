package com.example.userappapi.service;

import com.example.userappapi.exception.ResourceNotFoundException;
import com.example.userappapi.model.User;
import com.example.userappapi.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(String filterText) {
        if (filterText == null || filterText.isEmpty()) {
            return userRepository.findAll();
        } else {
            return userRepository.search(filterText);
        }
    }

    public User getUser(String name, String surname) {
        return this.userRepository.findByNameAndSurname(name, surname);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user, Long userId) {
        User existingUser = this.getUserById(userId);
        existingUser.setName(user.getName());
        existingUser.setSurname(user.getSurname());
        existingUser.setGender(user.getGender());
        existingUser.setBirthdate(user.getBirthdate());
        existingUser.setHomeAddress(user.getHomeAddress());
        existingUser.setWorkAddress(user.getWorkAddress());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long userId) {
        User existingUser = this.getUserById(userId);
        userRepository.delete(existingUser);
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }
}

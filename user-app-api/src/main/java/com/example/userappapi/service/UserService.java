package com.example.userappapi.service;

import com.example.userappapi.exception.ResourceNotFoundException;
import com.example.userappapi.model.User;
import com.example.userappapi.repository.UserRepository;
import org.springframework.data.domain.Sort;
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

    public List<User> getAllUsers(String filterText, String sort) {
        if (filterText == null) {
            if (sort != null) {
                if (sort.equals("DESC")) {
                    return userRepository.findAll(Sort.by(Sort.Direction.DESC, "name"));
                } else if (sort.equals("ASC")) {
                    return userRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
                } else {
                    return userRepository.findAll();
                }
            } else {
                return userRepository.findAll();
            }
        } else {
            return userRepository.search(filterText);
        }
    }

    public User getUser(String name, String surname) {
        return this.getUserByNameAndSurname(name, surname);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User updateUser, User currentUser) {
        User existingUser = this.getUserByNameAndSurname(currentUser.getName(), currentUser.getSurname());
        existingUser.setName(updateUser.getName());
        existingUser.setSurname(updateUser.getSurname());
        existingUser.setGender(updateUser.getGender());
        existingUser.setBirthdate(updateUser.getBirthdate());
        existingUser.setHomeAddress(updateUser.getHomeAddress());
        existingUser.setWorkAddress(updateUser.getWorkAddress());
        return userRepository.save(existingUser);
    }

    public void deleteUser(String name, String surname) {
        User existingUser = this.getUserByNameAndSurname(name, surname);
        userRepository.delete(existingUser);
    }

    private User getUserByNameAndSurname(String name, String surname) {
        return userRepository.findByNameAndSurname(name, surname);
    }
}

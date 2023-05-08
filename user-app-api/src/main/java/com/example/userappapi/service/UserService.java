package com.example.userappapi.service;

import com.example.userappapi.converter.UserConverter;
import com.example.userappapi.dto.UserDto;
import com.example.userappapi.exception.ResourceNotFoundException;
import com.example.userappapi.model.User;
import com.example.userappapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserConverter userConverter;

    public Page<UserDto> getAllUsers(String sort, Integer pageNumber) {
        Pageable pageable = null;
        if (sort != null) {
            pageable = PageRequest.of(pageNumber, 4, sort.equals("DESC") ? Sort.Direction.DESC : Sort.Direction.ASC, "name");
        } else {
            pageable = PageRequest.of(pageNumber, 4);
        }
        return userRepository.findAll(pageable).map(userConverter::convert);
    }

    public List<UserDto> searchUser(String filterText) {
        return userRepository.search(filterText).stream().map(userConverter::convert).collect(Collectors.toList());
    }

    public UserDto getUser(Long id) {
        return userRepository.findById(id)
                .map(userConverter::convert)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find a user with this id: " + id));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(UserDto updateUserDto, Long currentUserId) {
        User existingUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find a user with this id: " + currentUserId));
        existingUser.setName(updateUserDto.getName());
        existingUser.setSurname(updateUserDto.getSurname());
        existingUser.setGender(updateUserDto.getGender());
        existingUser.setBirthdate(updateUserDto.getBirthdate());
        existingUser.setHomeAddress(updateUserDto.getHomeAddress());
        existingUser.setWorkAddress(updateUserDto.getWorkAddress());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find a user with this id: " + id));
        userRepository.delete(existingUser);
    }
}

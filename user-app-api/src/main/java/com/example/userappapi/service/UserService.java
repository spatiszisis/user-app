package com.example.userappapi.service;

import com.example.userappapi.utils.UserConverter;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserConverter userConverter;

    public Page<UserDto> getAllUsers(Integer pageNumber, Integer pageSize, String sortProperty) {
        Pageable pageable = null;
        if (sortProperty != null) {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.Direction.ASC, sortProperty);
        } else {
            pageable = PageRequest.of(pageNumber, pageSize);
        }
        return userRepository.findAll(pageable).map(userConverter::convertToUserDto);
    }

    public List<UserDto> searchUser(String filterText) {
        return userRepository.search(filterText).stream().map(userConverter::convertToUserDto).collect(Collectors.toList());
    }

    public UserDto getUser(Long id) {
        try {
            return userRepository.findById(id)
                    .map(userConverter::convertToUserDto)
                    .orElseThrow(() -> new ResourceNotFoundException("Could not find a user with this id: " + id));
        } catch (Exception error) {
            throw new ResourceNotFoundException(error.getMessage());
        }
    }

    public UserDto createUser(UserDto userDtoBody) {
        try {
            User user = userConverter.converToUser(userDtoBody);
            return Optional.of(userRepository.save(user)).map(userConverter::convertToUserDto).orElseThrow(() -> new RuntimeException("Could not create the user."));
        } catch (Exception error) {
            throw new RuntimeException(error.getMessage());
        }
    }

    public UserDto updateUser(UserDto updateUserDto, Long currentUserId) {
        try {
            User existingUser = userRepository.findById(currentUserId)
                    .orElseThrow(() -> new ResourceNotFoundException("Could not find a user with this id: " + currentUserId));
            existingUser.setName(updateUserDto.getName());
            existingUser.setSurname(updateUserDto.getSurname());
            existingUser.setGender(updateUserDto.getGender());
            existingUser.setBirthdate(updateUserDto.getBirthdate());
            existingUser.setUserAddress(updateUserDto.getUserAddress());
            return Optional.of(userRepository.save(existingUser)).map(userConverter::convertToUserDto).orElseThrow(() -> new RuntimeException("Could not update the user."));
        } catch (Exception error) {
            throw new RuntimeException(error.getMessage());
        }
    }

    public void deleteUser(Long id) {
        try {
            User existingUser = userRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Could not find a user with this id: " + id));
            userRepository.delete(existingUser);
        } catch (Exception error) {
            throw new ResourceNotFoundException(error.getMessage());
        }
    }
}

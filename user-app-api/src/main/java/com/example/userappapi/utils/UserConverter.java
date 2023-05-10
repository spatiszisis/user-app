package com.example.userappapi.utils;

import com.example.userappapi.dto.UserDto;
import com.example.userappapi.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    public UserDto convertToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setSurname(user.getSurname());
        userDto.setGender(user.getGender());
        userDto.setBirthdate(user.getBirthdate());
        userDto.setUserAddress(user.getUserAddress());
        return userDto;
    }

    public User converToUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setGender(userDto.getGender());
        user.setBirthdate(userDto.getBirthdate());
        user.setUserAddress(userDto.getUserAddress());
        return user;
    }
}

package com.example.userappapi.converter;

import com.example.userappapi.dto.UserDto;
import com.example.userappapi.model.User;
import org.springframework.stereotype.Component;
import org.springframework.core.convert.converter.Converter;

@Component
public class UserConverter implements Converter<User, UserDto> {

    @Override
    public UserDto convert(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setSurname(user.getSurname());
        userDto.setGender(user.getGender());
        userDto.setBirthdate(user.getBirthdate());
        userDto.setHomeAddress(user.getHomeAddress());
        userDto.setWorkAddress(user.getWorkAddress());
        return userDto;
    }
}

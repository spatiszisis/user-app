package com.example.userappapi.dto;

import com.example.userappapi.model.Gender;
import com.example.userappapi.model.UserAddress;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public class UserDto {

    private Long id;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    private String name;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    private String surname;
    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }

    private Gender gender;
    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    private LocalDate birthdate;
    public LocalDate getBirthdate() { return birthdate; }
    public void setBirthdate(LocalDate birthdate) { this.birthdate = birthdate; }

    private UserAddress userAddress;
    public UserAddress getUserAddress() { return userAddress; }
    public void setUserAddress(UserAddress userAddress) { this.userAddress = userAddress; }

    public UserDto () {

    }

    public UserDto(
            @JsonProperty("name") String name,
            @JsonProperty("surname") String surname,
            @JsonProperty("gender") Gender gender,
            @JsonProperty("birthdate") LocalDate birthdate,
            @JsonProperty("userAddress") UserAddress userAddress) {
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.userAddress = userAddress;
    }
}

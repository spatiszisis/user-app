package com.example.userappapi.dto;

import com.example.userappapi.model.Gender;
import com.example.userappapi.model.UserAddress;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public class UserDto {

    @JsonProperty("id")
    private Long id;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @JsonProperty("name")
    private String name;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @JsonProperty("surname")
    private String surname;
    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }

    @JsonProperty("gender")
    private Gender gender;
    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    @JsonProperty("birthdate")
    private LocalDate birthdate;
    public LocalDate getBirthdate() { return birthdate; }
    public void setBirthdate(LocalDate birthdate) { this.birthdate = birthdate; }

    @JsonProperty("userAddress")
    private UserAddress userAddress;
    public UserAddress getUserAddress() { return userAddress; }
    public void setUserAddress(UserAddress userAddress) { this.userAddress = userAddress; }
}

package com.example.userappapi.resource;

import com.example.userappapi.model.Gender;
import com.example.userappapi.model.HomeAddress;
import com.example.userappapi.model.User;
import com.example.userappapi.model.WorkAddress;

import java.time.LocalDate;

public class UserResource {

    private Long id;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    private String name;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    private Gender gender;
    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    private LocalDate birthdate;
    public LocalDate getBirthdate() { return birthdate; }
    public void setBirthdate(LocalDate birthdate) { this.birthdate = birthdate; }

    private HomeAddress homeAddress;
    public HomeAddress getHomeAddress() { return homeAddress; }
    public void setHomeAddress(HomeAddress homeAddress) { this.homeAddress = homeAddress; }

    private WorkAddress workAddress;
    public WorkAddress getWorkAddress() { return workAddress; }
    public void setWorkAddress(WorkAddress workAddress) { this.workAddress = workAddress; }
}

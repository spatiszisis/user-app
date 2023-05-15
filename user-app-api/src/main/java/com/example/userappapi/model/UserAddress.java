package com.example.userappapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "useraddress")
public class UserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "useraddress_id")
    private Long id;
    @Column(
            name = "home_Address"
    )
    private String homeAddress;
    @Column(
            name = "work_Address"
    )
    private String workAddress;

    @OneToOne(mappedBy = "userAddress")
    @JsonIgnore
    private User user;

    public UserAddress() {
    }

    public UserAddress(String homeAddress, String workAddress) {
        this.homeAddress = homeAddress;
        this.workAddress = workAddress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }

    public String getWorkAddress() {
        return workAddress;
    }

    public void setWorkAddress(String workAddress) {
        this.workAddress = workAddress;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

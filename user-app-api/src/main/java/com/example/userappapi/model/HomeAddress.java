package com.example.userappapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "homeaddress")
public class HomeAddress {

    @Id
    @SequenceGenerator(
            name = "homeaddress_sequence",
            sequenceName = "homeaddress_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "homeaddress_sequence"
    )
    @Column(name = "homeaddress_id")
    private Long id;
    @Column(
            name = "name",
            nullable = false
    )
    private String name;
    @OneToOne(mappedBy = "homeAddress")
    @JsonIgnore
    private User user;

    public HomeAddress() {
    }

    public HomeAddress(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "HomeAddress{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user +
                '}';
    }
}

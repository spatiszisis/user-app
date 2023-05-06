package com.example.userappapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "workAddress")
public class WorkAddress {

    @Id
    @SequenceGenerator(
            name = "workAddress_sequence",
            sequenceName = "workAddress_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "workAddress_sequence"
    )
    @Column(name = "workAddress_id")
    private Long id;
    @Column(
            name = "name",
            nullable = false
    )
    private String name;
    @OneToOne(mappedBy = "workAddress")
    @JsonIgnore
    private User user;

    public WorkAddress() {
    }

    public WorkAddress(String name, User user) {
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
        return "WorkAddress{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user +
                '}';
    }
}

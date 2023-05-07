package com.example.userappapi.model;

public class UpdateUserResource {

    private User updatedUser;
    public User getUpdatedUser() { return updatedUser; }
    public void setUpdatedUser(User updatedUser) { this.updatedUser = updatedUser; }

    private User currentUser;
    public User getCurrentUser() { return currentUser; }
    public void setCurrentUser(User currentUser) { this.currentUser = currentUser; }
}

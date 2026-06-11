package com.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles_mapping")
public class RolesMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    int mid;

    int role;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMid() {
        return mid;
    }

    public void setMid(int mid) {
        this.mid = mid;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }
}
package com.auth.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Menu {

    @Id
    int mid;

    String menu;

    String icon;

    int role;

    public int getMid() {
        return mid;
    }

    public void setMid(int mid) {
        this.mid = mid;
    }

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }
}
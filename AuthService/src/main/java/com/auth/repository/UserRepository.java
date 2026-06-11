package com.auth.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.auth.model.Users;
import com.auth.model.Menu;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

    // Check credentials using email and password → returns role
    @Query("select U.role from Users U where U.email=:email and U.password=:pwd")
    public Object checkCredentials(@Param("email") String email, @Param("pwd") String password);

    // Check if email already exists → returns id
    @Query("select U.id from Users U where U.email=:email")
    public Object checkEmail(@Param("email") String email);

    // Find user by email
    public Users findByEmail(String email);

    // Get menus based on role
    @Query("select M from Menu M join RolesMapping R on M.mid = R.mid where R.role=:role")
    public List<Menu> getMenus(@Param("role") int role);

    // Get profile with role name
    @Query("select U,R from Users U left join Role R on U.role=R.id where U.email=:email")
    public Object getProfile(@Param("email") String email);

    // Get all users with their role name paginated
    @Query("select U,R from Users U left join Role R on U.role=R.id")
    public List<Object> getAllUsers();

    // Get single user by id with role
    @Query("select U,R from Users U left join Role R on U.role=R.id where U.id=:id")
    public Object getUserById(@Param("id") int id);
}
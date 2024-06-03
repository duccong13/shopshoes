package com.nvl.novatech.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userId;
    String firstName;
    String lastName;
    String avatarUrl;
    String email;
    String password;

    LocalDate dob;
    String phone;

    boolean isOnline = false;
    
    @ManyToMany
    Set<Role> roles;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Address> addresses = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Contact> contacts = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    List<Review> reviews = new ArrayList<>();

    // @Column(name = "source")
    // @Enumerated(EnumType.STRING)
    // private RegistrationSource source;

}

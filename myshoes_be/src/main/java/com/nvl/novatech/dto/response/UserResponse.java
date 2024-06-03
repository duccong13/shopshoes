package com.nvl.novatech.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {

    Long userId;
    String firstName;
    String lastName;
    String avatarUrl;
    String email;
    String phone;
    String password;
    LocalDate dob;
    boolean isOnline;

    Set<RoleResponse> roles;
}

package com.nvl.novatech.service;

import com.nvl.novatech.dto.request.AuthenticationRequest;
import com.nvl.novatech.dto.request.UserUpdateRequest;
import com.nvl.novatech.dto.response.AuthenticationResponse;
import com.nvl.novatech.dto.response.UserResponse;
import com.nvl.novatech.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    AuthenticationResponse createUser(AuthenticationRequest userCreationRequest);
    UserResponse getInfo();
    void deleteUser(Long userId);
    UserResponse updateUser(Long userId, UserUpdateRequest request);
    List<User> getUsers();
    UserResponse getUser(Long userId);
    User findUserProfileByJwt(String jwt);
    Optional<User> findUserByEmail(String email);
    void save(User user);
    User findUserById(Long userId);
    User setStatus(Long userId);
}

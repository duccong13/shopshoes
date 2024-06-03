package com.nvl.novatech.mapper;

import com.nvl.novatech.dto.request.AuthenticationRequest;
import com.nvl.novatech.dto.request.UserUpdateRequest;
import com.nvl.novatech.dto.response.AuthenticationResponse;
import com.nvl.novatech.dto.response.UserResponse;
import com.nvl.novatech.model.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(AuthenticationRequest request);


    UserResponse toUserResponse(User user);

    AuthenticationResponse toAuthenticationResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}

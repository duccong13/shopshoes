package com.nvl.novatech.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.jose.JOSEException;
import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.request.AuthenticationRequest;
import com.nvl.novatech.dto.request.IntrospectTokenRequest;
import com.nvl.novatech.dto.request.LogoutRequest;
import com.nvl.novatech.dto.response.AuthenticationResponse;
import com.nvl.novatech.dto.response.IntrospectTokenResponse;
import com.nvl.novatech.service.AuthenticationService;
import com.nvl.novatech.service.UserService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.text.ParseException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    
    AuthenticationService authenticationService;
    UserService userService;


    @PostMapping("/signin")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        var result = authenticationService.authenticate(request);

        return ApiResponse.<AuthenticationResponse>builder()
            .result(result)
            .build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectTokenResponse> introspectToken(@RequestBody IntrospectTokenRequest request) throws ParseException, JOSEException{
        var result = authenticationService.introspect(request);

        return ApiResponse.<IntrospectTokenResponse>builder()
            .result(result)
            .build();
    }


    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException{
        authenticationService.logout(request);

        return ApiResponse.<Void>builder()
            .build();
    }


    @PostMapping("/signup")
    ApiResponse<AuthenticationResponse> createUser(@RequestBody @Valid AuthenticationRequest request){

        userService.createUser(request);
        return ApiResponse.<AuthenticationResponse>builder()
            .result(authenticationService.authenticate(request))
            .build();
    }
    


}

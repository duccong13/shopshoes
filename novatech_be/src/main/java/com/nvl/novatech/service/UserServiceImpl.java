package com.nvl.novatech.service;

import com.nvl.novatech.config.JwtProvider;
import com.nvl.novatech.dto.request.AuthenticationRequest;
import com.nvl.novatech.dto.request.UserUpdateRequest;
import com.nvl.novatech.dto.response.AuthenticationResponse;
import com.nvl.novatech.dto.response.UserResponse;
import com.nvl.novatech.exception.AppException;
import com.nvl.novatech.exception.ErrorCode;
import com.nvl.novatech.mapper.UserMapper;
import com.nvl.novatech.model.Cart;
import com.nvl.novatech.model.Role;
import com.nvl.novatech.model.User;
import com.nvl.novatech.repository.CartRepository;
import com.nvl.novatech.repository.UserRepository;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService{

    UserRepository userRepository;
    CartService cartService;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;
    CartRepository cartRepository;
    // ChatService chatService;

    @NonNull
    private JwtProvider jwtProvider;


    @Override
    public AuthenticationResponse createUser(AuthenticationRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) throw new AppException(ErrorCode.USER_EXISTED);

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Set<Role> roles = new HashSet<>();
        roles.add(new Role("USER"));
        //roles.add(roleRepository.findById("USER").orElseThrow(() -> new RuntimeException("Role USER not found")));
        user.setRoles(roles);
        user = userRepository.save(user);
        cartService.createCart(user);
        // Long chatId = Long.valueOf(21);
        // chatService.createChat(user, chatId);
        return userMapper.toAuthenticationResponse(user);
    }

    @Override
    public UserResponse getInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByEmail(name).orElseThrow( () -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @Override
    public void deleteUser(Long userId) {
        Cart cart = cartRepository.findCartbyUserId(userId);
        if (cart != null) {
            cartRepository.delete(cart);
        } else {
        }
        userRepository.deleteById(userId);
    }

    @Override
    public List<User> getUsers() {
        // return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
        return userRepository.findAll();
    }

    @Override
    public UserResponse getUser(Long userId) {
        return userMapper.toUserResponse(userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    @Override
    public UserResponse updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userMapper.updateUser(user, request);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public User findUserProfileByJwt(String jwt) {
        String email = jwtProvider.extractUsername(jwt);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return user;
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_EXISTED));
    }

    @Override
    public User setStatus(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setOnline(false);
        return userRepository.save(user);
    }
}

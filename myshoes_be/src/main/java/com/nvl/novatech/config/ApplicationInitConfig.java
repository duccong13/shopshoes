package com.nvl.novatech.config;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.nvl.novatech.model.Role;
import com.nvl.novatech.model.User;
import com.nvl.novatech.repository.RoleRepository;
import com.nvl.novatech.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {
    
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if(userRepository.findByEmail("admin@gmail.com").isEmpty()){
                if (!roleRepository.existsById("ADMIN")) {
                    roleRepository.save(new Role("ADMIN"));
                }
                if (!roleRepository.existsById("USER")) {
                    roleRepository.save(new Role("USER"));
                }
                if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
                    Set<Role> roles = new HashSet<>();
                    roles.add(roleRepository.findById("ADMIN").orElseThrow(() -> new RuntimeException("Role ADMIN not found")));
                    roles.add(roleRepository.findById("USER").orElseThrow(() -> new RuntimeException("Role USER not found")));
        
                    User user = User.builder()
                        .avatarUrl("https://avatar.iran.liara.run/public/49")
                        .email("admin@gmail.com")
                        .password(passwordEncoder.encode("admin"))
                        .isOnline(true)
                        .roles(roles)
                        .build();
        
                    userRepository.save(user);
                }
            }
        };
    }
}

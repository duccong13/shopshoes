package com.nvl.novatech.service;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.nvl.novatech.model.InvalidatedToken;
import com.nvl.novatech.repository.InvalidatedTokenRepository;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvalidateTokenService {
    
    InvalidatedTokenRepository invalidatedTokenRepository;

    @Scheduled(fixedRate = 86400000)
    @Transactional
    public void deleteInvalidateToken(){
        List<InvalidatedToken> invalidatedTokens = invalidatedTokenRepository.findTokenbyExpiryTime();
        invalidatedTokenRepository.deleteAll(invalidatedTokens);
    }
}

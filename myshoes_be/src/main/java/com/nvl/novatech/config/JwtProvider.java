package com.nvl.novatech.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JwtProvider {
    
    @Value("${jwt.signerKey}")
    private String signerKey;
    


    public String extractUsername(String jwt) {
        jwt = jwt.substring(7);

        
        Claims claims = Jwts.parserBuilder().setSigningKey(signerKey.getBytes()).build().parseClaimsJws(jwt).getBody();
        String email = claims.getSubject();
        
        return email;
    }
}

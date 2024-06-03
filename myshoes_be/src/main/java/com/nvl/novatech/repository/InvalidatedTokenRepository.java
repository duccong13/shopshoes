package com.nvl.novatech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.InvalidatedToken;

@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String>{
    
    @Query("SELECT it FROM InvalidatedToken it WHERE it.expiryTime < CURRENT_TIMESTAMP")
    List<InvalidatedToken> findTokenbyExpiryTime();
}

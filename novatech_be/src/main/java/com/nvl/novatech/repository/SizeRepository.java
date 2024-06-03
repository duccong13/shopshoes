package com.nvl.novatech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.Size;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long>{
    
}

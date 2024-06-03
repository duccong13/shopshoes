package com.nvl.novatech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{
    
}

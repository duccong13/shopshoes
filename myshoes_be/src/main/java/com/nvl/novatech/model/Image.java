package com.nvl.novatech.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long imageId;

    @Column(name = "imageUrl")
    String imageUrl;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;

}

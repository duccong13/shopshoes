package com.nvl.novatech.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long categoryId;
    String categoryName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_category_id")
    Category parentCategory;
    int level;
}

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
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long contactId;
    String message;

    @ManyToOne
    User user;
}

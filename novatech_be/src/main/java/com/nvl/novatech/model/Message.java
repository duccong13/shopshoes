package com.nvl.novatech.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long messageId;
    String content;
    String imageUrl;
    LocalDateTime timestamp;
    
    @ManyToOne
    User user;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    Chat chat;
}

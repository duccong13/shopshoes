package com.nvl.novatech.model;

import java.io.Serializable;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentResDTO implements Serializable{
    
    String status;
    String message;
    String URL;
}

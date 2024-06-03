package com.nvl.novatech.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PACKAGE)
public class TransactionStatusDTO {
    String data;
    String message;
}

package com.nvl.novatech.dto.response;

import com.nvl.novatech.model.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressResponse {

    Long addressId;
    String firstName;
    String lastName;
    String streetAddress;
    String city;
    String state;
    String phone;
    User user;
}

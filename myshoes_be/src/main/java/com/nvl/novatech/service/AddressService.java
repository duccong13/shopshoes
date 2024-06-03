package com.nvl.novatech.service;

import java.util.List;

import com.nvl.novatech.dto.request.AddressRequest;
import com.nvl.novatech.dto.response.AddressResponse;
import com.nvl.novatech.model.User;
public interface AddressService {
    
    List<AddressResponse> getAddress(User user);
    AddressResponse createAddress(AddressRequest request, User user);
    AddressResponse updateAddress(Long addressId, AddressRequest request, User user);

    void deleteAddress(Long addressId, User user);
}

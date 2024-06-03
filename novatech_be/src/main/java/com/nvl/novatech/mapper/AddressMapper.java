package com.nvl.novatech.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.nvl.novatech.dto.request.AddressRequest;
import com.nvl.novatech.dto.response.AddressResponse;
import com.nvl.novatech.model.Address;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    
    @Mapping(target = "user", ignore = true)
    Address toAddress(AddressRequest request);

    AddressResponse toAddressResponse(Address address);

    @Mapping(target = "user", ignore = true)
    void updateAddress(@MappingTarget Address address, AddressRequest request);
}

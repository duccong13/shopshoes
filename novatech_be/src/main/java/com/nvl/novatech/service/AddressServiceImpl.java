package com.nvl.novatech.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nvl.novatech.dto.request.AddressRequest;
import com.nvl.novatech.dto.response.AddressResponse;
import com.nvl.novatech.exception.AppException;
import com.nvl.novatech.exception.ErrorCode;
import com.nvl.novatech.mapper.AddressMapper;
import com.nvl.novatech.model.Address;
import com.nvl.novatech.model.User;
import com.nvl.novatech.repository.AddressRepository;
import com.nvl.novatech.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressServiceImpl implements AddressService{

    UserRepository userRepository;
    AddressRepository addressRepository;
    AddressMapper addressMapper;

    @Override
    public List<AddressResponse> getAddress(User user) {
        Optional<User> userAddress = userRepository.findById(user.getUserId());
        if(!userAddress.isPresent()) throw new AppException(ErrorCode.USER_NOT_EXISTED);

        // List<Address> addresses = addressRepository.findAddressByUserId(userId);

        return addressRepository.findAddressByUser(user.getUserId()).stream().map(addressMapper::toAddressResponse).toList();
    }

    @Override
    public AddressResponse createAddress(AddressRequest request, User user) {
        Optional<User> userAddress = userRepository.findById(user.getUserId());

        if(!userAddress.isPresent()) 
            throw new AppException(ErrorCode.USER_NOT_EXISTED);

        Address address = addressMapper.toAddress(request);
        address.setUser(userAddress.get());
        userAddress.get().getAddresses().add(address);
        return addressMapper.toAddressResponse(addressRepository.save(address));
    }

    @Override
    public AddressResponse updateAddress(Long addressId, AddressRequest request, User user) {
        Optional<User> userAddress = userRepository.findById(user.getUserId());
        if(!userAddress.isPresent()) throw new AppException(ErrorCode.USER_NOT_EXISTED);

        Address address = addressRepository.findById(addressId).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_EXISTED));

        addressMapper.updateAddress(address, request);

        return addressMapper.toAddressResponse(addressRepository.save(address));
    }

    @Override
    public void deleteAddress(Long addressId, User user) {
        Address address = addressRepository.findById(addressId).orElseThrow(() -> new AppException(ErrorCode.CAN_NOT_DELETE));

        if(user.getUserId().equals(address.getUser().getUserId())){
            user.getAddresses().removeIf(addr -> addr.getAddressId().equals(addressId));
            addressRepository.deleteById(addressId);
        }
    }
    
}

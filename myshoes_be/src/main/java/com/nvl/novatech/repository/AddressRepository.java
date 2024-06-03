package com.nvl.novatech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{
    
    @Query("Select a from Address a where a.user.userId = :userId")
    List<Address> findAddressByUser(@Param("userId") Long userId);

    // @Query("Select a from Address a where a.firstName = :fristName and a.lastName = :lastName and a.streetAddress = :streetAddress and a.city = :city and a.state =:state and a.phone = :phone ")
    // boolean existsAddress(
    //     @Param("firstName") String fristName, 
    //     @Param("lastName") String lastName, 
    //     @Param("streetAddress") String streetAddress, 
    //     @Param("city") String city, 
    //     @Param("state") String state, 
    //     @Param("phone") String phone 
    // );
}

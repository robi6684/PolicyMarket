package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.monocept.insurance.entities.Customer;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {
	@Query("SELECT c FROM Customer c JOIN c.user u WHERE u.username = :username")
    Customer findByUsername(@Param("username") String username);
}

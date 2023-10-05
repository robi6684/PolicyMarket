package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.PolicyRegistration;

public interface PolicyRegistrationRepo extends JpaRepository<PolicyRegistration,Integer> {

}

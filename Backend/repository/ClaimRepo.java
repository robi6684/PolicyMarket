package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.Claim;

public interface ClaimRepo extends JpaRepository<Claim,Integer>{

}

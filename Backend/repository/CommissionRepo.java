package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.Commission;

public interface CommissionRepo extends JpaRepository<Commission,Integer> {

}

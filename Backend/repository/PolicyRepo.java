package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.Policy;

public interface PolicyRepo extends JpaRepository<Policy,Integer>{

}

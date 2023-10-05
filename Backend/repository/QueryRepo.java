package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.Query;

public interface QueryRepo extends JpaRepository<Query,Integer>{

}
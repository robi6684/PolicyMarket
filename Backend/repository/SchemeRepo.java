package com.monocept.insurance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.Scheme;

public interface SchemeRepo extends JpaRepository<Scheme,Integer>{
	Optional<Scheme> findBySchemename(String schemename);
}

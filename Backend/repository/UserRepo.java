package com.monocept.insurance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.User;

public interface UserRepo extends JpaRepository<User,Integer> {
	
	Optional<User> findByUsername(String username);
	boolean existsByUsername(String username);

}

package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.Role;


public interface RoleRepo extends JpaRepository<Role,Integer>{
	
	Role findByRolename(String rolename);
}

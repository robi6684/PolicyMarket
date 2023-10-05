package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.Admin;

public interface AdminRepo extends JpaRepository<Admin,Integer>{

}

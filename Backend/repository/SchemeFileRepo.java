package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.SchemeFile;

public interface SchemeFileRepo extends JpaRepository<SchemeFile,Long>{

	SchemeFile findByName(String name);
}

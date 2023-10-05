package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.ProductFile;

public interface ProductFileRepo extends JpaRepository<ProductFile,Long>{

	ProductFile findByName(String name);
}

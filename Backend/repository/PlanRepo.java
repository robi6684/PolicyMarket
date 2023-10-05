package com.monocept.insurance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.Plan;

public interface PlanRepo extends JpaRepository<Plan,Integer>{
	Optional<Plan> findByPlanname(String planname);
}

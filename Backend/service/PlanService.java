package com.monocept.insurance.service;

import org.springframework.data.domain.Page;

import com.monocept.insurance.dto.AllPlanDto;
import com.monocept.insurance.entities.Plan;

public interface PlanService {
	String savePlan(Plan plan);
	Page<AllPlanDto> getAllPlans(int pageno, int pagesize);
	String updatePlan(int planId, Plan plan);
	long getTotalPlanCount();
	AllPlanDto getPlan(String planname);

}

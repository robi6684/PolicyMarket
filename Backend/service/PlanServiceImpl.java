package com.monocept.insurance.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.monocept.insurance.dto.AllPlanDto;
import com.monocept.insurance.entities.Plan;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.exception.UserApiException;
import com.monocept.insurance.repository.PlanRepo;

import jakarta.transaction.Transactional;


@Service
public class PlanServiceImpl implements PlanService {

	
	@Autowired
	private PlanRepo planRepo;
	
	
	private static final Logger logger = LoggerFactory.getLogger(PlanServiceImpl.class);

	//---------------------------------Save Plan-------------------------------------
	@Override
	public String savePlan(Plan plan) {
		Optional<Plan> getPlan = planRepo.findByPlanname(plan.getPlanname());
		if(getPlan.isPresent()) {
			throw new UserApiException(HttpStatus.BAD_REQUEST,"Plan Already Exists");
		}
		planRepo.save(plan);
		logger.info("Plan added successfully");
		return "Plan added successfully";
	}

	//------------------------------Fetch All Plans---------------------------------
	@Override
	public Page<AllPlanDto> getAllPlans(int pageno, int pagesize) {
		List<AllPlanDto> allPlans = new ArrayList<>();
		List<Plan> plans = planRepo.findAll();
		if(plans.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Plans fetched successfully");
		for(Plan plan : plans) {
			allPlans.add(new AllPlanDto(plan.getPlanid(),plan.getPlanname()));
		}
		pagesize = (pagesize<allPlans.size())?pagesize:allPlans.size();
		if(pagesize == allPlans.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allPlans.size());

	    List<AllPlanDto> pageContent = allPlans.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allPlans.size());
	}

	//-----------------------------------------Update Plan---------------------------------------
	@Override
    @Transactional
    public String updatePlan(int planId, Plan plan) {
		List<Plan> plans = planRepo.findAll();
        Optional<Plan> optionalPlan = planRepo.findById(planId);
        if (optionalPlan.isPresent()) {
            Plan existingPlan = optionalPlan.get();
            for(Plan p : plans) {
            	if(!(p.getPlanid()== planId))
            	if(p.getPlanname().equals(plan.getPlanname())) {
            		throw new UserApiException(HttpStatus.BAD_REQUEST,"Plan Already Exists");
            	}
            }
            existingPlan.setPlanname(plan.getPlanname());
            planRepo.save(existingPlan);
            logger.info("Plan updated successfully");
            return "Plan updated successfully";
        } else {
        	  logger.info("Plan Not Found with this Id");
        	return "Plan Not Found with this Id";
            
        }
    }
	
	//----------------------------Get Count of Plans---------------------------------------
	@Override
    public long getTotalPlanCount() {
    	logger.info("Total Plans:" + planRepo.count());
        return planRepo.count();
    }

	//-----------------------------------------Fetch Plan-----------------------------------
	@Override
	public AllPlanDto getPlan(String planname) {
		Optional<Plan> getPlan = planRepo.findByPlanname(planname);
		Plan plan = null;
		if(getPlan.isPresent()) {
			plan = getPlan.get();
		}
		if(plan == null) {
			throw new ListEmptyException("List is empty",HttpStatus.NOT_FOUND);
		}
		logger.info("Plan fetched successfully");
		return new AllPlanDto(plan.getPlanid(),plan.getPlanname());
	}



}

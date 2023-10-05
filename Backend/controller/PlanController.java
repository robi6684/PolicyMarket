package com.monocept.insurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.insurance.dto.AllPlanDto;
import com.monocept.insurance.entities.Plan;
import com.monocept.insurance.service.PlanService;

@RestController
@RequestMapping("/planapp")
@CrossOrigin(origins="*")
public class PlanController {
	
	@Autowired
	private PlanService planService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/save")
	public ResponseEntity<String> savePlan(@RequestBody Plan plan){
		String message = planService.savePlan(plan);
		return new ResponseEntity<>(message,HttpStatus.CREATED);
	}
	
	
	@GetMapping("/getAllPlans")
	public ResponseEntity<Page<AllPlanDto>> getPlans(@RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(planService.getAllPlans(pageno, pagesize),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{planId}")
    public ResponseEntity<String> updatePlan(@PathVariable int planId,@RequestBody Plan updatedPlan) {
        String result = planService.updatePlan(planId, updatedPlan);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
	
	@GetMapping("/count")
    public ResponseEntity<Long> getTotalPlansCount() {
        long totalplanCount = planService.getTotalPlanCount();
        return new ResponseEntity<>(totalplanCount, HttpStatus.OK);
    }
	
	@GetMapping("/get/{planname}")
    public ResponseEntity<AllPlanDto> getPlan(@PathVariable("planname") String planname) {
        return new ResponseEntity<>(planService.getPlan(planname), HttpStatus.OK);
    }

	


}

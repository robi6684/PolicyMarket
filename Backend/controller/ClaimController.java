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

import com.monocept.insurance.dto.AllClaimDto;
import com.monocept.insurance.entities.Claim;
import com.monocept.insurance.service.ClaimService;



@RestController
@CrossOrigin(origins="*")
@RequestMapping("/claimapp")
public class ClaimController {
	
	 @Autowired
	   private ClaimService claimService;
		
		
		@PreAuthorize("hasRole('ADMIN')")
		@GetMapping("/getAllClaims")
		public ResponseEntity<Page<AllClaimDto>> getClaims(@RequestParam int pageno, @RequestParam int pagesize ){
			return new ResponseEntity<>(claimService.getAllClaims(pageno,pagesize),HttpStatus.OK);
		}
		
		@GetMapping("/count")
	    public ResponseEntity<Long> getTotalClaimCount() {
	        long totalClaimCount = claimService.getTotalClaimCount();
	        return new ResponseEntity<>(totalClaimCount, HttpStatus.OK);
	    }
		
		@PreAuthorize("hasRole('CUSTOMER')")
		@GetMapping("/getClaims/{username}")
		public ResponseEntity<Page<AllClaimDto>> getCustomerClaims(@PathVariable("username") String username,@RequestParam int pageno, @RequestParam int pagesize ){
			return new ResponseEntity<>(claimService.getCustomerClaims(username, pageno, pagesize),HttpStatus.OK);
		}
		
		@PreAuthorize("hasRole('CUSTOMER')")
		@PostMapping("/save/{username}/{policynumber}")
		public ResponseEntity<String> save(@RequestBody Claim claim, @PathVariable("username") String username, @PathVariable("policynumber") int policynumber ){
			return new ResponseEntity<>(claimService.saveClaim(claim, username, policynumber),HttpStatus.OK);
		}
		
		@PreAuthorize("hasRole('CUSTOMER')")
		@GetMapping("/getStatus/{policynumber}")
		public ResponseEntity<String> save(@PathVariable("policynumber") int policynumber ){
			return new ResponseEntity<>(claimService.getClaimStatus(policynumber),HttpStatus.OK);
		}
		
		@PreAuthorize("hasRole('ADMIN')")
		@PutMapping("/updateStatus/{claimid}")
		public ResponseEntity<String> updateStatus(@PathVariable("claimid") int claimid ){
			return new ResponseEntity<>(claimService.updateClaimStatus(claimid),HttpStatus.OK);
		}	

}
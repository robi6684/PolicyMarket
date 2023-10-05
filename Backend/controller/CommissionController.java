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

import com.monocept.insurance.dto.WithdrawalDto;
import com.monocept.insurance.entities.CommissionWithdrawal;
import com.monocept.insurance.service.CommissionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/commissionapp")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class CommissionController {

	@Autowired
	private CommissionService comm;
	
	@PreAuthorize("hasRole('AGENT')")
	@PostMapping("/save/{commissionid}")
	public ResponseEntity<String> saveWithdrawal(@RequestBody CommissionWithdrawal com, @PathVariable("commissionid")int commissionid) {
		return new ResponseEntity<>(comm.saveCommisionWithdrawal(com, commissionid),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/get")
	public ResponseEntity<Page<WithdrawalDto>> getWithdrawals(@RequestParam int pageno,@RequestParam int pagesize){
		return new ResponseEntity<>(comm.getWithdrawals(pageno, pagesize),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/update/{id}")
	public ResponseEntity<String> update(@PathVariable("id") int id){
		return new ResponseEntity<>(comm.updateStatus(id),HttpStatus.OK);
	}
}

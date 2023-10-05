package com.monocept.insurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.monocept.insurance.entities.Admin;
import com.monocept.insurance.service.AdminService;

@RestController
@RequestMapping("/adminapp")
@CrossOrigin(origins="*")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/save")
	public ResponseEntity<String> savAdmin(@RequestBody Admin admin){
		adminService.saveAdmin(admin);
		return new ResponseEntity<>("Admin saved successfully",HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updatePassword/{adminid}/{password}")
	public ResponseEntity<String> updatePassword(@PathVariable("adminid")int adminid, @PathVariable("password") String password){
				String message = adminService.updatePassword(adminid, password);
				return new ResponseEntity<> (message,HttpStatus.OK);
	}
			
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getAdmin/{username}")
	public ResponseEntity<Admin> getAdmin(@PathVariable("username") String username){
				return new ResponseEntity<>(adminService.getAdmin(username),HttpStatus.OK);
	}
			
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updateAdmin/{adminid}")
	public ResponseEntity<String> updateAdmin(@RequestBody Admin admin, @PathVariable("adminid")int adminid){
				String message = adminService.updateAdmin(adminid, admin);
				return new ResponseEntity<> (message,HttpStatus.OK);
	}
	

}

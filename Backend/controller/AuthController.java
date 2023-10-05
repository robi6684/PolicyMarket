package com.monocept.insurance.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.insurance.entities.Role;
import com.monocept.insurance.entities.User;
import com.monocept.insurance.payload.JwtAuthResponse;
import com.monocept.insurance.payload.LoginDto;
import com.monocept.insurance.payload.RegisterDto;
import com.monocept.insurance.repository.UserRepo;
import com.monocept.insurance.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserRepo userRepo;
	
	@PostMapping(value= {"/login", "/signin"})
	public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
		String token = authService.login(loginDto);
		
		User user = null;
		Role role = null;
		String rolename;
		Optional<User> findUser = userRepo.findByUsername(loginDto.getUsername());
		if(findUser.isPresent()) {
			user = findUser.get();
			role = user.getRole();
			
		}
		String username = user.getUsername();
		rolename = role.getRolename();
		JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
		jwtAuthResponse.setAccessToken(token);
		jwtAuthResponse.setRolename(rolename);
		jwtAuthResponse.setUsername(username);
		return ResponseEntity.ok(jwtAuthResponse);
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
		String response = authService.register(registerDto);
		return new ResponseEntity<>(response,HttpStatus.CREATED);

	}
	
}

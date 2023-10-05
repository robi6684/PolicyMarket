package com.monocept.insurance.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.monocept.insurance.entities.Role;
import com.monocept.insurance.entities.User;
import com.monocept.insurance.exception.UserApiException;
import com.monocept.insurance.payload.LoginDto;
import com.monocept.insurance.payload.RegisterDto;
import com.monocept.insurance.repository.RoleRepo;
import com.monocept.insurance.repository.UserRepo;
import com.monocept.insurance.security.JwtTokenProvider;

@Service
public class AuthServiceImpl implements AuthService{

	private AuthenticationManager authenticationManager;
	private UserRepo userRepository;
	private RoleRepo roleRepository;
	private JwtTokenProvider jwtTokenProvider;
	private PasswordEncoder passwordEncoder;
	
	private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
	
	public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepo userRepository,
			RoleRepo roleRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
		super();
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.jwtTokenProvider = jwtTokenProvider;
		this.passwordEncoder = passwordEncoder;
	}


	//---------------------Login------------------------------
	@Override
	public String login(LoginDto loginDto) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtTokenProvider.generateToken(authentication);
		logger.info("Token generated successfully");
		logger.info("Login successfull");
		return token;
	}


	//---------------------Register------------------------------
	@Override
	public String register(RegisterDto registerDto) {
		if(userRepository.existsByUsername(registerDto.getUsername())) {
			logger.error("User already exists");
			throw new UserApiException(HttpStatus.BAD_REQUEST,"User already exists");
		}
			
		
		User user = new User();
		user.setUsername(registerDto.getUsername());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

		Role role = roleRepository.findByRolename(registerDto.getRole());
		user.setRole(role);
		
		userRepository.save(user);
		logger.info("User registerd successfully");
		return "User registered successfully";
	}


}

package com.monocept.insurance.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.monocept.insurance.entities.User;
import com.monocept.insurance.exception.UserApiException;
import com.monocept.insurance.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	//------------------------------Save User----------------------------------
	@Override
	public String saveUser(User user) {
		if(userRepo.existsByUsername(user.getUsername())) {
			logger.error("User already exists");
			throw new UserApiException(HttpStatus.BAD_REQUEST,"User already exists");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepo.save(user);
		logger.info("User Saved Successfully");
		return "User Saved Successfully";
	}

}

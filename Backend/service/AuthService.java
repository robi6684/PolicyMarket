package com.monocept.insurance.service;

import com.monocept.insurance.payload.LoginDto;
import com.monocept.insurance.payload.RegisterDto;

public interface AuthService {
	String login(LoginDto loginDto);
	String register(RegisterDto registerDto);

}

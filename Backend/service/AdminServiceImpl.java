package com.monocept.insurance.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.monocept.insurance.entities.Admin;
import com.monocept.insurance.entities.Role;
import com.monocept.insurance.entities.User;
import com.monocept.insurance.repository.AdminRepo;
import com.monocept.insurance.repository.RoleRepo;
import com.monocept.insurance.repository.UserRepo;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AdminRepo adminRepo;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);
	
	//-------------Save Admin---------------------
	@Override
	public String saveAdmin(Admin admin) {
		User user = admin.getUser();
		Optional<Role> getRole = roleRepo.findById(1);
		Role role = getRole.get();
		user.setRole(role);
		userService.saveUser(user);
		adminRepo.save(admin);
		logger.info("Admin saved successfully");
		return ("Admin saved successfully");
	}
	
	//-------------Update Admin---------------------
	@Override
    public String updateAdmin(int adminid, Admin admin) {
		Admin newadmin = adminRepo.findById(adminid).get();
		newadmin.setFirstname(admin.getFirstname());
		newadmin.setLastname(admin.getLastname());
		adminRepo.save(newadmin);
		logger.info("Admin updated successfully");
		return "Admin Updated Successfully";
	}

	//-------------Update Admin Password---------------------
	@Override
	public String updatePassword(int adminid, String password) {
		Admin admin = adminRepo.findById(adminid).get();
		User user = admin.getUser();
		user.setPassword(passwordEncoder.encode(password));
		userRepo.save(user);
		logger.info("Password updated successfully");
		return "Password Updated Successfully";
	}
	
	//-------------Fetch Admin---------------------
	@Override
	public Admin getAdmin(String username) {
		List<Admin> admins = adminRepo.findAll();
		Admin admin = null;
		for(Admin newadmin : admins) {
			if(newadmin.getUser().getUsername().equals(username)) {
				admin = newadmin;
				break;
			}
		}
		logger.info("Admin fetched successfully");
		return admin;
	}

}

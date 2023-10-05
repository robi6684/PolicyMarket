package com.monocept.insurance.security;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.monocept.insurance.entities.Role;
import com.monocept.insurance.entities.User;
import com.monocept.insurance.repository.UserRepo;


@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	private UserRepo userRepo;

	public CustomUserDetailsService(UserRepo userRepo) {
		super();
		this.userRepo = userRepo;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> findUser = userRepo.findByUsername(username);
		
		User user = findUser.get();
		
		if(user == null)
			throw new UsernameNotFoundException("User not found with username or email: " +  username);
		
		Role role = user.getRole();
		GrantedAuthority authoritiy = new SimpleGrantedAuthority(role.getRolename());
		Set<GrantedAuthority> authorities = new HashSet<>();
		authorities.add(authoritiy);
		
		return new org.springframework.security.core.userdetails.User(user.getUsername(),
				user.getPassword(), authorities);
	}

}

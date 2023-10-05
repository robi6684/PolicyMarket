package com.monocept.insurance.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.monocept.insurance.security.JwtAuthenticationEntryPoint;
import com.monocept.insurance.security.JwtAuthenticationFilter;



@EnableMethodSecurity
@Configuration
public class SecurityConfig {
	private JwtAuthenticationEntryPoint authenticationEntryPoint;
	private JwtAuthenticationFilter authenticationFilter;
	
	public SecurityConfig(JwtAuthenticationEntryPoint authenticationEntryPoint,
			JwtAuthenticationFilter authenticationFilter) {
		this.authenticationEntryPoint = authenticationEntryPoint;
		this.authenticationFilter = authenticationFilter;
	}
	
	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf().disable()
		.authorizeHttpRequests((authorize) ->
		authorize.requestMatchers("/api/auth/**").permitAll()
		.requestMatchers("/employeeapp/**").permitAll()
		.requestMatchers("/adminapp/**").permitAll()
		.requestMatchers("/customerapp/**").permitAll()
		.requestMatchers("/agentapp/**").permitAll()
		.requestMatchers("/planapp/**").permitAll()
		.requestMatchers("/paymentapp/**").permitAll()
		.requestMatchers("/claimapp/**").permitAll()
		.requestMatchers("/schemeapp/**").permitAll()
		.requestMatchers("/fileapp/**").permitAll()
		.requestMatchers("/schemefileapp/**").permitAll()
		.requestMatchers("/policyapp/**").permitAll()
		.requestMatchers("/queryapp/**").permitAll()
		.requestMatchers("/commissionapp/**").permitAll()
		.anyRequest().authenticated()
		).exceptionHandling(exception -> exception
				.authenticationEntryPoint(authenticationEntryPoint)
				).sessionManagement(session -> session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
						);
		http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}

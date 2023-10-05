package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.monocept.insurance.entities.Agent;

public interface AgentRepo extends JpaRepository<Agent,Integer>{
	
	 @Query("SELECT a FROM Agent a JOIN a.user u WHERE u.username = :username")
	    Agent findByUsername(@Param("username") String username);

}

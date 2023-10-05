package com.monocept.insurance.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="agent")
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Agent {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int agentid;
	@Column
	private String firstname;
	@Column
	private String lastname;
	@Column
	private double commission;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="userid")
	private User user;
	@ManyToMany(cascade= {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH}, fetch = FetchType.EAGER)
	@JoinTable(name="agent_customers", joinColumns = @JoinColumn(name="agentid"), inverseJoinColumns= @JoinColumn(name="customerid"))
	@JsonIgnore
	private List<Customer> customers;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="agentid")
	@JsonIgnore
	private List<Commission> commissions;
	
	

}

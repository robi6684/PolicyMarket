package com.monocept.insurance.entities;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="customer")
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Customer {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int customerid;
	@Column
	private String firstname;
	@Column
	private String lastname;
	@Column
	private long mobilenumber;
	@Column
	private String email;
	@Column
	private Date dateofbirth;
	@Column
	private String address;
	@Column
	private String state;
	@Column
	private String city;
	@Column
	private int pincode;
	@Column
	private String nominee;
	@Column
	private String nomineerelation;
	@Column
	private String documentstatus;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="userid")
	private User user;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="customerid")
	@JsonIgnore
	private List<ProductFile> documents;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="customerid")
	@JsonIgnore
	private List<Policy> policies;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="customerid")
	@JsonIgnore
	private List<Payment> payments;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="customerid")
	@JsonIgnore
	private List<Claim> claims;
	

}

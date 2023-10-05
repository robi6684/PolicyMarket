package com.monocept.insurance.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name="scheme")
public class Scheme {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int schemeid;
	
	@Column
	private String schemename;
	
	@Column
	private int minage;
	
	@Column
	private int maxage;
	
	@Column
	private double profitratio;
	
	@Column
	private double minamount;
	
	@Column
	private double maxamount;
	
	@Column
	private int mininvesttime;
	
	@Column
	private int maxinvesttime;
	
	@Column
	private double registrationcommission; 
	
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="schemeid")
	private List<Policy>policies;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH,CascadeType.PERSIST})//,
	@JoinColumn(name = "planid",referencedColumnName = "planid")
	private Plan plan;
	
	
	
}
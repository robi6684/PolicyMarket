package com.monocept.insurance.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name="plan")
public class Plan {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int planid;
	
	@Column
	private String planname;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="planid")
	private List<Scheme> schemes;
	

}
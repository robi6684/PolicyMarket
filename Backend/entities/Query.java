package com.monocept.insurance.entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="query")
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Query {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int queryid;
	
	@Column
	private String email;
	
	@Column
	private String content;
	
	@Column
	private Date date;
	
	@Column
	private String status;
	

}
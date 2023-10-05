package com.monocept.insurance.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="schemefile")
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SchemeFile {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column
    private String name;
	@Column
    private String type;
	@Column
    private String path;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="schemeid")
	private Scheme scheme;
	

}

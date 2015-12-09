package com.techknights.wham.model;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "PersonCategory")
public class PersonCategory {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id",unique = true, nullable = false)
	private int id;
	
	@Column(name = "username")
	String username;
	
	@Column(name="category")
	String category;

	public void setUserName(String uName) {
		username = uName;
	}

	public String getUserName() {
		return username;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCategory() {
		return category;
	}
	
	
}

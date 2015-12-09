package com.techknights.wham.model;



import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Table;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Person")
public class Person {
	@Id
	@Column(name = "UserName")
	String UserName;
	
	@Column(name="Password")
	String Password;
	
	@Column(name="AuthCode")
	String AuthCode;
	
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "EventUser",  joinColumns = { 
			@JoinColumn(name = "UserName") }, 
			inverseJoinColumns = { @JoinColumn(name = "id") })
	private Set<Event> events = new HashSet<Event>(0);

	public void setUserName(String uName) {
		UserName = uName;
	}

	public String getUserName() {
		return UserName;
	}

	public void setPassword(String pword) {
		Password = pword;
	}

	public String getPassword() {
		return Password;
	}
	
	public void setAuthCode(String auth) {
		AuthCode = auth;
	}

	public String getAuthCode() {
		return AuthCode;
	}
	
	
	public Set<Event> getEvents() {
		return this.events;
	}

	public void setEvents(Set<Event> events) {
		this.events = events;
	}

}

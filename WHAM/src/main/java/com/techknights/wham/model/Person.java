package com.techknights.wham.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
}

package com.techknights.wham.controller;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;

import com.techknights.wham.dao.loginDAO;
import com.techknights.wham.util.SendMail;



public class BusinessLogic {
	
	
	@Autowired
	private loginDAO loginDAO;

	@Autowired
	private SendMail sendMail;
	
	
	//method to add authentication code in database and send mail to user
	public void addSendMailAuth(String UserName){
		SecureRandom random = new SecureRandom();
		byte bytes[] = new byte[20];
		random.nextBytes(bytes);
		String token = bytes.toString();
		StringBuilder url = new StringBuilder(
				"http://localhost:8080/wham/authenticate?user-email=");
		url.append(UserName);
		url.append("&auth-code=");
		url.append(token);

		loginDAO.addAuthCode(UserName, token);
		//loginDAO.displayPerson(UserName);

		sendMail.send(
				UserName,
				"Hi "
						+ UserName
						+ ",\n\nPlease click on the link below to change your password. \n\n"
						+ url
						+ "\n\nPlease note that this link can only be used once. \n\nFrom,\nWHAM");
	}

}

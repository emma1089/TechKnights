package com.techknights.wham;

import static org.junit.Assert.*;

import org.junit.Test;

import com.techknights.wham.controller.BusinessLogic;
import com.techknights.wham.dao.loginDAO;

public class passwordChange {
	
//	@Autowired
//	private loginDAO loginDAO;
//	
//	@Autowired
//	private BusinessLogic bl;
	loginDAO lg=new loginDAO();
	BusinessLogic bl= new BusinessLogic();
	@Test
	public void testingAddAuthCode() {
		String username= "something@gmail.com";
		String password= "abcABC123";
		String authCode= "abcABC123";
		//add person to the database
		lg.addPerson(username,password);
		//get added person from database
		
		assertFalse("AuthCode not yet added, hence should be false",lg.checkAuth(username, authCode));
		//Now, when the database is checked if the user exists, it should be true
		lg.addAuthCode(username, authCode);
		//Auth Code has been added, hence should match with the added auth code
		assertTrue("AuthCode added and correct, hence should be true",lg.checkAuth(username, authCode));
		//When auth code is wrong or outdated
		assertFalse("AuthCode added but incorrect, hence should be false",lg.checkAuth(username, "23ds23ds"));
	}
	
	@Test
	public void testingUpdatePassword() {
		String username= "something@gmail.com";
		String password= "abcABC123";
		assertTrue("User exists & password correct, hence should be granted access", lg.checkLogin(username,password));
		String new_password="newPass123";
		lg.updatePassword(username,new_password);
		assertTrue("User exists & new password used, hence should be granted access", lg.checkLogin(username,new_password));
		assertFalse("User exists & old password used, hence should not be granted access", lg.checkLogin(username,password));
	}

	@Test
	public void testingDeletePerson() {
		String username= "something@gmail.com";
		lg.deletePerson(username);
		assertTrue("To test if username does not exist", lg.CheckExists(username));
	}
	
}

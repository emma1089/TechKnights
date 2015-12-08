package com.techknights.wham;

import static org.junit.Assert.*;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.techknights.wham.controller.BusinessLogic;
import com.techknights.wham.dao.loginDAO;

public class loginTest {
	
	@Autowired
	private loginDAO loginDAO;
	
	@Autowired
	private BusinessLogic bl;
	loginDAO lg=new loginDAO();
	@Test
	public void testingCheckUniqueCreateUser() {
		
		String username= "something@gmail.com";
		lg.deletePerson(username);
		String password= "abcABC123";
		//check if user-name already exists: should not exist.
		assertTrue("To test if username does not exist", lg.CheckExists(username));
		//add person to the database
		lg.addPerson(username,password);
		//Now, when the database is checked if the user exists, it should be true
		assertFalse("To test if username does exist", lg.CheckExists(username));
		//JOptionPane.showMessageDialog(null, "Im here");
	}
	@Test
	public void testingCheckLogin() {
		String username= "something@gmail.com";
		String password= "abcABC123";
		String wrong_username= "somethingElse@gmail.com";
		String wrong_password= "123abd123";
		assertTrue("User exists & password correct, hence should be granted access", lg.checkLogin(username,password));
		assertFalse("User exists & password incorrect, hence should not be granted access", lg.checkLogin(username,wrong_password));
		assertFalse("User does not exist but password correct for another user, hence should not be granted access", lg.checkLogin(wrong_username,password));
		assertFalse("User does not exist & password incorrect, hence should not be granted access", lg.checkLogin(wrong_username,wrong_password));
	}
	@Test
	public void testingDeletePerson() {
		String username= "something@gmail.com";
		lg.deletePerson(username);
		assertTrue("To test if username does not exist", lg.CheckExists(username));
	}
}

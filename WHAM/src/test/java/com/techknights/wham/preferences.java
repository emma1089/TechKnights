package com.techknights.wham;
//import static org.junit.Assert.*;

import java.util.List;
import java.util.Set;

import org.junit.Test;

import com.techknights.wham.dao.loginDAO;
import com.techknights.wham.model.Event;

public class preferences {
	loginDAO lg=new loginDAO();
	String[] cat={"concert","sports"};
	String username= "test2@gmail.com";
	
	String password= "abcABC123";
	
	@Test
	public void testingAddCategories() {
		lg.deletePerson(username);
		lg.addPerson(username,password);
		lg.addCategories(username, cat);
		List<String> categoryList=lg.getCategories(username);
	}
	
	
	
	
//	@Test
//	public void testingAddEvent() {
//		Event e= new Event();
//		e.setId("hahahaha");
//		e.setName("Hello");
//		e.setStartTime("sometime");
//		lg.addEventObject(e);
//	}
	
	@Test
	public void testingAddEvents() {
		Event e= new Event();
		e.setId("123jffg");
		e.setName("Hello");
		e.setStartTime("sometime");
		try{
		lg.addEvent(username,e);
		}catch(Exception ex){
			System.out.println(ex);
		}
	}
	
	@Test
	public void testingRemoveEvent() {
		String eID="E0-001-089125238-7";
		try{
		lg.removeEvent(eID,"bluez.jenny@gmail.com");
		}catch(Exception ex){
			System.out.println(ex);
		}
	}

}

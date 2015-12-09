package com.techknights.wham.dao;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.swing.JOptionPane;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.techknights.wham.model.Event;
import com.techknights.wham.model.Person;
import com.techknights.wham.model.PersonCategory;

public class loginDAO extends DAO {
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public boolean checkLogin(String uname, String pword) {
		Session session = getSession();
		Query q = session
				.createQuery("from Person where UserName = :uname and Password = :pword");
		q.setString("uname", uname);
		q.setString("pword", pword);
		if (q.uniqueResult() == null) {
			session.close();
			return false;
		} else {
			session.close();
			return true;
		}
	}
	
	public Person getPerson(String uname) {
		Session session = getSession();
		Query q = session
				.createQuery("from Person where UserName = :uname");
		q.setParameter("uname", uname);
		
		Person p = (Person) q.uniqueResult();
		session.close();
		return p;
		
		//System.out.println("Name "+ p.getUserName() + " Password: " +p.getPassword()+" AuthCode"+p.getAuthCode());
		
	}
	

	public void addPerson(String uname, String pword) {
		Session session = getSession();
		Person p = new Person();
		p.setPassword(pword);
		p.setUserName(uname);
		session.beginTransaction();
		session.save(p);
		session.getTransaction().commit();
		session.close();
	}
	
	public void deletePerson(String uname) {
		Session session = getSession();
		Query q = session
				.createQuery("delete Person where UserName = :uname");
		q.setParameter("uname", uname);
		session.beginTransaction();
		q.executeUpdate();
		session.getTransaction().commit();
		session.close();
	}

	public boolean CheckExists(String userName) {
		Session session = getSession();
		Query q = session.createQuery("from Person where UserName = :uname");
		q.setString("uname", userName);
		if (q.uniqueResult() == null) {
			session.close();
			return true;
		} else {
			session.close();
			return false;
		}

	}
	
	public Set<Event> getEvents(String userName) {
		Session session = getSession();
		Query q = session.createQuery("from Person where UserName = :uname");
		q.setString("uname", userName);
		Person p=(Person) q.uniqueResult();
		return p.getEvents();

	}

	public void addAuthCode(String userName, String token) {
		//System.out.println("Im here");
		Session session = getSession();
		try{
		
		String hql = "UPDATE Person set AuthCode = :tok "
				+ "WHERE UserName = :uname";
		Query q = session.createQuery(hql);
		q.setString("uname", userName);
		q.setString("tok", token);
		session.beginTransaction();
		q.executeUpdate();
		session.getTransaction().commit();
		session.close();
		}
		catch(Exception e){
			JOptionPane.showMessageDialog(null, e);
			session.close();
		}
		
		
		
		
		
	
	}

	public boolean checkAuth(String userName, String authCode) {
		Session session = getSession();
		Query q = session
				.createQuery("from Person where UserName = :uname and AuthCode = :auth");
		//JOptionPane.showMessageDialog(null, "alert", "alert", JOptionPane.ERROR_MESSAGE);
		
		q.setString("uname", userName);
		q.setString("auth", authCode);
		if (q.uniqueResult() == null) {
			session.close();
			return false;
		} else {
			session.close();
			return true;
		}
		
	}

	public void updatePassword(String userName, String password) {
		try{
			Session session = getSession();
			String hql = "UPDATE Person set Password = :pw "
					+ "WHERE UserName = :uname";
			Query q = session.createQuery(hql);
			q.setString("uname", userName);
			q.setString("pw", password);
			session.beginTransaction();
			q.executeUpdate();
			session.getTransaction().commit();
			session.close();
			}
			catch(Exception e){
				
			}
	}

	public void addCategories(String userName, String[] categories) {
		//first delete all prev categories of pc
		for(String category: categories){
			try{
				Session session = getSession();
				PersonCategory p = new PersonCategory();
				p.setCategory(category);
				p.setUserName(userName);
				session.beginTransaction();
				session.save(p);
				session.getTransaction().commit();
				session.close();
				}
				catch(Exception e){
					
				}
		}
		
	}

	public List<String> getCategories(String userName) {
		List<PersonCategory> personCats;
		Session session = getSession();
		Query q = session
				.createQuery("from PersonCategory where username =:uname");
		q.setString("uname",userName);
		//q.setParameter(, userName);
		personCats=q.list();
		Iterator<PersonCategory> iterator = personCats.iterator();
		List<String> categories=new ArrayList<String>();
		
		while (iterator.hasNext()) {
			categories.add((iterator.next().getCategory()));
			
		}
		return categories;
	}

	public void addEvent(String userName, Event event) {
		Person oldUser=getPerson(userName);
		Set<Event> events=new HashSet<Event>();
		if(oldUser.getEvents()!=null){
			events=oldUser.getEvents();
		}
		events.add(event);
		oldUser.setEvents(events);
		
		try{
			Session session = getSession();
			session.beginTransaction();
			session.update(oldUser);
			session.getTransaction().commit();
			session.close();
//			Person User=getPerson(userName);
//			Set<Event> events1=User.getEvents();
//			
//			Iterator it2=events1.iterator();
//			while(it2.hasNext()){
//				Event e=(Event)it2.next();
//				System.out.println(e.getName());
//			}
			}
			catch(Exception e){
				System.out.println(e);
			}
		
	}

	public void addEventObject(Event event) {
		try{
			Session session = getSession();
			session.beginTransaction();
			session.save(event);
			session.getTransaction().commit();
			session.close();
			
			}
			catch(Exception e){
				
			}
		
	}

	public void removeEvent(String eventID, String userName) {
		Person oldUser=getPerson(userName);
		Set<Event> events=oldUser.getEvents();
		Iterator it=events.iterator();
		while(it.hasNext()){
			Event e=(Event)it.next();
			System.out.println(e.getId());
		}
		Event ev=getEvent(eventID);
		events.remove(ev);
		Iterator it2=events.iterator();
		while(it2.hasNext()){
			Event e=(Event)it2.next();
			System.out.println(e.getId());
		}
		oldUser.setEvents(events);
		Set<Event> events1=oldUser.getEvents();
		
		
		try{
			Session session = getSession();
			session.beginTransaction();
			session.update(oldUser);
			session.getTransaction().commit();
			session.close();
//			Person User=getPerson(userName);
//			Set<Event> events1=User.getEvents();
//			
//			Iterator it2=events1.iterator();
//			while(it2.hasNext()){
//				Event e=(Event)it2.next();
//				System.out.println(e.getName());
//			}
			}
			catch(Exception e){
				System.out.println(e);
			}
		
	}

	private Event getEvent(String eventID) {
		Session session = getSession();
		Query q = session
				.createQuery("from Event where id = :id");
		q.setParameter("id", eventID);
		
		Event e= (Event) q.uniqueResult();
		session.close();
		return e;
	}
	
	
	
	

}

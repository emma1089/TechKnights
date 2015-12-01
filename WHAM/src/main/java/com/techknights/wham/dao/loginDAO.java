package com.techknights.wham.dao;

import javax.swing.JOptionPane;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.techknights.wham.model.Person;

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
	
	public void displayPerson(String uname) {
		Session session = getSession();
		Query q = session
				.createQuery("from Person where UserName = :uname");
		q.setParameter("uname", uname);
		
		Person p = (Person) q.uniqueResult();
		System.out.println("Name "+ p.getUserName() + " Password: " +p.getPassword()+" AuthCode"+p.getAuthCode());
		
	}
	

	public void addPerson(String uname, String pword) {
		Session session = getSession();
		Person p = new Person();
		p.setPassword(pword);
		p.setUserName(uname);
		// try{
		session.beginTransaction();
		session.save(p);
		session.getTransaction().commit();
		session.close();
		// }catch(Exception e){
		//
		// }finally{
		// session.getTransaction().rollback();
		// session.close();
		// }

	}

	public boolean CheckUnique(String userName) {
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

	public void addAuthCode(String userName, String token) {
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
				JOptionPane.showMessageDialog(null, e);
			}
	}

}

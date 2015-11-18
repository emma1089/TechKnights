package com.techknights.wham.dao;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.techknights.wham.model.Person;

public class loginDAO  extends DAO{
		private SessionFactory sessionFactory;

		public SessionFactory getSessionFactory() {
			return sessionFactory;
		}

		public void setSessionFactory(SessionFactory sessionFactory) {
			this.sessionFactory = sessionFactory;
		}
		
		public boolean checkLogin(String uname, String pword){
			Session session = getSession();
			Query q= session.createQuery("from Person where UserName = :uname and Password = :pword");
			q.setString("uname", uname);
			q.setString("pword", pword);
			if(q.uniqueResult()==null){
				session.close();
				return false;
			}else{
				session.close();
				return true;
			}
		}
		
		public void addPerson(String uname, String pword){
			Session session=getSession();
			Person p=new Person();
			p.setPassword(pword);
			p.setUserName(uname);
			//try{
			session.beginTransaction();
			session.save(p);
			session.getTransaction().commit();
			session.close();
//			}catch(Exception e){
//		
//			}finally{
//				session.getTransaction().rollback();
//				session.close();
//			}
			
		}

		public boolean CheckUnique(String userName) {
			Session session=getSession();
			Query q= session.createQuery("from Person where UserName = :uname");
			q.setString("uname", userName);
			if(q.uniqueResult()==null){
				session.close();
				return true;
			}else{
				session.close();
				return false;
			}
			
		}
}

package br.com.argonavis.cheburashka.facade;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

import br.com.argonavis.cheburashka.domain.Verb;

public class VerbFacade {
	
	private EntityManagerFactory emf;
	private EntityManager em;
	
	public VerbFacade(EntityManagerFactory emf){
		this.emf = emf;
	}
	
	public void begin() {
		em = emf.createEntityManager();
		em.getTransaction().begin();
	}
	
	public void end() {
		em.getTransaction().commit();
		em.close();
	}
	
	public void add(Verb n) {
		em.persist(n);
		em.flush();
	}
	public Verb update(Verb n) {
		Verb updated = em.merge(n);
		em.flush();
		return updated;
	}
	public void delete(Verb n) {
		em.remove(n);
		em.flush();
	}
	public List<Verb> findAll() {
		Query q = em.createQuery("select n from Verb n");
		return q.getResultList();
	}
	public Verb findByDisplayString(String displayString) {
		Query q = em.createQuery("select n from Verb n where n.displayString = :displayString");
		q.setParameter("displayString", displayString);
		return (Verb) q.getSingleResult();
	}
}

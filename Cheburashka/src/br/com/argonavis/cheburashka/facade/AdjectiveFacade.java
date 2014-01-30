package br.com.argonavis.cheburashka.facade;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

import br.com.argonavis.cheburashka.domain.Adjective;

public class AdjectiveFacade {
	
	private EntityManagerFactory emf;
	private EntityManager em;
	
	public AdjectiveFacade(EntityManagerFactory emf){
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
	
	public void add(Adjective n) {
		em.persist(n);
		em.flush();
	}
	public Adjective update(Adjective n) {
		Adjective updated = em.merge(n);
		em.flush();
		return updated;
	}
	public void delete(Adjective n) {
		em.remove(n);
		em.flush();
	}
	public List<Adjective> findAll() {
		Query q = em.createQuery("select n from Adjective n");
		return q.getResultList();
	}
	public Adjective findByDisplayString(String displayString) {
		Query q = em.createQuery("select n from Adjective n where n.displayString = :displayString");
		q.setParameter("displayString", displayString);
		return (Adjective) q.getSingleResult();
	}
}

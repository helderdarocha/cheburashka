package br.com.argonavis.cheburashka.facade;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

import br.com.argonavis.cheburashka.domain.Pronoun;

public class PronounFacade {
	
	private EntityManagerFactory emf;
	private EntityManager em;
	
	public PronounFacade(EntityManagerFactory emf){
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
	
	public void add(Pronoun n) {
		em.persist(n);
		em.flush();
	}
	public Pronoun update(Pronoun n) {
		Pronoun updated = em.merge(n);
		em.flush();
		return updated;
	}
	public void delete(Pronoun n) {
		em.remove(n);
		em.flush();
	}
	public List<Pronoun> findAll() {
		Query q = em.createQuery("select n from Pronoun n");
		return q.getResultList();
	}
	public Pronoun findByDisplayString(String displayString) {
		Query q = em.createQuery("select n from Pronoun n where n.displayString = :displayString");
		q.setParameter("displayString", displayString);
		return (Pronoun) q.getSingleResult();
	}
}

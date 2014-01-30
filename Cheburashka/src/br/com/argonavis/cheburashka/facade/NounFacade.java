package br.com.argonavis.cheburashka.facade;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

import br.com.argonavis.cheburashka.domain.Noun;
import br.com.argonavis.cheburashka.domain.Translation;

public class NounFacade {
	
	private EntityManagerFactory emf;
	private EntityManager em;
	
	public NounFacade(EntityManagerFactory emf){
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
	
	public void add(Noun n) {
		em.persist(n);
		em.flush();
		System.out.println("did all");
	}
	public Noun update(Noun n) {
		Noun updated = em.merge(n);
		em.flush();
		return updated;
	}
	public void delete(Noun n) {
		em.remove(n);
		em.flush();
	}
	public List<Noun> findAll() {
		Query q = em.createQuery("select n from Noun n");
		return q.getResultList();
	}
	public Noun findByDisplayString(String displayString) {
		Query q = em.createQuery("select n from Noun n where n.displayString = :displayString");
		q.setParameter("displayString", displayString);
		return (Noun) q.getSingleResult();
	}
}

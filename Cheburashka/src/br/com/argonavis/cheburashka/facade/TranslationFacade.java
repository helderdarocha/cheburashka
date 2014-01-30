package br.com.argonavis.cheburashka.facade;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

import br.com.argonavis.cheburashka.domain.Noun;
import br.com.argonavis.cheburashka.domain.Translation;
import br.com.argonavis.cheburashka.domain.WordType;

public class TranslationFacade {
	
	private EntityManagerFactory emf;
	private EntityManager em;
	
	public TranslationFacade(EntityManagerFactory emf){
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
	
	public void add(Translation n) {
		em.persist(n);
		em.flush();
		System.out.println("ID is " + n.getId());
	}
	public Translation update(Translation n) {
		Translation updated = em.merge(n);
		em.flush();
		return updated;
	}
	public void delete(Translation n) {
		em.remove(n);
		em.flush();
	}
	public List<Noun> findAll() {
		Query q = em.createQuery("select n from Translation n");
		return q.getResultList();
	}
	public Translation findByDisplayString(String displayString) {
		Query q = em.createQuery("select n from Translation n where n.displayString = :displayString");
		q.setParameter("displayString", displayString);
		return (Translation) q.getSingleResult();
	}
	
	public WordType findSource(Translation t) {
		Query q = em.createQuery("select t.source from Translation t where t.displayString = :displayString");
		q.setParameter("displayString", t.getDisplayString());
		return (WordType) q.getSingleResult();
	}
}

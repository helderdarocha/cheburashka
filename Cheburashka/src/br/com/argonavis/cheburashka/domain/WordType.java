package br.com.argonavis.cheburashka.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

/**
 * Entity implementation class for Entity: Word
 *
 */

@Entity
@Inheritance(strategy=InheritanceType.JOINED)
public abstract class WordType  {
	
	@Id @GeneratedValue 
	private int id;

	public abstract void setDisplayString(String displayString);
	public abstract String getDisplayString();
	
	public void setId(int id) {
		this.id = id;
	}
	public int getId() {
		return id;
	}
}

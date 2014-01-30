package br.com.argonavis.cheburashka.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Entity implementation class for Entity: Translation
 *
 */
@Entity

public class Translation implements Serializable {

	@GeneratedValue(strategy=GenerationType.SEQUENCE) 
	@Id
	private int id;
	private String displayString;
	private Language language;
	@ManyToOne(cascade=CascadeType.ALL) private WordType source;
	private static final long serialVersionUID = 1L;

	public Translation() {
		super();
	}   
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}   
	public String getDisplayString() {
		return this.displayString;
	}

	public void setDisplayString(String displayString) {
		this.displayString = displayString;
	}   
	public Language getLanguage() {
		return this.language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}
	
	public void setSource(WordType source) {
		this.source = source;
	}
	public WordType getSource() {
		return source;
	}
   
}

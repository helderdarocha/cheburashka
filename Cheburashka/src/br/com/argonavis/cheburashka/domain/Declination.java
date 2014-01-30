package br.com.argonavis.cheburashka.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Entity implementation class for Entity: Declination
 *
 */
@Entity
public class Declination implements Serializable {

	private String displayString;
	private int stressPosition;
	private String declinationCase;
	
	@ManyToOne (cascade=CascadeType.ALL)
	private WordType source;
	
	@Id @GeneratedValue(strategy=GenerationType.SEQUENCE)
	private int id;
	
	private static final long serialVersionUID = 1L;
	
	public Declination() {
		super();
	} 

	public Declination(String caseName) {
		this.declinationCase = caseName;
	}   

	public String getDisplayString() {
		return this.displayString;
	}

	public void setDisplayString(String displayString) {
		this.displayString = displayString;
	}
	public void setStressPosition(int stressPosition) {
		this.stressPosition = stressPosition;
	}
	public int getStressPosition() {
		return stressPosition;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getId() {
		return id;
	}

	public void setSource(WordType source) {
		this.source = source;
	}

	public WordType getSource() {
		return source;
	}

	public void setDeclinationCase(String declinationCase) {
		this.declinationCase = declinationCase;
	}

	public String getDeclinationCase() {
		return declinationCase;
	}
}

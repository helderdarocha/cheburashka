package br.com.argonavis.cheburashka.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * Entity implementation class for Entity: Conjugation
 *
 */
@Entity

public class Conjugation implements Serializable {

	@Id @GeneratedValue
	private int id;
	private String displayString;
	private int stressPosition;
	@ManyToOne private Verb verb;
	private static final long serialVersionUID = 1L;

	public Conjugation() {
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
	public void setStressPosition(int stressPosition) {
		this.stressPosition = stressPosition;
	}
	public int getStressPosition() {
		return stressPosition;
	}
	public void setVerb(Verb verb) {
		this.verb = verb;
	}
	public Verb getVerb() {
		return verb;
	}
   
}

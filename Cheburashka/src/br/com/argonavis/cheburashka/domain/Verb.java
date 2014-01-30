package br.com.argonavis.cheburashka.domain;

import java.io.Serializable;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

/**
 * Entity implementation class for Entity: Verb
 * 
 */
@Entity
public class Verb extends WordType implements Serializable {
	
	private String displayString;
	private String mainStem;
	private String secondaryStem;

	private Map<Person, Conjugation> pastConjugations;
	private Map<Person, Conjugation> presentConjugations;
	private Conjugation infinitive;
	private Conjugation formalImperative;
	private Conjugation informalImperative;
	private boolean isPerfective;	
	@OneToOne  private Verb pair;
	@ManyToOne private Translation translation;
	private static final long serialVersionUID = 1L;

	public Verb() {
		super();
	}

	public Map<Person, Conjugation> getPastConjugations() {
		return this.pastConjugations;
	}

	public void setPastConjugations(Map<Person, Conjugation> pastConjugations) {
		this.pastConjugations = pastConjugations;
	}

	public Map<Person, Conjugation> getPresentConjugations() {
		return this.presentConjugations;
	}

	public void setPresentConjugations(Map<Person, Conjugation> presentConjugations) {
		this.presentConjugations = presentConjugations;
	}

	public Conjugation getInfinitive() {
		return this.infinitive;
	}

	public void setInfinitive(Conjugation infinitive) {
		this.infinitive = infinitive;
	}

	public Conjugation getFormalImperative() {
		return this.formalImperative;
	}

	public void setFormalImperative(Conjugation formalImperative) {
		this.formalImperative = formalImperative;
	}

	public Conjugation getInformalImperative() {
		return this.informalImperative;
	}

	public void setInformalImperative(Conjugation informalImperative) {
		this.informalImperative = informalImperative;
	}

	public boolean getIsPerfective() {
		return this.isPerfective;
	}

	public void setIsPerfective(boolean isPerfective) {
		this.isPerfective = isPerfective;
	}

	public Verb getPair() {
		return this.pair;
	}

	public void setPair(Verb pair) {
		this.pair = pair;
	}

	public void setTranslation(Translation translation) {
		this.translation = translation;
	}

	public Translation getTranslation() {
		return translation;
	}

	public void setDisplayString(String displayString) {
		this.displayString = displayString;
	}

	public String getDisplayString() {
		return displayString;
	}

	public void setMainStem(String mainStem) {
		this.mainStem = mainStem;
	}

	public String getMainStem() {
		return mainStem;
	}

	public void setSecondaryStem(String secondaryStem) {
		this.secondaryStem = secondaryStem;
	}

	public String getSecondaryStem() {
		return secondaryStem;
	}

}

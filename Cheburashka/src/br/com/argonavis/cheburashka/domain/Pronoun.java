package br.com.argonavis.cheburashka.domain;

import java.io.Serializable;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Entity implementation class for Entity: Pronoun
 *
 */
@Entity

public class Pronoun extends WordType implements Serializable {
	
	private String displayString;
	private String mainStem;
	private String secondaryStem;

	private Map<Case, Declination> neuterDeclinations;
	private Map<Case, Declination> masculineDeclinations;
	private Map<Case, Declination> feminineDeclinations;
	private Map<Case, Declination> pluralDeclinations;
	@ManyToOne private Translation translation;
	
	private static final long serialVersionUID = 1L;

	public Pronoun() {
		super();
	}   
 
	public Map<Case, Declination> getNeuterDeclinations() {
		return this.neuterDeclinations;
	}

	public void setNeuterDeclinations(Map<Case, Declination> neuterDeclinations) {
		this.neuterDeclinations = neuterDeclinations;
	}   
	public Map<Case, Declination> getMasculineDeclinations() {
		return this.masculineDeclinations;
	}

	public void setMasculineDeclinations(Map<Case, Declination> masculineDeclinations) {
		this.masculineDeclinations = masculineDeclinations;
	}   
	public Map<Case, Declination> getFeminineDeclinations() {
		return this.feminineDeclinations;
	}

	public void setFeminineDeclinations(Map<Case, Declination> feminineDeclinations) {
		this.feminineDeclinations = feminineDeclinations;
	}   
	public Map<Case, Declination> getPluralDeclinations() {
		return this.pluralDeclinations;
	}

	public void setPluralDeclinations(Map<Case, Declination> pluralDeclinations) {
		this.pluralDeclinations = pluralDeclinations;
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

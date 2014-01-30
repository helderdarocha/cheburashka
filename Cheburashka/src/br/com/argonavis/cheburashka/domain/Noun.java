package br.com.argonavis.cheburashka.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.MapKey;
import javax.persistence.OneToMany;

/**
 * Entity implementation class for Entity: Noun
 *
 */
@Entity
public class Noun extends WordType implements Serializable {

	private String displayString;
	private String mainStem;
	private String secondaryStem;
	
	@OneToMany(mappedBy="source", cascade=CascadeType.ALL) 
	@MapKey(name="declinationCase")
	private Map<String, Declination> singularDeclinations;
	
	@OneToMany(mappedBy="source", cascade=CascadeType.ALL) 
	@MapKey(name="declinationCase")
	private Map<String, Declination> pluralDeclinations;
	
	private Gender gender;
	private boolean isAnimate;
	
	@OneToMany(mappedBy="source", cascade=CascadeType.ALL)
	private List<Translation> translations;
	
	private static final long serialVersionUID = 1L;

	public Noun() {
		super();
	}   
	public Map<String, Declination> getSingularDeclinations() {
		return this.singularDeclinations;
	}

	public void setSingularDeclinations(Map<String, Declination> singularDeclinations) {
		this.singularDeclinations = singularDeclinations;
	}   
	public Gender getGender() {
		return this.gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}   
	public Map<String, Declination> getPluralDeclinations() {
		return this.pluralDeclinations;
	}

	public void setPluralDeclinations(Map<String, Declination> pluralDeclinations) {
		this.pluralDeclinations = pluralDeclinations;
	}   
	
	public void addPluralDeclination(String declinationCase, Declination declination) {
		if (this.pluralDeclinations == null) {
			this.pluralDeclinations = new HashMap<String, Declination>();
		}
		this.pluralDeclinations.put(declinationCase, declination);
		declination.setSource(this);
	}
	
	public void addSingularDeclination(String declinationCase, Declination declination) {
		if (this.singularDeclinations == null) {
			this.singularDeclinations = new HashMap<String, Declination>();
		}
		this.singularDeclinations.put(declinationCase, declination);
		declination.setSource(this);
	}
	
	public boolean getIsAnimate() {
		return this.isAnimate;
	}

	public void setIsAnimate(boolean isAnimate) {
		this.isAnimate = isAnimate;
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
	public void setTranslations(List<Translation> translations) {
		this.translations = translations;
	}
	public List<Translation> getTranslations() {
		return translations;
	}
	public void addTranslation(Translation translation) {
		if (this.translations == null) {
			this.translations = new ArrayList<Translation>();
		}
		this.translations.add(translation);
		translation.setSource(this);
	}
	
	public String displayDeclinations(Map<String, Declination> map) {
		StringBuilder displayString   = new StringBuilder();
		for (Map.Entry<String, Declination> entry: map.entrySet()) {
			displayString.append(entry.getKey()).append(":").append(entry.getValue().getDisplayString()).append("\n");
		}
		return displayString.toString();
	}
   
}

package br.com.argonavis.cheburashka.domain;

public enum Case {
	NOMINATIVE ("Nominative"), 
	GENITIVE ("Genitive"), 
	PREPOSITIONAL ("Prepositional"), 
	DATIVE ("Dative"), 
	INSTRUMENTAL ("Instrumental"), 
	ACUSATIVE ("Acusative");
	
	private String name;
	
	Case(String name) {
		this.name = name;
	}
	
	public String toString() {
		return name;
	}
}

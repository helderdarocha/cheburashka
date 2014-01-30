package br.com.argonavis.cheburashka.tests;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import br.com.argonavis.cheburashka.domain.Case;
import br.com.argonavis.cheburashka.domain.Declination;
import br.com.argonavis.cheburashka.domain.Gender;
import br.com.argonavis.cheburashka.domain.Language;
import br.com.argonavis.cheburashka.domain.Noun;
import br.com.argonavis.cheburashka.domain.Translation;
import br.com.argonavis.cheburashka.facade.NounFacade;
import br.com.argonavis.cheburashka.facade.TranslationFacade;

public class NounFacadeTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		EntityManagerFactory factory = Persistence.createEntityManagerFactory("Cheburashka");
		
		NounFacade facade = new NounFacade(factory);
		/*
		facade.begin();
		
		Noun n1 = new Noun();
		n1.setDisplayString("Чебурашка");
		n1.setGender(Gender.F);
		n1.setIsAnimate(true);
		
		Declination nominative = new Declination(Case.NOMINATIVE.toString());
		nominative.setDisplayString("Чебурашка");
		Declination acusative  = new Declination(Case.ACUSATIVE.toString());
		acusative.setDisplayString("Чебурашку");
		
		n1.addSingularDeclination(Case.NOMINATIVE.toString(), nominative);
		n1.addSingularDeclination(Case.ACUSATIVE.toString(), acusative);
		
		Declination nominativePlural = new Declination(Case.NOMINATIVE.toString());
		nominativePlural.setDisplayString("Чебурашки");
		Declination acusativePlural  = new Declination(Case.ACUSATIVE.toString());
		acusativePlural.setDisplayString("Чебурашк");
		
		n1.addPluralDeclination(Case.NOMINATIVE.toString(), nominativePlural);
		n1.addPluralDeclination(Case.ACUSATIVE.toString(), acusativePlural);
		
		Translation english = new Translation();
		english.setLanguage(Language.EN);
		english.setDisplayString("Cheburashka");
		
		Translation portuguese = new Translation();
		portuguese.setLanguage(Language.PT);
		portuguese.setDisplayString("Tcheburáchka");
		
		n1.addTranslation(english);
		n1.addTranslation(portuguese);
		
		Noun n2 = new Noun();
		n2.setDisplayString("Крокодил");
		
		facade.add(n1);
		facade.add(n2);
		
		facade.end();
		*/
		
		facade.begin();
		
		List<Noun> result = facade.findAll();
		
		for (Noun noun : result) {
			System.out.println(noun.getId() + ": " + noun.getDisplayString());
			System.out.println("Singular: \n" + noun.displayDeclinations(noun.getSingularDeclinations()));
			System.out.println("Plural: \n" + noun.displayDeclinations(noun.getPluralDeclinations()));
			for (Translation translation : noun.getTranslations()) {
				System.out.println(translation.getLanguage() +": "+ translation.getDisplayString());
			}
			System.out.println("=====");
		}
		
		/*
		Noun result2 = facade.findByDisplayString("Крокодил");
		System.out.println("r2: "+result2.getDisplayString());
		
		Translation p2 = new Translation();
		p2.setLanguage(Language.PT);
		p2.setDisplayString("Crocodilo");
		
		result2.addTranslation(p2);
		facade.update(result2);
		
		Noun result4 = facade.findByDisplayString("Крокодил");
		System.out.println("tr: "+result4.getTranslations().get(0).getDisplayString()); 
		
		//facade.delete(result4);
		*/
		facade.end();
		
		
		
		
		TranslationFacade tfacade = new TranslationFacade(factory);
		tfacade.begin();
		
		Translation pt = new Translation();
		pt.setLanguage(Language.PT);
		pt.setDisplayString("Crocodilo");
		
		Noun noun = (Noun)tfacade.findSource(pt);
		
		System.out.println("Result: " + noun.getDisplayString());
		
		tfacade.end();

	}

}

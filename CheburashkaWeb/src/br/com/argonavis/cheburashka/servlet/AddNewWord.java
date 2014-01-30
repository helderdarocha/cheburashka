package br.com.argonavis.cheburashka.servlet;

import java.io.IOException;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.argonavis.cheburashka.domain.Case;
import br.com.argonavis.cheburashka.domain.Declination;
import br.com.argonavis.cheburashka.domain.Gender;
import br.com.argonavis.cheburashka.domain.Language;
import br.com.argonavis.cheburashka.domain.Noun;
import br.com.argonavis.cheburashka.domain.Translation;
import br.com.argonavis.cheburashka.facade.NounFacade;

/**
 * Servlet implementation class AddNewWord
 */
public class AddNewWord extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AddNewWord() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.processRequest(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.processRequest(request, response);
	}

	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8");
		
		// 1) Get all parameters
		String entryType = request.getParameter("entryType");

		String entry = request.getParameter("wrun");
		String wen = request.getParameter("wen");
		String wpt = request.getParameter("wpt");
		String mainStem = request.getParameter("mainNounStem");
		String secStem = request.getParameter("secondaryNounStem");
		String genderNumber = request.getParameter("genderNumber");
		String animate = request.getParameter("animate");

		String ncase = request.getParameter("ncase");
		String ncaseplu = request.getParameter("ncaseplu");
		String acase = request.getParameter("acase");
		String acaseplu = request.getParameter("acaseplu");
		String gcase = request.getParameter("gcase");
		String gcaseplu = request.getParameter("gcaseplu");
		String pcase = request.getParameter("pcase");
		String pcaseplu = request.getParameter("pcaseplu");
		String dcase = request.getParameter("dcase");
		String dcaseplu = request.getParameter("dcaseplu");
		String icase = request.getParameter("icase");
		String icaseplu = request.getParameter("icaseplu");
		
		EntityManagerFactory factory = Persistence.createEntityManagerFactory("Cheburashka");
		NounFacade facade = new NounFacade(factory);

		// 3) Redirect according to type of word (later)
		if (entryType.equals("Noun")) {
			
			// 2) Check if word does not exist
			facade.begin();
			//try {
			//facade.findByDisplayString(entry);
			// catch() {}

			// 4) Create type of Word (noun, for now)
			Noun n1 = new Noun();
			n1.setDisplayString(entry);
			
			if (genderNumber.equals("Feminine")) {
				n1.setGender(Gender.F);
			} else if (genderNumber.equals("Masculine")) {
				n1.setGender(Gender.M);
			} else if (genderNumber.equals("Neuter")) {
				n1.setGender(Gender.N);
			}
			
			n1.setIsAnimate(animate.equals("Yes") ? true : false);
			
			Declination nominative = new Declination(Case.NOMINATIVE.toString());
			nominative.setDisplayString(ncase);
			Declination acusative  = new Declination(Case.ACUSATIVE.toString());
			acusative.setDisplayString(acase);
			Declination genitive  = new Declination(Case.GENITIVE.toString());
			genitive.setDisplayString(gcase);
			Declination prepositional  = new Declination(Case.PREPOSITIONAL.toString());
			prepositional.setDisplayString(pcase);
			Declination dative  = new Declination(Case.DATIVE.toString());
			dative.setDisplayString(dcase);
			Declination instrumental  = new Declination(Case.INSTRUMENTAL.toString());
			instrumental.setDisplayString(icase);
			
			n1.addSingularDeclination(Case.NOMINATIVE.toString(), nominative);
			n1.addSingularDeclination(Case.ACUSATIVE.toString(), acusative);
			n1.addSingularDeclination(Case.GENITIVE.toString(), genitive);
			n1.addSingularDeclination(Case.PREPOSITIONAL.toString(), prepositional);
			n1.addSingularDeclination(Case.DATIVE.toString(), dative);
			n1.addSingularDeclination(Case.INSTRUMENTAL.toString(), instrumental);
			
			Declination nominativePlural = new Declination(Case.NOMINATIVE.toString());
			nominativePlural.setDisplayString(ncaseplu);
			Declination acusativePlural  = new Declination(Case.ACUSATIVE.toString());
			acusativePlural.setDisplayString(acaseplu);
			Declination genitivePlural  = new Declination(Case.GENITIVE.toString());
			genitive.setDisplayString(gcaseplu);
			Declination prepositionalPlural  = new Declination(Case.PREPOSITIONAL.toString());
			prepositional.setDisplayString(pcaseplu);
			Declination dativePlural  = new Declination(Case.DATIVE.toString());
			dative.setDisplayString(dcaseplu);
			Declination instrumentalPlural  = new Declination(Case.INSTRUMENTAL.toString());
			instrumental.setDisplayString(icaseplu);
			
			n1.addPluralDeclination(Case.NOMINATIVE.toString(), nominativePlural);
			n1.addPluralDeclination(Case.ACUSATIVE.toString(), acusativePlural);
			n1.addPluralDeclination(Case.GENITIVE.toString(), genitivePlural);
			n1.addPluralDeclination(Case.PREPOSITIONAL.toString(), prepositionalPlural);
			n1.addPluralDeclination(Case.DATIVE.toString(), dativePlural);
			n1.addPluralDeclination(Case.INSTRUMENTAL.toString(), instrumentalPlural);
			
			Translation english = new Translation();
			english.setLanguage(Language.EN);
			english.setDisplayString(wen);
			
			Translation portuguese = new Translation();
			portuguese.setLanguage(Language.PT);
			portuguese.setDisplayString(wpt);
			
			n1.addTranslation(english);
			n1.addTranslation(portuguese);
			
			facade.add(n1);
			System.out.print("did all");
			facade.end();

			// 5) Save in database
		}
	}

	private void createNoun() {

	}

}

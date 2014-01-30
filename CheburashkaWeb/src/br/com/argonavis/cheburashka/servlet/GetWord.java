package br.com.argonavis.cheburashka.servlet;

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.argonavis.cheburashka.domain.Noun;
import br.com.argonavis.cheburashka.domain.Translation;
import br.com.argonavis.cheburashka.facade.NounFacade;

/**
 * Servlet implementation class GetWord
 */
public class GetWord extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetWord() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.processRequest(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.processRequest(request, response);
	}
	
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 1) Get all parameters
		
		// 2) Get Word by translation or by displayString
		
		// 3) Return data
		EntityManagerFactory factory = Persistence.createEntityManagerFactory("Cheburashka");
		NounFacade facade = new NounFacade(factory);
		
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
		
		facade.end();
		
	}
}

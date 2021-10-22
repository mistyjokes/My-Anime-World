package com.skillstorm.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillstorm.beans.Anime;
import com.skillstorm.data.AnimeDAO;

@WebServlet(urlPatterns = "/api/anime")
public class AnimeServlet extends HttpServlet {
	
	AnimeDAO dao = new AnimeDAO();
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		List<Anime> allAnime = dao.findAll();
		String json = new ObjectMapper().writeValueAsString(allAnime);
		resp.getWriter().print(json);
		resp.setContentType("application/json");
	}
	
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		//System.out.println("servlet POST()");
		//parse the body of the http request
		InputStream requestBody = req.getInputStream();
		
		//convert the request body into a java object
		Anime anime = new ObjectMapper().readValue(requestBody, Anime.class);
		
		//updating the movie object to contain the generated id
		Anime createAnime = dao.create(anime);
		
		//returning back the updated movie as a json string
		resp.getWriter().print(new ObjectMapper().writeValueAsString(createAnime));
		
		//set the status code to 201: CREATED
		resp.setStatus(201);
		
		//setting content type to json
		resp.setContentType("application/json");
		
	}
	
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		InputStream requestBody = req.getInputStream();
		Anime anime = new ObjectMapper().readValue(requestBody, Anime.class);
		Anime updatedAnime = dao.update(anime);
		resp.getWriter().print(new ObjectMapper().writeValueAsString(updatedAnime));
		resp.setStatus(200); // OK
		resp.setContentType("application/json");	
	}
	
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		InputStream requestBody = req.getInputStream();
		Anime anime = new ObjectMapper().readValue(requestBody, Anime.class);
		Anime updatedAnime = dao.delete(anime);
		resp.getWriter().print(new ObjectMapper().writeValueAsString(updatedAnime));
		resp.setStatus(200); // OK
		resp.setContentType("application/json");
	}


}

package com.skillstorm.data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

import com.skillstorm.beans.Anime;



public class AnimeDAO {
	
	static final String url = "jdbc:mysql://localhost:3306/anime-api";
	static final String username = "root";
	static final String password = "Babyblue2!";
	
	// 1. load the class (driver) into memory
	
	static{ //runs first before anything else
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public Anime create(Anime anime) {
		// 2. Make a connection object using the driver manager AND 5. Close the connection
		
		try(Connection conn = DriverManager.getConnection(url, username, password)) {
			
			// 3.Creating our statement
			String sql = "insert into anime(name, creator, mediaType, numOfEpisodes, rating, hasWatched, studioName, iCompleted) values (?, ?, ?, ?, ?, ?, ?, ?)";
			
			PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			stmt.setString(1, anime.getName());
			stmt.setString(2, anime.getCreator());
			stmt.setString(3, anime.getMediaType());
			stmt.setInt(4, anime.getNumOfEpisodes());
			stmt.setInt(5, anime.getRating());
			stmt.setString(6, anime.getHasWatched());
			stmt.setString(7, anime.getStudioName());
			stmt.setString(8, anime.getICompleted());
			
			// 4. Execute the Statement
			stmt.executeUpdate();   // update because changing the table
			
			//getting back the auto-incremented id from database 
			ResultSet keys = stmt.getGeneratedKeys();				
			keys.next();
			
			
			int animeID = keys.getInt(1);
			anime.setId(animeID);
			
		}catch(SQLException e) {
			e.printStackTrace();
		}
		 //return back the updated movie with an ID
		return anime;
	}
	
	
	public List<Anime> findAll() {
		
		
		List<Anime> allAnime = new LinkedList<>();
		// 2. Make a connection object using the driver manager AND 5. Close the connection
		
		try(Connection conn = DriverManager.getConnection(url, username, password)){
	
			// 3.Creating our statement
			String sql = "select id, name, creator, mediaType, numOfEpisodes, rating, hasWatched, studioName, iCompleted from anime";
			PreparedStatement stat = conn.prepareStatement(sql);

			
			// 4. Execute the Statement 
			ResultSet rs = stat.executeQuery(); 
			
			while(rs.next()) {
				int animeID = rs.getInt("id"); 
				String name = rs.getString(2);
				String creator = rs.getString(3);
				String mediaType = rs.getString(4);
				int numOfEpisodes = rs.getInt("numOfEpisodes");
				int rating = rs.getInt("rating");
				String hasWatched = rs.getString(7);
				String studioName = rs.getString(8);
				String iCompleted = rs.getString(9);
				
				//creating new movie object with those attributes
				Anime anime = new Anime(animeID, name, creator, mediaType, numOfEpisodes, rating, hasWatched, studioName, iCompleted);
				
				//adding new movie to set of all movies
				allAnime.add(anime);
			}
			
		}catch(SQLException e) {
			e.printStackTrace();
		} finally {
			
		}
		 //return back the set of all movies
		return allAnime;
	}
	
	
	public Anime update(Anime newAnime) {
		
		try(Connection conn = DriverManager.getConnection(url, username, password)){
	
			
			String sql = "update anime set name = ?, creator = ?, mediaType = ?, numOfEpisodes = ?, rating = ?, hasWatched = ?,"
					+ " studioName = ?, iCompleted = ? where id = ?";
			
			PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			stmt.setString(1, newAnime.getName());
			stmt.setString(2, newAnime.getCreator());
			stmt.setString(3, newAnime.getMediaType());
			stmt.setInt(4, newAnime.getNumOfEpisodes());
			stmt.setInt(5, newAnime.getRating());
			stmt.setString(6, newAnime.getHasWatched());
			stmt.setString(7, newAnime.getStudioName());
			stmt.setString(8, newAnime.getICompleted());
			stmt.setInt(9, newAnime.getId());
			
			stmt.executeUpdate(); //update because the table is changing
			
			
		}catch(SQLException e) {
			e.printStackTrace();
		}
		
		return newAnime;
		
	}

	public Anime delete(Anime anime) { //change this method for id 
		
		try(Connection conn = DriverManager.getConnection(url, username, password)){
			String sql = "delete from anime where id = ?";
			PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			stmt.setInt(1, anime.getId());

			
			System.out.println("You are deleting " + anime.getName() + " from Anime Database");
			stmt.executeUpdate();
			System.out.println("Deletion Successful");
			
		}catch(SQLException e) {
			e.printStackTrace();
		}
		
		return anime;
	}
	
}

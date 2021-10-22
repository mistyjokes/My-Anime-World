package com.skillstorm.beans;

public class Anime {
	
	private int id;
	private String name;
	private String creator;
	private String mediaType;
	private int numOfEpisodes;
	private int rating;
	private String hasWatched;
	private String studioName;
	private String icompleted; //JSON reads it as icompleted instead of iCompleted
	
	public Anime() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Anime(int id, String name, String creator, String mediaType, int numOfEpisodes, int rating, String hasWatched, 
			String studioName, String icompleted) {
		super();
		this.id = id;
		this.name = name;
		this.creator = creator;
		this.mediaType = mediaType;
		this.numOfEpisodes = numOfEpisodes;
		this.rating = rating;
		this.hasWatched = hasWatched;
		this.studioName = studioName;
		this.icompleted = icompleted;
	}

	public Anime(String name, String creator, String mediaType, int numOfEpisodes, int rating, String hasWatched,
			String studioName, String icompleted) {
		super();
		this.name = name;
		this.creator = creator;
		this.mediaType = mediaType;
		this.numOfEpisodes = numOfEpisodes;
		this.rating = rating;
		this.hasWatched = hasWatched;
		this.studioName = studioName;
		this.icompleted = icompleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getMediaType() {
		return mediaType;
	}

	public void setMediaType(String mediaType) {
		this.mediaType = mediaType;
	}

	public int getNumOfEpisodes() {
		return numOfEpisodes;
	}

	public void setNumOfEpisodes(int numOfEpisodes) {
		this.numOfEpisodes = numOfEpisodes;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getHasWatched() {
		return hasWatched;
	}

	public void setHasWatched(String hasWatched) {
		this.hasWatched = hasWatched;
	}

	public String getStudioName() {
		return studioName;
	}

	public void setStudioName(String studioName) {
		this.studioName = studioName;
	}

	public String getICompleted() {
		return icompleted;
	}

	public void setICompleted(String icompleted) {
		this.icompleted = icompleted;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((creator == null) ? 0 : creator.hashCode());
		result = prime * result + ((hasWatched == null) ? 0 : hasWatched.hashCode());
		result = prime * result + ((icompleted == null) ? 0 : icompleted.hashCode());
		result = prime * result + id;
		result = prime * result + ((mediaType == null) ? 0 : mediaType.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + numOfEpisodes;
		result = prime * result + rating;
		result = prime * result + ((studioName == null) ? 0 : studioName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Anime other = (Anime) obj;
		if (creator == null) {
			if (other.creator != null)
				return false;
		} else if (!creator.equals(other.creator))
			return false;
		if (hasWatched == null) {
			if (other.hasWatched != null)
				return false;
		} else if (!hasWatched.equals(other.hasWatched))
			return false;
		if (icompleted == null) {
			if (other.icompleted != null)
				return false;
		} else if (!icompleted.equals(other.icompleted))
			return false;
		if (id != other.id)
			return false;
		if (mediaType == null) {
			if (other.mediaType != null)
				return false;
		} else if (!mediaType.equals(other.mediaType))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (numOfEpisodes != other.numOfEpisodes)
			return false;
		if (rating != other.rating)
			return false;
		if (studioName == null) {
			if (other.studioName != null)
				return false;
		} else if (!studioName.equals(other.studioName))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Anime [id=" + id + ", name=" + name + ", creator=" + creator + ", mediaType=" + mediaType
				+ ", numOfEpisodes=" + numOfEpisodes + ", rating=" + rating + ", hasWatched=" + hasWatched
				+ ", studioName=" + studioName + ", I Completed=" + icompleted + "]";
	}

}

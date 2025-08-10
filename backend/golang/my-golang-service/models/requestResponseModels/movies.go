package requestResponseModels

type MoviePayload struct {
	ID int `json:"id"`
	Name        string `json:"name"`
	Language    string `json:"language"`
	ImageURL    string `json:"image_url"`
	Description string `json:"description"`
	ReleaseDate string `json:"release_date"`
}
type MovieDetailPayload struct{
	ID int `json:"id"`
	Name        string `json:"name"`
	Language    string `json:"language"`
	ImageURL    string `json:"image_url"`
	Description string `json:"description"`
	Rating string `json:"rating"`
	Genre string `json:"genre"`
	Duration string `json:"duration"`
	Release_year string `json:"release_year"`
}

type MovieDetailByIdPayload struct{
	ID int `json:"id"`
}


// MovieInfo represents the structure of the movie information JSON
type MovieInfo struct {
	Images struct {
		Poster map[string]struct {
			Medium struct {
				Width     int    `json:"width"`
				Height    int    `json:"height"`
				FilmImage string `json:"film_image"`
			} `json:"medium"`
			Region           string `json:"region"`
			ImageOrientation string `json:"image_orientation"`
		} `json:"poster"`
	} `json:"images"`
	FilmID    int    `json:"film_id"`
	IMDbID    int    `json:"imdb_id"`
	Language  string `json:"language"`
	Duration string `json:"duration"`
	AgeRating []struct {
		Rating         string `json:"rating"`
		AgeAdvisory    string `json:"age_advisory"`
		AgeRatingImage string `json:"age_rating_image"`
	} `json:"age_rating"`
	FilmTrailer  *string           `json:"film_trailer"` // Pointer to allow null values
	OtherTitles  map[string]string `json:"other_titles"`
	Genre string `json:"genre"`
	IMDbTitleID  string            `json:"imdb_title_id"`
	ReleaseDates []struct {
		Notes       string `json:"notes"`
		ReleaseDate string `json:"release_date"`
	} `json:"release_dates"`
	SynopsisLong string `json:"synopsis_long"`
}
type MovieRequestPayload struct {
	Language     string `json:"language"`
	SearchString string `json:"search_string"`
}


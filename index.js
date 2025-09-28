const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movies.model");

app.use(express.json());

initializeDatabase();
/*
const newMovie = {
  title: "New Movie",
  releaseYear: 2023,
  genre: ["Drama"],
  director: "Aditya Roy Chopra",
  actors: ["Actor1", "Actor2"],
  language: "Hindi",
  country: "India",
  rating: 6.1,
  plot: "A young man and woman fall in love on a Australia trip.",
  awards: "IFA Filmfare Awards",
  posterUrl: "https://example.com/new-poster1.jpg",
  trailerUrl: "https://example.com/new-trailer1.mp4"
};
*/

async function createMovie(newMovie) {
  try {
    const movie = new Movie(newMovie);
    const saveMovie = await movie.save();
   return saveMovie;
  } catch (error) {
    throw error;
  }
}
//BE4.2_CW
app.post("/movies",async(req,res)=>{
    try{
const savedMovie = await createMovie(req.body);
res.status(201).json({message:"Movie Added Successfully.", movie: savedMovie})
    }
    catch(error){
        res.status(500).json({error:"Failed to add movie"})
    }
})
// -----------------------------
// Find a movie by Title
async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    return movie;
  } catch (error) {
    throw error;
  }
}

app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await readMovieByTitle(req.params.title);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie NOT found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// -----------------------------
// Get all Movies
async function readAllMovie() {
  try {
    const allMovies = await Movie.find();
    return allMovies;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.get("/movies", async (req, res) => {
  try {
    const movies = await readAllMovie();
    if (movies.length > 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "No Movies Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

// -----------------------------
// Find by Director
async function readAllByDirector(directorName) {
  try {
    const movies = await Movie.find({ director: directorName });
    return movies;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.get("/movies/director/:directorName", async (req, res) => {
  try {
    const movies = await readAllByDirector(req.params.directorName);
    if (movies.length > 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "Movie NOT found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});


// -----------------------------
// Update by Title
async function updateMovieDetail(movieTitle, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { title: movieTitle },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedMovie);
    return updatedMovie;
  } catch (error) {
    console.log("Error in changing data", error);
    throw error;
  }
}

// -----------------------------
// Delete by ID
async function deleteMovieById(movieId) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    console.log("Deleted movie:", deletedMovie);
    return deletedMovie;
  } catch (error) {
    console.log("Error in deleting movie", error);
    throw error;
  }
}

// -----------------------------
// Delete by Title
async function deleteMovieByTitle(movieTitle) {
  try {
    const deletedMovie = await Movie.findOneAndDelete({ title: movieTitle });
    console.log("This movie is deleted:", deletedMovie);
    return deletedMovie;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// -----------------------------
// Find by Genre
async function readMovieByGenre(genreName) {
  try {
    const movies = await Movie.find({ genre: genreName });
    return movies;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.get("/movies/genres/:genreName", async (req, res) => {
  try {
    const movies = await readMovieByGenre(req.params.genreName);
    if (movies.length > 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "No movies found for this genre" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});


//BE4.3_CW

// Delete function
// Delete function
async function deleteMovie(movieId) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    return deletedMovie;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// DELETE route
app.delete("/movies/:movieId", async (req, res) => {
  try {
    const deletedMovie = await deleteMovie(req.params.movieId);
    if (deletedMovie) {
      res.status(200).json({ message: "Movie deleted successfully", movie: deletedMovie });
     
    }
    else{ return res.status(404).json({ error: "Movie not found" });}
  } catch (error) {
    res.status(500).json({ error: "Failed to delete movie" });
  }
});


//BE4.4_CW
//Any existing movie we update data
// Update by ID
// Function to update movie
async function updateMovie(movieId, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      dataToUpdate,
      { new: true } // return updated document
    );
    console.log(updatedMovie);
    return updatedMovie;
  } catch (error) {
    console.log("Error in updating Movie", error);
    throw error;
  }
}

// Route to update movie
app.post("/movies/:movieId", async (req, res) => {
  try {
    const updatedMovie = await updateMovie(req.params.movieId, req.body);
    if (updatedMovie) {
      res.status(200).json({ 
        message: "Movie updated successfully"
      , updatedMovie: updatedMovie});
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update movie" });
  }
});

// -----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

export const getNowPlayingMovies = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            },
            timeout: 5000
        });

        const movies = data.results;
        res.json({ success: true, movies });
    } catch (error) {
        console.error("TMDB API Error:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch now playing movies" });
    }
};

export const addShow = async (req, res) => {
    try {
        const { movieId, showsInput, showPrice } = req.body;

        const numericPrice = Number(showPrice);
        if (isNaN(numericPrice)) {
            return res.status(400).json({ success: false, message: "Invalid show price." });
        }

        let movie = await Movie.findById(movieId);

        if (!movie) {
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
                }),
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
                })
            ]);

            const movieApiData = movieDetailsResponse.data;
            const movieCreditsData = movieCreditsResponse.data;

            const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline || "",
                vote_average: movieApiData.vote_average?.toString(),
                runtime: movieApiData.runtime?.toString(),
                genres: movieApiData.genres?.map(g => g.name) || [],
                casts: movieCreditsData.cast?.slice(0, 5).map(c => c.name) || []
            };

            movie = await Movie.create(movieDetails);
        }

        const showsToCreate = [];
        showsInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach(time => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice: numericPrice,
                    occupiedSeats: {}
                });
            });
        });

        if (showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate);
        }

        res.json({ success: true, message: "Show Added Successfully." });
        res.status(200).json({ message: "Movie fetched", movie: movieData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

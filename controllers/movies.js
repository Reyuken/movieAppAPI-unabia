const Movie = require("../models/Movies");
const { errorHandler } = require("../auth");

module.exports.addMovie = (req, res) => {
    const newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre
    });

    newMovie.save()
        .then(result => res.status(201).send(result))
        .catch(err => errorHandler(err, req, res));
};

module.exports.getAllMovies = (req, res) => {
    Movie.find({})
        .then(result => res.status(200).send(result))
        .catch(err => errorHandler(err, req, res));
};

module.exports.getMovie = (req, res) => {
    return Movie.findById(req.params.movieId)
        .then(result => {
            if (!result) {
                return res.status(404).send({ message: "Movie not found." });
            }

            return res.status(200).send(result);
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.updateMovie = (req, res) => {
    return Movie.findByIdAndUpdate(
        req.params.movieId,
        {
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            description: req.body.description,
            genre: req.body.genre
        },
        {
            new: true
        }
    )
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    error: "Movie not found"
                });
            }

            return res.status(200).send({
                success: true,
                message: "Movie updated successfully"
            });
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.deleteMovie = (req, res) => {
    return Movie.findByIdAndDelete(req.params.movieId)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    error: "Movie not found"
                });
            }

            return res.status(200).send({
                success: true,
                message: "Movie deleted successfully"
            });
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.addMovieComment = (req, res) => {
    return Movie.findById(req.params.movieId)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({ message: "Movie not found" });
            }

            const newComment = {
                comment: req.body.comment
            };

            movie.comments.push(newComment);

            return movie.save()
                .then(updatedMovie =>
                    res.status(201).send({
                        success: true,
                        message: "Comment added successfully",
                        movie: updatedMovie
                    })
                );
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.getMovieComments = (req, res) => {
    return Movie.findById(req.params.movieId)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({ message: "Movie not found" });
            }

            return res.status(200).send(movie.comments);
        })
        .catch(err => errorHandler(err, req, res));
};
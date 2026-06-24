const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movies");
const { verify, verifyAdmin } = require("../auth");

router.post("/", verify, verifyAdmin, movieController.addMovie);
router.get("/all", movieController.getAllMovies);
router.get("/:movieId", verify, movieController.getMovie);
router.patch("/:movieId/update", verify, verifyAdmin, movieController.updateMovie);
router.delete("/:movieId/delete", verify, verifyAdmin, movieController.deleteMovie);

router.post("/:movieId/comments", verify, movieController.addMovieComment);
router.get("/:movieId/comments", verify, movieController.getMovieComments);

module.exports = router;
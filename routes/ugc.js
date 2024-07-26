import express from "express";
import RatingHandler from '../controller/ugc/rating';

const router = express.Router();

router.get('/v2/restaurants/:restaurant_id/ratings', RatingHandler.getRatings)
router.get('/v2/restaurants/:restaurant_id/ratings/scores', RatingHandler.getScores)
router.get('/v2/restaurants/:restaurant_id/ratings/tags', RatingHandler.getTags)

export default router;

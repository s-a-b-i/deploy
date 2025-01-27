import express from "express";
import {
    createFavourite,
  getFavouriteById,
  updateFavourite,
  deleteFavourite,
} from "../../controllers/advertiser/favourite.controller.js";

const router = express.Router();

// Favourite Routes
router.post("/favourites", createFavourite);
router.get("/favourites/:favouriteId", getFavouriteById);
router.put("/favourites/:favouriteId", updateFavourite);
router.delete("/favourites/:favouriteId", deleteFavourite);


export default router;
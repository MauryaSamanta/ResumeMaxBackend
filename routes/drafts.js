import express from "express";
import Drafts from "../models/Drafts.js";
const router = express.Router();

router.post ('/save', async (req, res) => {
    const { name, textboxes, shapes, icons, creator_id } = req.body;
   // const creator_id = req.user._id; // Assuming you're using authentication middleware to set `req.user`
   console.log(req.body);
    if (!name) {
      return res.status(400).json({ error: "Draft name is required." });
    }
  
    try {
      const newDraft = new Drafts({
        name,
        creator_id,
        textboxes: textboxes || [],
        shapes: shapes || [],
        icons: icons || [],
      });
  
      const savedDraft = await newDraft.save();
      res.status(201).json({ message: "Draft created successfully.", draft: savedDraft });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create draft. Please try again later." });
    }
  });
  
  // Get all drafts by creator_id
  router.post('/getdrafts', async (req, res) => {
    const {creator_id} = req.body; // Assuming you're using authentication middleware to set `req.user`
  
    try {
      const drafts = await Drafts.find({ creator_id });
      if (drafts.length === 0) {
        return res.status(404).json({ message: "No drafts found for this user." });
      }
      res.status(200).json({ drafts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch drafts. Please try again later." });
    }
  });

  export default router;
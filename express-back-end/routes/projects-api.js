const express = require("express");
const router = express.Router();
const projectQueries = require("../db/queries/projects");
const itemQueries = require("../db/queries/items");

// GET api/projects/:id
// get all project info for a specific project by id
router.get("/:id", async (req, res) => {
  try {
    // Extract the project ID from the request parameters.
    const projectId = req.params.id;

    // Retrieve the project's details from the database based on the project ID.
    const project = await projectQueries.getProjectDetails(projectId);

    // Check if the project was found. If not, send a 404 Not Found response.
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Retrieve all items associated with the project.
    let projectItems = await itemQueries.getItemsByProjectId(projectId);

    // Send a JSON response containing the project details and associated items.
    res.json({ project, items: projectItems });
  } catch (err) {
    // If an error occurs in the try block, catch it and send a 500 Internal Server Error response.
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require("express")
const router = express.Router()

// POST /api/sections
router.post("/", async (req, res) => {
  try {
    const { cvData } = req.body

    if (!cvData) {
      return res.status(400).json({ error: "CV data is required" })
    }

    // Extract sections from CV data structure
    const sections = []

    function extractSections(obj, parentKey = "") {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key]

          // Check if this looks like a section (has title property)
          if (typeof value === "object" && value !== null && value.title) {
            sections.push(value.title)
          }

          // Recursively check nested objects
          if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            extractSections(value, key)
          }
        }
      }
    }

    extractSections(cvData)

    // Remove duplicates and sort
    const uniqueSections = [...new Set(sections)].sort()

    res.json({
      sections: uniqueSections,
      totalSections: uniqueSections.length,
    })
  } catch (error) {
    console.error("Error extracting sections:", error)
    res.status(500).json({ error: "Failed to extract sections" })
  }
})

module.exports = router
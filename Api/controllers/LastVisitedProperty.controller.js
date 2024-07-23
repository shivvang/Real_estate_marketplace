import LastVisitedProperty from "../models/LastVisitedProperty.model.js";

export const logVisited = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    // Find the existing visited property for the user and property
    const existingVisitedProperty = await LastVisitedProperty.findOneAndUpdate(
      { userId, propertyId },
      { visitedAt: new Date() }, // Update the visitedAt timestamp
      { new: true, upsert: true } // Create a new record if it doesn't exist
    );

    res.json({ success: true, visitedProperty: existingVisitedProperty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const visitedProperties = async (req, res) => {
  try {
    const visitedProperties = await LastVisitedProperty.find({
      userId: req.params.userId,
    })
      .populate("propertyId")
      .sort({ visitedAt: -1 })
      .limit(5);
    res.json({ success: true, visitedProperties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import ContactLog from "../models/ContactLog.model.js";
export const logContact = async (req, res) => {
  try {
    const { userId, propertyId, message, senderName, senderEmail } = req.body;

    // Find an existing contact log
    let contactLog = await ContactLog.findOne({ userId, propertyId });

    if (contactLog) {
      // Update the existing contact log with the new message
      contactLog.message = message;
      contactLog.senderName = senderName;
      contactLog.senderEmail = senderEmail;
      contactLog.contactedAt = Date.now(); // Update the timestamp

      await contactLog.save();
    } else {
      // Create a new contact log if none exists
      contactLog = new ContactLog({
        userId,
        propertyId,
        message,
        senderName,
        senderEmail,
      });

      await contactLog.save();
    }

    res.json({ success: true, contactLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContactLogs = async (req, res) => {
  try {
    const contactLogs = await ContactLog.find({ userId: req.params.userId })
      .populate("propertyId")
      .sort({ contactedAt: -1 });
    res.json({ success: true, contactLogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

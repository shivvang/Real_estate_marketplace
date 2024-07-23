import mongoose from "mongoose";

const contactLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyListing",
    required: true,
  },
  message: { type: String, required: true },
  senderEmail: { type: String, required: true },
  senderName: { type: String, required: true },
  contactedAt: { type: Date, default: Date.now },
});

const ContactLog = mongoose.model("ContactLog", contactLogSchema);

export default ContactLog;

import mongoose from "mongoose";
const TextBoxSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  text: { type: String, default: "New Text" },
  page: { type: Number, required: true },
  font: { type: String, default: "Times New Roman" },
  color: { type: String, default: "black" },
  style: { type: String, default: "normal" },
  fontSize: { type: Number, default: 14 },
  fontWeight: { type: String, default: "normal" },
  fontStyle: { type: String, default: "normal" },
  textDecoration: { type: String, default: "none" },
  textAlign: { type: String, default: "left" },
});

const ShapeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  type: { type: String, required: true, enum: ["circle", "line", "rectangle"] }, // Example types
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  color: { type: String, default: "black" },
});

const IconSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  type: { type: String, required: true, enum: ["GitHub", "Phone", "Email", "Facebook", "YouTube", "Instagram", "WhatsApp", "LinkedIn", "Twitter"] },
  color: { type: String, default: "black" },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, default: 30 },
  height: { type: Number, default: 30 },
});

const DraftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creator_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    textboxes: [TextBoxSchema],
    shapes: [ShapeSchema],
    icons: [IconSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Draft", DraftSchema);



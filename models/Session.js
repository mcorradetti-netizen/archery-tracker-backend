import mongoose from "mongoose";

const volleySchema = new mongoose.Schema(
  {
    // exactly 3 arrow scores (0-10, can be 0 for miss)
    arrows: { type: [Number], default: [null, null, null] },
    total: { type: Number, default: 0 },
    hits: {
      // optional: store tap coordinates for each arrow for later rendering
      type: [
        {
          x: Number, // 0..1 normalized within SVG viewBox
          y: Number,  // 0..1 normalized within SVG viewBox
          isX: Boolean
        }
      ],
      default: []
    }
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    date: { type: Date, required: true },
    kind: { type: String, enum: ["Allenamento", "Competizione"], required: true },
    targetType: { type: String, enum: ["Trispot", "40cm", "60cm", "120cm"], required: true },
    environment: { type: String, enum: ["Indoor", "Outdoor"], required: true },
    distance: { type: Number, enum: [18, 25, 30, 50, 70, 90], required: true },

    // 20 volleys total = 2 ends/groups × 10 volleys
    volleys: { type: [volleySchema], default: () => Array.from({ length: 20 }, () => ({})) }
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);

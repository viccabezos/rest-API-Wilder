import mongoose from "mongoose";

const Schema = mongoose.Schema;
interface Iwilder {
  name: string;
  city: string;
  description: string;
  skills: string[];
}
const WilderSchema = new Schema<Iwilder>(
  {
    name: {
      required: [true, "le nom est requis!"],
    },
    city: { required: [true, "la ville est requise"] },
    description: {},
    skills: [
      {
        title: String,
        votes: Number,
      },
    ],
  },
  { versionKey: false }
);

export default mongoose.model("wilder", WilderSchema);

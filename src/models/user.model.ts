import { Schema, model, Document } from "mongoose";

// 1️⃣ Define the TypeScript interface for your user
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
  };
}

// 2️⃣ Create the Mongoose schema
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], // ✅ restricts values
      default: "user",
    },
    socialLinks: {
      website: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt automatically
  }
);

// 3️⃣ Create and export the model
export const UserModel = model<IUser>("User", UserSchema);

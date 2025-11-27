import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Якщо username не вказано — ставимо email
userSchema.pre("save", function (next) {
  if (!this.username) {
    this.username = this.email;
  }
  next();
});

// В методі toJSON видаляємо пароль перед відправкою
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model("User", userSchema);

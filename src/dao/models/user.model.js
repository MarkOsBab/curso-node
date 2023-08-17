import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: "user",
        emun: ['user', 'admin', 'premium']
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre("save", function(next) {
    if(!this.created_at) {
        this.created_at = new Date().toISOString();
    }
    next();
});

const userModel = mongoose.model(userCollection, userSchema);

export { userModel };
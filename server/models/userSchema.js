const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        // required: true,
      },
    },
  ],
  shipments: [
    {
      id: String,
      date: String,
      status: String,
      quantity: Number,
    },
  ],
});


userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});


userSchema.methods.generateAuthToken = async function (){
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    if (!Array.isArray(this.tokens)) {
      this.tokens = [];
    }

    if (this.tokens.length >= 5) {
      this.tokens.shift();
    }

    this.tokens.push({ token });
    await this.save();

    return token;
  } catch (error) {
    console.error('Error generating auth token:', error);
    throw error;
  }
};

const User = mongoose.model('USER', userSchema);
module.exports= User;

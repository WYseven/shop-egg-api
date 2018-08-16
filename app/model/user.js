'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String},
    update_at: { type: Date, default: Date.now },
    create_at: { type: Date, default: Date.now },
  });


  UserSchema.pre('save', function (next) {
    const now = new Date();
    this.update_at = now;
    next();
  });

  return mongoose.model('User', UserSchema);
};
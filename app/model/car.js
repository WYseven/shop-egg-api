'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;  // mongoose内置的一种数据类型

  const CarSchema = new Schema({
    sku_id: { type: String},
    buy_number: { type: Number },
    user_id: {
      type: ObjectId,
      ref: 'User'
    },
    account: {type: Boolean,default: false},
    update_at: { type: Date, default: Date.now },
    create_at: { type: Date, default: Date.now },
  });


  CarSchema.pre('save', function (next) {
    const now = new Date();
    this.update_at = now;
    next();
  });

  return mongoose.model('Car', CarSchema);
};
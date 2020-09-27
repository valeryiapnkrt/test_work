const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactShema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", index: true },
  name: { type: String, required: true},
  phone: { type: String},
  eMale: {type: String },
}, {
  timestamps: true,
  versionKey: false,
});

/**
 *
 * @param {String} user - user id
 * @param name
 * @param phone
 * @param eMale
 * @returns {any}
 */
ContactShema.statics.add = function(user, name, phone, eMale) {
  return this.create({ user, name, phone, eMale });
};


/**
 *
 * @param {String} user - user id
 */
ContactShema.statics.getByUserId = function(user) {
  return this.find({ user });
}


module.exports = mongoose.model('Contact', ContactShema)
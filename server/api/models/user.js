const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const {Schema} = mongoose;

const UserSchema = new Schema(
  {
    login: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.add = async function(login, password) {
  return this.create({ login, password});
};
/**
 * Метод для хэширования пароля, вызывается при каждом сохранении User
 * Проверяется изменен ли пароль, или это новый User, и наличие пароля
 * перезаписывает вместо пароля его хэш и сохраняет в User
 */
UserSchema.pre("save", async function (next) {
  if ((this.isModified("password") || this.isNew) && this.password !== null) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
/**
 * Возвращает результат проверки переданного пароля с тем, что записан в виде хэша в модели
 * @param {string} password - пароль
 * @returns {Boolean} true | false
 */
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);

const response = require('../utils/response');
const models = require('../models');

const User = {
	async getContacts(req, res) {
		const user = req.user._id
		const contacts = await models.Contact.getByUserId(user)
		response.success(res, { contacts });
	},
	async addContact(req, res) {
		try {
			const { name, phone, eMale } = req.body;
			if (req.body.name === '' || req.body.phone === '' || req.body.eMale === '') {
				return response.error(res, "Не переданы данные.");
			}
			const user = req.user._id
			await models.Contact.add(user, name, phone, eMale );
			response.message(res, "Контакт добавлен.");
		} catch (err) {
			response.error(res, err.message);
		}
	},

	/**
	 * Изменение контакта
	 * @param req.body._id - id пользователя
	 */
	async saveContact(req, res) {
		try {
			await models.Contact.findByIdAndUpdate(req.params.id,
				{name: req.body.name, phone: req.body.phone, eMale: req.body.eMale});
			response.message(res, "Контакт изменен.");
		} catch (err) {
			response.error(res, err.message);
		}
	},
	async deleteContact(req, res) {
		try {
			await models.Contact.deleteOne({ _id: req.params.id });
			response.message(res, "Контакт удален.");
		} catch (err) {
			response.error(res, err.message);
		}
	}
};

module.exports = User;

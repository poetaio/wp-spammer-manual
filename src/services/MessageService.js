const {Message} = require("../models/models");
const {ApiError} = require("../error");

class MessageService {
    async create(name, subject, text) {
        const { messageId } = await Message.create({ name, subject, text });
        return messageId;
    }

    async update(messageId, name, subject, text) {
        const [updCount] = await Message.update({ name, subject, text }, { where: { messageId } });
        return !!updCount;
    }

    async getOneById(messageId) {
        return await Message.findOne({ where: { messageId } });
    }

    async delete(messageId) {
        return await Message.destroy({ where: { messageId } });
    }

    async getAllPaginated(page, offset) {
        return await Message.findAndCountAll({ page, offset })
    }

    async getAll() {
        return await Message.findAll()
    }
}

module.exports = new MessageService();

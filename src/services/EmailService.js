const {Email} = require("../models/models");
const {ApiError} = require("../error");

class EmailService {
    // creates new email
    async create(email, firstName, secondName, lastName) {
        if (await this.existsByEmail(email)) {
            throw ApiError.badRequest(`Email ${email} already exists`);
        }
        return await Email.create({email, firstName, secondName, lastName});
    }

    async getAll(limit, offset) {
        return await Email.findAndCountAll({ limit, offset, raw: true});
    }

    async getOneById(emailId) {
        return await Email.findOne({ where: { emailId } });
    }

    async existsByEmail(email) {
        return !!await Email.count({ where: { email } });
    }

    async getOneByEmail(email) {
        return await Email.findOne({ where: { email } });
    }

    async update(emailId, email, firstName, secondName, lastName) {
        const updatingEmail = await Email.findOne({ where: { emailId } });
        updatingEmail.set({
            email, firstName, secondName, lastName
        });
        await updatingEmail.save();
        return updatingEmail;
    }

    async delete(emailId) {
        const email = await Email.findOne({ where: { emailId } });
        if (email) {
            await email.destroy();
        }
    }
}

module.exports = new EmailService();

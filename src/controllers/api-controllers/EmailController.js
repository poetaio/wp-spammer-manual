const ApiError = require("../../error/ApiError");
const emailService = require('../../services/EmailService');
const {spamService} = require("../../services");
const {httpStatusCodes} = require("../../utils");

class EmailController {
    async getAll(req, res, next) {
        try {
            let {limit, page} = req.query;
            limit = Number.parseInt(limit) || 10;
            page = Number.parseInt(page) || 1;
            const offset = limit * (page - 1);

            const emails = await emailService.getAll(limit, offset);

            return res.status(200).json(emails);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { emailId } = req.params;
            const email = await emailService.getOneById(emailId);
            return res.status(httpStatusCodes.OK).json(email);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async create(req, res, next) {
        try {
            const {email, firstName, secondName, lastName} = req.body;

            if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
                return next(ApiError.badRequest("Email is invalid"));

            if (!firstName)
                return next(ApiError.badRequest("First name is invalid"));

            if (!secondName)
                return next(ApiError.badRequest("Second name is invalid"));

            if (!lastName)
                return next(ApiError.badRequest("Last name is invalid"));

            if (await emailService.getOneByEmail(email))
                return next(ApiError.badRequest("Email already in database"));

            const newEmail = await emailService.create(email, firstName, secondName, lastName);

            return res.status(200).json(newEmail);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {emailId} = req.params;

            const {email, firstName, secondName, lastName} = req.body;

            if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
                return next(ApiError.badRequest("Email is invalid"));

            if (!firstName)
                return next(ApiError.badRequest("First name is invalid"));

            if (!secondName)
                return next(ApiError.badRequest("Second name is invalid"));

            if (!lastName)
                return next(ApiError.badRequest("Last name is invalid"));

            if (!await emailService.getOneById(emailId))
                return next(ApiError.badRequest("No email with such id"));

            const updatedEmail = await emailService.update(emailId, email, firstName, secondName, lastName);

            res.status(200).json(updatedEmail);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { emailId } = req.params;
            await emailService.delete(emailId);
            return res.status(200).end();
        } catch (e) {
            next(e);
        }
    }

    async sendSpam(req, res, next) {
        try {
            const { subject, text } = req.body;
            await spamService.spam(subject, text);

            res.status(200).end();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new EmailController();

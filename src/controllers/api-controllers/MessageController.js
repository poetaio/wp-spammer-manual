const ApiError = require("../../error/ApiError");
const {messageService} = require("../../services");
const {httpStatusCodes} = require("../../utils");

class MessageController {
    async getAllPaginated(req, res, next) {
        try {
            let {limit, page} = req.query;
            limit = Number.parseInt(limit) || 10;
            page = Number.parseInt(page) || 1;
            const offset = limit * (page - 1);
            const messages = await messageService.getAllPaginated(page, offset);

            return res.status(httpStatusCodes.OK).json(messages);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const messages = await messageService.getAll();

            return res.status(httpStatusCodes.OK).json(messages);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const { messageId } = req.params;
            const message = await messageService.getOneById(messageId)
            return res.status(httpStatusCodes.OK).json(message)
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const { name, subject, text } = req.body;

            if (!name) {
                return next(ApiError.badRequest(`Name is invalid: "${name}"`));
            }

            if (!text) {
                return next(ApiError.badRequest(`Text is invalid: "${text}"`));
            }

            if (!subject) {
                return next(ApiError.badRequest(`Subject is invalid: "${subject}"`));
            }

            const messageId = await messageService.create(name, subject, text);
            return res.status(httpStatusCodes.OK).json({ messageId });
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { name, subject, text } = req.body;
            const { messageId } = req.params;

            if (!name) {
                return next(ApiError.badRequest(`Name is invalid: "${name}"`));
            }

            if (!text) {
                return next(ApiError.badRequest(`Text is invalid: "${text}"`));
            }

            if (!subject) {
                return next(ApiError.badRequest(`Subject is invalid: "${subject}"`));
            }

            const updated = await messageService.update(messageId, name, subject, text);
            return res.status(httpStatusCodes.OK).json({updated});
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { messageId } = req.params;

            const deleted = await messageService.delete(messageId);
            return res.status(httpStatusCodes.OK).json(deleted);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new MessageController();

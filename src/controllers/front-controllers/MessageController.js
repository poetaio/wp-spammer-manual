const {ApiError} = require("../../error");
const {httpStatusCodes} = require("../../utils");
const {messageService} = require("../../services");
const emailService = require("../../services/EmailService");

class MessageController {
    async messages(req, res, next) {
        try {
            let {page} = req.query;
            if (!page || page <= 0)
                page = 1;

            const limit = 10;

            const messages = await messageService.getAllPaginated(limit, (page-1) * limit);

            res.render('messages', {
                messages: messages.rows,
                currentPage: Number.parseInt(page),
                lastPage: Math.ceil(messages.count / limit)
            });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new MessageController;
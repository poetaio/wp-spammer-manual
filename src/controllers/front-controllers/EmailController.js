const ApiError = require("../../error/ApiError");
const emailService = require('../../services/EmailService');
const {messageService} = require("../../services");

class EmailController {
    async home(req, res, next) {
        try {
            let {page} = req.query;
            if (!page || page <= 0)
                page = 1;

            const limit = 10;

            const emails = await emailService.getAll(limit, (page-1) * limit);
            const messages = await messageService.getAll();

            res.render('home', {
                emails: emails.rows,
                messages,
                currentPage: Number.parseInt(page),
                lastPage: Math.ceil(emails.count / limit)
            });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new EmailController();
const API_PROTOCOL = "http";
const API_HOST = "localhost";
const API_PORT = "8882";
const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`;


const api = axios.create({
    baseURL: API_URL,
    // timeout: 3000,
    // headers: {'X-Custom-Header': 'foobar'}
});

const spamApi = axios.create({
    baseURL: API_URL,
    // timeout: 5000
});

// document.getElementById('add_email_button').addEventListener('click', function () {
//     console.log("HELERE");
//     console.log($('').focus());
//     // .trigger('focus')
//   })

window.onload = () => {
    const reloadSuccess = sessionStorage.getItem("reloadSuccess");
    if (reloadSuccess) {
        sessionStorage.removeItem("reloadSuccess");
        const reloadMessage = sessionStorage.getItem("reloadMessage");
        sessionStorage.removeItem("reloadMessage");
        promptSuccess(reloadMessage);
    }
};

const addEmail = async (e) => {
    const email = $('.emails__add_modal__email');
    const firstName = $('.emails__add_modal__first_name');
    const secondName = $('.emails__add_modal__second_name');
    const lastName = $('.emails__add_modal__last_name');
    try {
        await api.post('/api/email', {
            email: email.val(),
            firstName: firstName.val(),
            secondName: secondName.val(),
            lastName: lastName.val(),
        })

        $('#emails__add_modal').modal('hide');
        email.val("");
        firstName.val("");
        secondName.val("");
        lastName.val("");
        sessionStorage.setItem("reloadSuccess", true);
        sessionStorage.setItem("reloadMessage", "Email added successfuly");
        location.reload();
    } catch (err) {
        if (!err.response) {
            promptError(err.message);
            return;
        }

        const status = err.response.status;
        if (status === 400)
            promptError(err.response.data.message);
        else if (err.response?.data?.message)
            promptError(`${status}: ${err.response.data.message}`);
        else
            promptError("Something went wrong");
    }
};

let editEmailId;

const toggleEditEmail = async (emailId) => {
    const { data: { email, firstName, secondName, lastName } } = await api.get(`/api/email/${emailId}`);
    editEmailId = emailId;
    $('.emails__edit_modal__email').val(email);
    $('.emails__edit_modal__first_name').val(firstName);
    $('.emails__edit_modal__second_name').val(secondName);
    $('.emails__edit_modal__last_name').val(lastName);
    $('#emails__edit_modal').modal('show');
}

const editEmail = () => {
    api.put(`/api/email/${editEmailId}`, {
        email: $('.emails__edit_modal__email').val(),
        firstName: $('.emails__edit_modal__first_name').val(),
        secondName: $('.emails__edit_modal__second_name').val(),
        lastName: $('.emails__edit_modal__last_name').val(),
    }).then((res) => {
        $('#emails__edit_modal').modal('hide');
        sessionStorage.setItem("reloadSuccess", true);
        sessionStorage.setItem("reloadMessage", "Email updated successfuly");
        location.reload();
    }).catch((err) => {
        if (!err.response) {
            promptError(err.message);
            return;
        }

        const status = err.response.status;
        if (status === 400)
            promptError(err?.response?.data?.message);
        else if (err.response?.data?.message)
            promptError(`${status}: ${err.response.data.message}`);
        else
            promptError("Something went wrong");
    });
};

const deleteEmail = (e, emailId) => {
    e.stopPropagation();
    api.delete(`/api/email/${emailId}`)
        .then((res) => {
            sessionStorage.setItem("reloadSuccess", true);
            sessionStorage.setItem("reloadMessage", "Email deleted successfuly");
            location.reload();
        }).catch((err) => {
            promptError(err.message)
        });
}

const promptError = (errorMessage) => promptMessage(errorMessage, "error");
const promptSuccess = (errorMessage) => promptMessage(errorMessage, "success");

const promptMessage = (errorMessage, messageType) => {
    const errorElId = uuidv4();
    const newErrEl = $(`<div id=${errorElId} class=\"alert prompt_message prompt_message--above_modal\" role=\"alert\"></div>`);
    newErrEl.text(errorMessage);
    $('body').append(newErrEl);
    switch (messageType) {
        case "error":
            newErrEl.addClass("alert-danger");
            break;
        case "success":
            newErrEl.addClass("alert-success");
            break;
        default: 
            newErrEl.addClass("alert-info");
    }

    $('.prompt_message').each(function (i, oldErrEl) {
        if (i != $('.prompt_message').length - 1)
            $(oldErrEl).css('marginTop', Number.parseInt($(oldErrEl).css('marginTop')) + newErrEl.outerHeight() + 15);
    });

    setTimeout(() => $(`#${errorElId}`).remove(), 2000);
}

let messages;

const spam = () => {
    const subject = $('.emails__spam_modal__subject').val();
    const text = $('.emails__spam_modal__text').val();
    spamApi.post('/api/email/send-spam', { subject, text })
        .then((res) => {
            promptSuccess("Spam sent!!")
        }).catch((err) => {
            if (err?.response?.data?.message)
                promptError(`Could not send spam: ${err.response.data.message}!!`)
            else
                promptError(`Could not send spam!!`)
    });
}

const toggleSpamModal = async () => {
    // const { data: {name, text} } = await api.get(`/api/message/${messageId}`);
    if (!messages) {
        messages = {};
        const { data: reqMessages } = await api.get(`/api/message/all`);
        for (let { messageId, ...messageInfo} of reqMessages) {
            messages[messageId] = messageInfo;
        }
    }
    $('#emails__spam_modal').modal('show');
    onMessageSelected()
}

const onMessageSelected = (e) => {
    const messageId = $('.emails__spam_modal_name').val();
    $('.emails__spam_modal__text').val(messages[messageId].text)
    $('.emails__spam_modal__subject').val(messages[messageId].subject)
}

const addMessage = async (e) => {
    const name = $('.emails__add_modal__name');
    const text = $('.emails__add_modal__text');
    const subject = $('.emails__add_modal__subject');
    try {
        await api.post('/api/message', {
            name: name.val(),
            text: text.val(),
            subject: subject.val(),
        })

        $('#messages__add_modal').modal('hide');
        name.val("");
        text.val("");
        subject.val("");
        sessionStorage.setItem("reloadSuccess", true);
        sessionStorage.setItem("reloadMessage", "Message added successfuly");
        location.reload();
    } catch (err) {
        if (!err.response) {
            promptError(err.message);
            return;
        }

        const status = err.response.status;
        if (status === 400)
            promptError(err.response.data.message);
        else if (err.response?.data?.message)
            promptError(`${status}: ${err.response.data.message}`);
        else
            promptError("Something went wrong");
    }
};

let editMessageId;

const toggleEditMessage = async (e, messageId) => {
    const { data: {name, subject, text} } = await api.get(`/api/message/${messageId}`);
    editMessageId = messageId;
    $('.emails__edit_modal__name').val(name);
    $('.emails__edit_modal__subject').val(subject);
    $('.emails__edit_modal__text').val(text);
    $('#messages__edit_modal').modal('show');
}

const editMessage = () => {
    api.put(`/api/message/${editMessageId}`, {
        name: $('.emails__edit_modal__name').val(),
        subject: $('.emails__edit_modal__subject').val(),
        text: $('.emails__edit_modal__text').val(),
    }).then((res) => {
        $('#messages__edit_modal').modal('hide');
        sessionStorage.setItem("reloadSuccess", true);
        sessionStorage.setItem("reloadMessage", "Message updated successfuly");
        location.reload();
    }).catch((err) => {
        if (!err.response) {
            promptError(err.message);
            return;
        }

        const status = err.response.status;
        if (status === 400)
            promptError(err?.response?.data?.message);
        else if (err.response?.data?.message)
            promptError(`${status}: ${err.response.data.message}`);
        else
            promptError("Something went wrong");
    });
}

const deleteMessage = (e, messageId) => {
    e.stopPropagation();
    api.delete(`/api/message/${messageId}`)
        .then((res) => {
            sessionStorage.setItem("reloadSuccess", true);
            sessionStorage.setItem("reloadMessage", "Message deleted successfuly");
            location.reload();
        }).catch((err) => {
        promptError(err.message)
    });
}


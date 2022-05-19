const promptSuccess = (message) => {

}

const promptError = (errorMessage) => {
    const errorElId = uuidv4();
    let newErrEl = $(`<div id=${errorElId} class=\"alert alert-danger error_message error_message--above_modal\" role=\"alert\"></div>`);
    newErrEl.text(errorMessage);
    $('body').append(newErrEl);

    $('.error_message').each(function (i, oldErrEl) {
        if (i != $('.error_message').length - 1)
            $(oldErrEl).css('marginTop', Number.parseInt($(oldErrEl).css('marginTop')) + newErrEl.outerHeight() + 15);
    });

    setTimeout(() => $(`#${errorElId}`).remove(), 2000);
}

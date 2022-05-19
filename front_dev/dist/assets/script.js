// document.getElementById('add_email_button').addEventListener('click', function () {
//     console.log("HELERE");
//     console.log($('').focus());
//     // .trigger('focus')
//   })


const addEmail = async (e) => {
  const email = $('.emails__add_modal__email').val();
  const firstName = $('.emails__add_modal__first_name').val();
  const secondName = $('.emails__add_modal__second_name').val();
  const lastName = $('.emails__add_modal__last_name').val();
  try {
    api.post('/api/email', { email, firstName, secondName, lastName });

    $('#emails__add_modal').modal('hide');
    $('.emails__add_modal__email').val("");
    $('.emails__add_modal__first_name').val("");
    $('.emails__add_modal__second_name').val("");
    $('.emails__add_modal__last_name').val("");
    location.reload();
  } catch (err) {
    if (!err.response)
      promptError(err.message);

    const status = err.response.status;
    if (status === 400) {
      promptError(err.response.data.message);
    } else {
      promptError("Something went wrong");
    }
  }
};

document.getElementsByClassName('emails__add_modal_button')[0]
  .addEventListener('click', async (e) => await addEmail(e));


const API_PROTOCOL = "http";
const API_HOST = "localhost";
const API_PORT = "8882";
const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`;


const api = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });


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

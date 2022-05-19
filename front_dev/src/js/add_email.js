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


let submit = document.getElementById('submit')
console.log(submit)
const formName = 'autismSupportServices'
console.log('form: ' + formName)
let newForm = {}

let caregiverName = document.querySelector('input#caregiverName')
caregiverName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.caregiverName = e.target.value;
  console.log(newForm.caregiverName);
  })
  
let providerName = document.querySelector('input#providerName')
providerName.addEventListener('change', (e) => {
	newForm.providerName = e.target.value;
  console.log(newForm.providerName);
})

let caregiverSignature = document.querySelector('input#caregiverSignature')
caregiverSignature.addEventListener('change', (e) => {
	newForm.caregiverSignature = e.target.value;
  console.log(newForm.caregiverSignature);
})

let providerSignature = document.querySelector('input#providerSignature')
providerSignature.addEventListener('change', (e) => {
	newForm.providerSignature = e.target.value;
  console.log(newForm.providerSignature);
})

let date = document.querySelector('input#date')
date.addEventListener('change', (e) => {
	newForm.date = e.target.value;
  console.log(newForm.date);
})

let providerDate = document.querySelector('input#providerDate')
providerDate.addEventListener('change', (e) => {
	newForm.providerDate = e.target.value;
  console.log(newForm.providerDate);
})
  
document.getElementById('submit').addEventListener("click", async (event) => {
  submitForm(newForm, formName)
 // message =
 // removeNotice(newForm.clientName, )
})

async function submitForm(data, form) {
  const document = {
    'form': form,
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/form', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}


function showSuccess() {
    document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}

async function removeNotice(name, message) {
  const url = 'https://pffm.azurewebsites.net/notices'
  let data = {
    clientName: name,
    notice: message
  }
  fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response != 500 || response != 403) {
        console.log('deleted', sessionStorage.getItem('userName'))
      }
      //location.href = 'https://phoenix-freedom-foundation-backend.webflow.io/client-portal'
    })
    .catch(console.error)
}

const printToPdf = document.getElementById('printToPDF');
printToPdf.addEventListener('click', (e) => {
  sessionStorage.setItem('signer', newForm.caregiverName);
  location.href = 'https://phoenix-freedom-foundation-backend.webflow.io/complete-forms/autism-support-services-service-agreement-form'
})

let submit = document.getElementById('submit')
console.log(submit)
const formName = 'autismSupportServices'
console.log('form: ' + formName)
let newForm = {}

let caregiverName = document.querySelector('input#name')
caregiverName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.caregiverName = e.target.value;
  console.log(newForm.caregiverName);
  })
 
document.getElementById('submit').addEventListener("click", async (event) => {
  submitForm(newForm, formName)
 // message =
 // removeNotice(newForm.clientName, )
})

const printToPdf = document.getElementById('printToPDF');
printToPDF.style.display= 'none'

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
    .then(response => response.json())
    .then(data => respond(data)) 
    .catch((err) => showError(err))
}

function respond(data) {
  let id = data.key
  if (id) {
    showSuccess(id) 
  } else {
    showError(data.error)
  }
}

function showSuccess(id) {
  document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
  
  sendNotification(id, 'admin',  'individual', 'not urgent')
  printForm.style.display = 'inline';
  printForm.addEventListener('click', (e) => {
  console.log(id)
  location.href = `https://phoenix-freedom-foundation-backend.webflow.io/completed-forms/service-agreement?key=${id}`
  })
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
  location.href = 'https://phoenix-freedom-foundation-backend.webflow.io/completed-forms/autism-support-services-service-agreement-form'
})

async function sendNotification(id, recipient, type, priority) {
  let message = `You have a new <br/><a href=phoenix-freedom-foundation-backend.webflow.io/completed-forms/release-of-liability-form?id=${id}>Release of Liability</a> was submitted`
  console.log(message)
  const url = 'https://pffm.azurewebsites.net/notices'
  let notification = {
    'name': recipient,
    'notice': message,
    'type': type,
    'priority': priority
  }
  const header = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
  }
  
  fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(notification)
  })
    .then(() => console.log('notice sent'))
    .catch(console.error)
}


const room = window.location.pathname.replace(/\//g,'')
const socket = io(`http://localhost:3000/${room}`)

let user = null

socket.on('update_messages',(messages)=>{

  updateMenssagesOnScreen(messages)

})

function updateMenssagesOnScreen(messages){
  const div_menssages = document.querySelector('#messages')

  var list_menssages = '<ul>'
  messages.forEach(message=>{
    list_menssages +=`<li>${message.user}: ${message.msg}</li>`
  })
  list_menssages+='</ul>'

  div_menssages.innerHTML = list_menssages
}

document.addEventListener('DOMContentLoaded',()=>{
  const form  = document.querySelector('#message_form')
  form.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(!user){
      alert('Defina um usuario')
      return
    }
    const message = document.forms['message_form_name']['msg'].value
    document.forms['message_form_name']['msg'].value = ''
    socket.emit('new_menssage',{user:user,msg:message})
    console.log(message)
  })

  const UserForm  = document.querySelector('#user_form')
    UserForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    user = document.forms['user_form_name']['user'].value
    UserForm.parentNode.removeChild(UserForm)
  })
})
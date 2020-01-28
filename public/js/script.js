let socket = io()

let form = document.querySelector('#share')
let shares = document.querySelectorAll('.share-item')
let messages = document.querySelector('.messages')

if (form) { 
  form.addEventListener('input', function(){
    socket.emit('change-share-content-to-backend', {
      content: this.content.value,
      title: this.title.value,
      id: this.attributes['shareId'].value
    })
  });

  socket.on('share-content-change-to-frontend', ({content, title, id}) => {
    if (id == form.attributes['shareId'].value) {
      form.content.value = content
      form.title.value = title
    }
  })
}

const xhr = new XMLHttpRequest()

shares.forEach(function(share) {
  share.querySelector('button').addEventListener('click', function(){
    if (!confirm('Are you sure you want to delete this item?')) return;

    xhr.open('DELETE', `/shares/${share.id}`, true)
    xhr.onload = function() {
      
      const data = JSON.parse(xhr.responseText)
      const messageContainer = document.createElement('p')
      const message = document.createElement('span')
      const closeBtn = document.createElement('button')

      closeBtn.addEventListener('click', function() {
        messages.classList.add('hidden')
      })
      
      message.innerHTML = data.message
      closeBtn.innerHTML = "&times;"
      closeBtn.classList.add('close')

      messageContainer.appendChild(message)
      messageContainer.appendChild(closeBtn)

      messageContainer.classList.add(data.success ? 'success' : 'error')

      messages.classList.add('mb-1')
      messages.appendChild(messageContainer)
    }
    xhr.send()
    share.classList.replace('share-item', 'hidden')
  })
})

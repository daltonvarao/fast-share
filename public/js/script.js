let socket = io()

let form = document.querySelector('#share')

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

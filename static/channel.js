document.addEventListener('DOMContentLoaded', () => {

  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, configure buttons
  socket.on('connect', () => {

    // Each button should emit a "submit vote" event
    document.querySelectorAll('button').forEach(button => {
      button.onclick = () => {
        const selection = button.dataset.vote;
        socket.emit('submit vote', {'selection': selection});
      };
    });

    // Chatroom submit button functionality
    document.querySelector('#submit_input').onclick = () => {
      const li = document.createElement('li');
      li.innerHTML = document.querySelector('#input').value;
      document.querySelector('#chatroom').append(li);
      document.querySelector('#input').value = '';
      return false;
    }
  });

  // When a new vote is announced, add to the unordered list
  socket.on('announce vote', data => {
    const li = document.createElement('li');
    li.innerHTML = `Vote recorded: ${data.selection}`;
    document.querySelector('#votes').append(li);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const channel_name = document.getElementById('channel_name').innerHTML;
  const username = document.getElementById('username').innerHTML;

  // By default, submit button is disabled
  document.querySelector('#submit_input').disabled = true;

  // Enable button only if there is text in the input field
  document.querySelector('#input').oninput = () => {
    console.log('key up');
    if (document.querySelector('#input').value.length > 0)
      document.querySelector('#submit_input').disabled = false;
    else
      document.querySelector('#submit_input').disabled = true;
  };

  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, configure submit button
  socket.on('connect', () => {

    document.querySelector('#submit_input').onclick = () => {
      const message = document.querySelector('#input').value;
      document.querySelector('#input').value = '';

      // Reformat time-stamp, the date is calculated in milliseconds since Jan. 1,
      // 1970 (UNIX time)
      const date = new Date();
      const date_ms = date.getTime();

      socket.emit('submit message', { 'channel_name': channel_name, 'date': date_ms, 'message': message, 'username': username });
      return false;
    };
  });

  // When a new message is announced, place message string in <span> tags and 
  // append it to the #chatroom <div>
  socket.on('announce message' + ':' + channel_name, new_message => {
    const br = document.createElement('br');
    const span = document.createElement('span');
    span.innerHTML = `[${new_message.date}] ${new_message.username}: ${new_message.message}`;
    document.querySelector('#chatroom').append(span);
    document.querySelector('#chatroom').append(br);
  });
});

// https://jsfiddle.net/taditdash/hDtA3/
function AvoidSpace(event) {
  var k = event ? event.which : window.event.keyCode;
  if (k == 32) return false;
};
document.addEventListener('DOMContentLoaded', () => {

  // By default, submit button is disabled
  document.querySelector('#submit').disabled = true;

  // Enable button only if there is text in the input field
  document.querySelector('#username').oninput = () => {
    if (document.querySelector('#username').value.length > 0)
      document.querySelector('#submit').disabled = false;
    else
      document.querySelector('#submit').disabled = true;
  };
});

// https://jsfiddle.net/taditdash/hDtA3/
function AvoidSpace(event) {
  var k = event ? event.which : window.event.keyCode;
  if (k == 32) return false;
};
'use strict';

$(document).ready(init);

function init() {
  // $('#register').click(regClicked);
  $('#save').click(saveClicked);
}

function saveClicked() {
  
  $.post('/users/edit/profile')
    .done(function(data){
      console.log('/users/logout success',data);
      //var $msg = $('<p>').text('Login successful');
      // do something cuz it's successful
      window.location.replace('/users/login');
    })
    .fail(function(data){
      console.log(data);
      //$('#errLogin').text(data.responseText);
      //window.location.replace('/');
    });
}
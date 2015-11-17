'use strict';

$(document).ready(init);

function init() {
  // $('#register').click(regClicked);
  $('#logout').click(logoutClicked);
}

function logoutClicked() {
  console.log('logout clicked');
  $.post('/users/logout')
    .done(function(data){
      console.log('/users/logout success',data);
      //var $msg = $('<p>').text('Login successful');
      // do something cuz it's successful
      window.location.replace('/');
    })
    .fail(function(data){
      console.log(data);
      //$('#errLogin').text(data.responseText);
      //window.location.replace('/');
    });
}
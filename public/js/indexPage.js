'use strict';

$(document).ready(init);

function init() {
  $('#register').click(regClicked);
  $('#login').click(loginClicked);
}

function loginClicked() {
  $('.err').empty();
  var err = '';
  var perfect = true;
  if ($('#userL').val()==='') {
    err += 'user name cannot be empty.\n';
    perfect = false;
  }
  if ($('#passL').val()==='') {
    err += 'password cannot be empty.\n';
    perfect = false;
  }

  if (perfect) {
    var obj = {};
    obj.username = $('#userL').val();
    obj.password = $('#passL').val();
    $.post('/users/login', obj)
    .done(function(data){
      console.log('/users/login success',data);
      var $msg = $('<p>').text('Login successful');
      // do something cuz it's successful
      window.location.replace('/users/login');
    })
    .fail(function(error){
      console.log(error);
      $('#errLogin').text(error.responseText);
    });
  }
  else {
    $('#errLogin').text(err);
  }
}

function regClicked() {
  $('.err').empty();
  var err = '';
  var perfect = true;
  if ($('#userR').val()==='') {
    err += 'user name cannot be empty.\n';
    perfect = false;
  }
  if ($('#passR').val()==='') {
    err += 'password cannot be empty.\n';
    perfect = false;
  }
  if ($('#rePassR').val()==='') {
    err += 'reentered password cannot be empty.\n';
    perfect = false;
  }
  if ($('#rePassR').val()!==$('#passR').val()) {
    err += "passwords don't match.\n";
    perfect = false;
  }

  if (perfect) {
    var obj = {};
    obj.username = $('#userR').val();
    obj.password = $('#passR').val();
    $.post('/users/register', obj)
    .done(function(data){
      console.log(data);
      $('#err').text('Register successful. Please log in.');
      // do something cuz it's successful
      $('#userR').val('');
      $('#passR').val('');
      $('#rePassR').val('');
      //$('.register tbody').append($msg);
    })
    .fail(function(error){
      console.log(error);
      $('#err').text(error.responseText);
    });
  }
  else {
    $('#err').text(err);
  }
}
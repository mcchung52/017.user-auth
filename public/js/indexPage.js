'use strict';

$(document).ready(init);

function init() {
  $('#register').click(regClicked);
  $('#login').click(loginClicked);
}

function loginClicked() {
  $('#errLogin').empty();
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
      console.log(data);
      var $msg = $('<p>').text('Login successful');
      // do something cuz it's successful
    })
    .fail(function(data){
      console.log(data);
      $('#errLogin').text(data.responseText);
    });
  }
  else {
    $('#errLogin').text(err);
  }
}

function regClicked() {
  $('#err').empty();
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
      var $msg = $('<p>').text('Register successful');
      // do something cuz it's successful
    })
    .fail(function(data){
      console.log(data);
      $('#err').text(data.responseText);
    });
  }
  else {
    $('#err').text(err);
  }
}
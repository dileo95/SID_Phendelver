//import $ from "jquery";

var $die = $('.die'),
    sides = 20,
    initialSide = 1,
    lastFace,
    timeoutId,
    transitionDuration = 500, 
    animationDuration  = 3000

$('ul > li > a').click(function () {
  reset()
  rollTo($(this).attr('href'))
  
  return false
})

$('#modifier').val(0);

function randomFace() {
  var face = Math.floor((Math.random() * sides)) + initialSide
  lastFace = face == lastFace ? randomFace() : face
  if (face == 1) {
    $('.information').text('Fallimento critico!!!');
  } else if (face == 20) {
    $('.information').text('Successo critico!!!');
  } else {
    let value = face
    let modifier = $('#modifier').val();
    if (modifier) {
        value += parseInt(modifier);
    } 
    if (value >10) {
        $('.information').text('Complimenti per il tuo '+ value + "!");
    } else {
        $('.information').text('Complimenti per il tuo '+ value + "! No dai sherzo!");
    }
  }
  return face;
}

function rollTo(face) {
  clearTimeout(timeoutId)
  
  $('ul > li > a').removeClass('active')
  $('[href=' + face + ']').addClass('active')
  
  $die.attr('data-face', face)
}

function reset() {
  $die.attr('data-face', null).removeClass('rolling')
}

$('.randomize, .die').click(function () {
$('.information').text('');
  $die.addClass('rolling')
  clearTimeout(timeoutId)
  
  timeoutId = setTimeout(function () {
    $die.removeClass('rolling')
    
    rollTo(randomFace())
  }, animationDuration)
  
  return false
})
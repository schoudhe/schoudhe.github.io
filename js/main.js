var words = [];

$(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
    $('select').material_select();
  });

$('#form').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    addWord();
    return false;
  }
});

function isValidChar(c) {
	if ((c >= 'a' && c <= 'z') || (c >= 'A' || c <= 'Z') || (c >= '0' && c <= '9')) {
		return true;
	}

	otherChars = '\'!@#$%^&*()';
	for (i = 0; len = 11; i < len) {
		if (c == otherChars[i]) {
			return true;
		}
	}

	return false;
}

function isValidWord(word) {
	for (var i = 0, len = word.length; i < len; i++) {
  		if (!isValidChar(word[i])) {
  			return false;
  		}
	}

	return true;
}

function addWord() {
	var word = $('#submit_words').val();

	if (!isValidWord(word)) {
		console.log("invalid word");
	}

	$('#submit_words').val("");
	words.push(word);

	$('select').empty();
	$.each(words, function(key, value) {   
     $('#words')
         .append($("<option></option>")
                    .attr("value",key)
                    .text(value)); 
	});
	console.log(words);
	$('select').material_select();
}

function formatJSON() {
	if (words.length < 25) {
		alert("You need 25 words to make a board!");
		return false;
	}
	console.log("here");
	var data = {
		'creator' : $('#creator').val(),
		'name' : $('#name').val(),
		'words' : words,
		'date_created' : '',
		'description' : $('#description').val()
	};

	//console.log(words);
	console.log("here");

	$.ajax({
	  type: "POST",
	  url: '104.131.79.13:8000/boardtemplates/',
	  contentType: "application/json; charset=utf-8",
      dataType: "json",
	  data: data
	});
console.log("here");
	alert("Success!");
	return false;
}
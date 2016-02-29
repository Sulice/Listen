preload = null;
currentSearch = null;
searchValue = "";

function loadSong(url) {
	$('#navigation').css('display','flex');
	$('#navigation').css('display','-webkit-flex');
	$('.playing').removeClass('playing');

	var song = $('#player')[0];
	song.src = url;

	pauseplay();
	$('.track').each(function(){
		if($(this).attr('data-src') == url) {
			$(this).addClass('playing');
			if($('.playing').next().length != 0) {
				$('#next').removeClass('not-active');
			} else {
				$('#next').addClass('not-active');
			}
			if($('.playing').prev().length != 0) {
				$('#prev').removeClass('not-active');
			} else {
				$('#prev').addClass('not-active');
			}
		}
	});

}

function rainbow(t) {
	t.className = 'red';
	setTimeout(function(){ t.className = 'blue'; }, 200);
	setTimeout(function(){ t.className = 'green'; }, 400);
	setTimeout(function(){ t.className = 'black'; }, 600);
}

function random() {
	rainbow($('#random')[0]);
	$('#results').html('<i id="loading" class="fa fa-cog"></i>');
	$.get('random.php?'+(new Date()).getTime(), function(data) {
		$('#results').html('');
		$('#search').val(data[0]);
		for(i=1;i<data.length;i++) {
			$('#results').append(buildTrack(data[i]));
		}
		$('#next').addClass('not-active');
		$('#prev').addClass('not-active');
	});
}

function pauseplay() {
	var song = $('#player')[0];
	if(song.paused) {
		song.play();
		$('#pauseplay i').removeClass('fa-play');
		$('#pauseplay i').addClass('fa-pause');
	} else {
		song.pause();
		$('#pauseplay i').removeClass('fa-pause');
		$('#pauseplay i').addClass('fa-play');
	}

}

function previousSong() {
	var prev = $('.playing').prev();
	if(prev.length != 0) {
		loadSong(prev.attr('data-src'));
	} else {
		console.log("start of playlist");
	}
}

function nextSong() {
	var next = $('.playing').next();
	if(next.length != 0) {
		loadSong(next.attr('data-src'));
	} else {
		console.log("end of playlist");
	}
}

function timeUpdate() {
	var song = $('#player')[0];
	var playPercent = 100 * (song.currentTime / song.duration);
	var loadPercent = 100 * (song.buffered.end(0) / song.duration);
	$('#timeline').css('width', playPercent+'%');
	$('#loadline').css('width', loadPercent+'%');
	if(playPercent >= 100) {
		console.log("song finished...");
		nextSong();
	}
}

function update() {

	var song = $('#player')[0];
	
	// update loadline
	if(song != null && song.buffered.length > 0) {
		var loadPercent = 100 * (song.buffered.end(0) / song.duration);
		$('#loadline').css('width', loadPercent+'%');
	}

	// update timeline
	if(song != null && song.buffered.length > 0) {
		var playPercent = 100 * (song.currentTime / song.duration);
		$('#timeline').css('width', playPercent+'%');
	}

	// load next song if ended
	if(song != null && song.ended) {
		console.log("song finished...");
		nextSong();
	}

}

function buildTrack(data) {
	var artist = data.replace(/^.*DATA\/([^\/]*)\/.*/,"$1");
	var album = data.replace(/.*\/([^\/]*)\/.*$/,"$1");
	var title = data.replace(/.*\/(.*)$/,"$1").replace(/\.\w+$/,'');
	var src = data;
	
	var output = '<div class="track" onclick="loadSong(\''+src+'\')" data-src="'+src+'"><div class="artist">'+artist+' ['+album+'] '+'</div><div class="title">'+title+'</div></div>'

	return output;
}

function search() {
	if(currentSearch != null) {
		currentSearch.abort();
		currentSearch = null;
	}
	rainbow($('#submit')[0]);
	s = $('#search').val();
	$('#results').html('<i id="loading" class="fa fa-cog"></i>');
	currentSearch = $.get('search.php?s='+s, function(data) {
		$('#results').html('');
		for(i=0;i<data.length;i++) {
			$('#results').append(buildTrack(data[i]));
		}
		$('#next').addClass('not-active');
		$('#prev').addClass('not-active');
	});
}

$(window).ready(function(){
	// start fastclick
	$(function() {
	    FastClick.attach(document.body);
	});
	// wait for a search
	//$('#search').on('change',function(){
	//	search();
	//});
	$('#search').on('keyup',function(e){
		if(e.keyCode == 13) {
			$('#search').blur();
			search();
		} else {
			if( (e.keyCode > 47 && e.keyCode < 91) || (e.keyCode > 95 && e.keyCode < 112) ) {
				searchValue = $('#search').val();
				setTimeout(function(){
					console.log(searchValue,",", $('#search').val());
					if(searchValue == $('#search').val()) {
						search();
					}
				}, 250);
			}
		}
	});
	setInterval(update, 1000);
});

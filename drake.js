function setPreviewUrl(artistName, title) {
  $.ajax({ 
    type: 'GET',
    url: 'https://itunes.apple.com/search',
    data: {term: artistName + " " + title, format: 'jsonp'},
    dataType: 'jsonp', 
    success: function(data) {
      audio.src = data.results[0].previewUrl;
    }
  });
}

$(document).ready(function() {
  var tempo = 134.963;

  $.ajax({ 
    type: 'GET',
    url: 'http://developer.echonest.com/api/v4/song/search',
    data: {results: 100, song_min_hotttnesss: 0.4, min_tempo: tempo, max_tempo: tempo, api_key: 'G9NEVKUK91NLLSSAH', format: 'jsonp'},
    dataType: 'jsonp', 
    success: function(data) {
      var i = Math.floor(Math.random() * data.response.songs.length);
      var song = data.response.songs[i];
      var artist_name = song.artist_name;
      var title = song.title;
      setPreviewUrl(artist_name, title);

      var waitingInterval = setInterval(function() {
        if (video.readyState == 4 && audio.readyState == 4) {
          play();
          clearInterval(waitingInterval);
        }
      }, 500);
    }
  });
});

function rewind() {
  video.volume = 0;
  video.currentTime = start;
  audio.currentTime = 0;
  video.play();
  audio.play();
}

function play() {
  rewind();

  setInterval(function() {
    rewind();
  }, duration * 1000);
}

var duration = 30;

var min = 21;
var max = 289 - duration;

var start = Math.floor(Math.random() * (max - min + 1)) + min;

"use strict"

require(
  ['$api/models',
  '$views/buttons#PlayButton',
  '$views/image#Image'],
  function(models, PlayButton, Image) {
    var showPlaylist = function (playlist) {
      var list = document.getElementById("playlist");
      list.innerHTML = "";

      playlist.tracks.snapshot().done(function (snapshot) {
        for (var i = 0; i < snapshot.length; ++i) {
          var track = snapshot.get(i),
            li = document.createElement("li"),
            image = Image.forTrack(track);

          image.setPlayer(true);
          image.setSize(120, 120);
          image.setOverlay("", track.name);

          li.appendChild(image.node);
          list.appendChild(li);
        }
      });
    };

  models.application.addEventListener('dropped', function() {
   var dropped = models.application.dropped[0]; // it contains the dropped elements
   models.Playlist.fromURI(dropped.uri).load("tracks").done(showPlaylist);
  });



});

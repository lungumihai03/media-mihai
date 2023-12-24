function progressBar() {
    var e = document.getElementById("logomusic")
      , t = Math.round(e.currentTime);
    if (logobar.getContext) {
        var n = logobar.getContext("2d");
        n.clearRect(0, 0, logobar.clientWidth, logobar.clientHeight),
        n.fillStyle = "#aec9e4";
        var o = t / e.duration * logobar.clientWidth;
        o > 0 && n.fillRect(0, 0, o, logobar.clientHeight)
    }
}
function playAudio() {
    try {
        var e = document.getElementById("logomusic")
          , t = document.getElementById("play");
        e.paused ? (e.play(),
        t.className = "pause") : (e.pause(),
        t.className = "play")
    } catch (n) {
        window.console && console.error("Error:" + n)
    }
}
function unmute() {
    try {
        var e = document.getElementById("logomusic")
          , t = document.getElementById("pMute");
        1 == e.muted ? (e.muted = !1,
        t.className = "unmute") : (e.muted = !0,
        t.className = "mute")
    } catch (n) {
        window.console && console.error("Error:" + n)
    }
}
function initEvents() {
    var e = document.getElementById("logobar")
      , t = document.getElementById("logomusic");
    t.addEventListener("playing", function() {
        document.getElementById("play").className = "pause"
    }, !0),
    t.addEventListener("pause", function() {
        document.getElementById("play").className = "play"
    }, !0),
    t.addEventListener("timeupdate", progressBar, !0),
    e.addEventListener("click", function(e) {
        var t = document.getElementById("logomusic")
          , n = document.getElementById("logobar");
        e || (e = window.event);
        try {
            t.currentTime = t.duration * (e.offsetX / n.clientWidth)
        } catch (o) {
            window.console && console.error("Error:" + o)
        }
    }, !0)
}
window.addEventListener("DOMContentLoaded", initEvents, !1);

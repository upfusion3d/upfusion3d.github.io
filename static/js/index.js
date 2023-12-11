window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

    var co3dMap = {
      "co3d-relsf": "RelSF",
      "co3d-upsrt": "UpSRT",
      "co3d-up2d": "UpFusion2D",
      "co3d-up3d": "UpFusion3D",
      "co3d-gt": "GT",
    }

    var gsoMap = {
      "gso-z123s": "Z123_SJC",
      "gso-z123t": "Z123_TS",
      "gso-12345": "O2345",
      "gso-up3d1v": "UpFusion_1V",
      "gso-forge": "FORGE_6V",
      "gso-gt": "GT",
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    let dropdown = document.querySelector('#co3d-dropdown');
    dropdown.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdown.classList.toggle('is-active');
    });

    let dropdown2 = document.querySelector('#gso-dropdown');
    dropdown2.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdown2.classList.toggle('is-active');
    });

    $(".dropdown-item.co3d-methods").click(function () {

      let targetID = $(this).attr("id");
      let curID = $(".dropdown-item.co3d-methods.is-active").attr("id");

      for (let i = 1; i < 8; i++){
        let i_str = String(i);
        let otherVideo = $("#co3d-other-" + i_str)[0];
        let up3dVideo = $("#co3d-up3d-" + i_str)[0];

        let sourceElem = $($("#co3d-other-" + i_str).children()[0]);
        let vidSrc = sourceElem.attr("src");
        let newSrc = vidSrc.replace(co3dMap[curID], co3dMap[targetID]);
        sourceElem.attr("src", newSrc);

        otherVideo.load();
        up3dVideo.load();

        up3dVideo.currentTime = 0;
        otherVideo.currentTime = 0;

        up3dVideo.play();
        otherVideo.play();

      }

      // Highlighting the correct drop down item
      $(".dropdown-item.co3d-methods").removeClass("is-active");
      $(this).addClass("is-active");

      // Changing the display text
      let newText = $("#" + targetID).text();
      $("#co3d-other-title").text(newText);

    });

    $(".dropdown-item.gso-methods").click(function () {

      let targetID = $(this).attr("id");
      let curID = $(".dropdown-item.gso-methods.is-active").attr("id");

      for (let i = 1; i < 8; i++){
        let i_str = String(i);
        let otherVideo = $("#gso-other-" + i_str)[0];
        let up3dVideo = $("#gso-up3d-" + i_str)[0];

        let sourceElem = $($("#gso-other-" + i_str).children()[0]);
        let vidSrc = sourceElem.attr("src");
        let newSrc = vidSrc.replace(gsoMap[curID], gsoMap[targetID]);
        sourceElem.attr("src", newSrc);

        otherVideo.load();
        up3dVideo.load();

        up3dVideo.currentTime = 0;
        otherVideo.currentTime = 0;

        up3dVideo.play();
        otherVideo.play();

      }

      // Highlighting the correct drop down item
      $(".dropdown-item.gso-methods").removeClass("is-active");
      $(this).addClass("is-active");

      // Changing the display text
      let newText = $("#" + targetID).text();
      $("#gso-other-title").text(newText);

    });

})

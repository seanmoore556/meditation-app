// arrow function
const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  // (blue circle) getting the circle inside the svg because that is what we want to animate
  const outline = document.querySelector(".moving_outline circle");
  const video = document.querySelector(".vid_container video");

  // sounds
  // query selector "ALL" for all the songs because there are multiple
  const sounds = document.querySelectorAll(".sound_picker button");

  // time display
  // this is just the <h3>
  const time_display = document.querySelector(".time_display");
  const time_select = document.querySelectorAll(".time_select button");
  // get length of the outline (so it can be animated)
  const outline_length = outline.getTotalLength();

  // fake duration for music
  let fake_duration = 600;

  // animation for blue circle

  // want the circle to start at 0, so we use "strokeDasharray" and "strokeDashoffset" so we can animate those properties to make it seem like its animating in

  // strokeDasharray to select entire outline length (pixels)
  outline.style.strokeDasharray = outline_length;

  // strokeDashoffset, set to outline length to make it seem like its gone (pixels)
  outline.style.strokeDashoffset = outline_length;

  // pick different sounds (loop)
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data_sound");
      video.src = this.getAttribute("data_video");
      check_playing(song);
    });
  });

  // play sound

  // plays and pauses when clicked
  play.addEventListener("click", () => {
    check_playing(song);
  });

  // select sound function
  time_select.forEach((option) => {
    option.addEventListener("click", function () {
      // getting all 3 times we made so we can just update it in html
      fake_duration = this.getAttribute("data_time");
      // getting the time display so we can update it in html
      time_display.textContent = `${Math.floor(
        fake_duration / 60
      )}: ${Math.floor(fake_duration % 60)}`;
    });
  });

  // function to stop and play sounds
  const check_playing = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  // we can animate the circle when the song is playing or not playing

  // every time the song keeps going on its going to update and when it stops its going to stop updating
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fake_duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // circle animation (progress bar)
    let progress =
      outline_length - (currentTime / fake_duration) * outline_length;
    outline.style.strokeDashoffset = progress;

    // text animation (countdown)
    time_display.textContent = `${minutes}:${seconds}`;

    // stop animations when countdown finishes
    if (currentTime >= fake_duration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();

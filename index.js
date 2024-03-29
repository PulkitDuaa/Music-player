

const songsData = [
  {
    id: 2,
    name: "Apna_Bana_Le",
    artist: "Arijit_Singh",
    genre: "Love",
    source: "Media/songs/Apna_Bana_Le .mp3",
    image: "Media/albumArts/Apna Bana Le.jpg",
  },
  {
    id: 1,
    name: "Humari_Adhuri_Kahani",
    artist: "Arijit_Singh",
    genre: "Love",
    source: "Media/songs/Hamari_Adhuri_Kahani.mp3",
    image: "Media/albumArts/Humari adhuri kahani.jpg",
  },
  {
    id: 3,
    name: "Bad_Munda",
    artist: "Jass_Manak",
    genre: "Melody",
    source: "Media/songs/Bad_Munda.mp3",
    image: "Media/albumArts/Bad Munda.jpg",
  },
  {
    id: 4,
    name: "295",
    artist: "Sidhu Moose Wala",
    genre: "Melody",
    source: "Media/songs/295-Sidhu_Moose_Wala-(JattZone.com).mp3",
    image: "Media/albumArts/295.jpg",
  },
  {
    id: 5,
    name: "Mann_Bharya",
    artist: "B_Praak",
    genre: "Love",
    source: "Media/songs/Mann_Bharrya_2.mp3",
    image: "Media/albumArts/Mann Bharya.jpg",
  },
];
const playlistData = {};
let currentPlaylist = "";
const searchSubmitEle = document.getElementById("searchBox"),
  searchTextEle = document.getElementById("searchTextInput");
const songSearchResultEle = document.getElementById("songSearchResult");
searchSubmitEle.addEventListener("submit", (e) => {
  songSearchResultEle.innerHTML = "";
  const songSearchResulHeadingEle = document.createElement("span");
  songSearchResulHeadingEle.textContent = "Songs";
  songSearchResultEle.append(songSearchResulHeadingEle);
  const arr = findSong(searchTextEle.value);
  arr.forEach((val) => {
    songSearchResultEle.append(createBtn(val, "searchBarSong"));
  });
  if(arr.length===0){
    const notFound=document.createElement('h4')
    notFound.textContent='Sorry, No song is found with this name'
    songSearchResultEle.append(notFound)
  }
  const searchBarDividerEle = document.createElement("div");
  searchBarDividerEle.classList.add("searchBarDivider");
  songSearchResultEle.append(searchBarDividerEle);
  const playlistSearchResulHeadingEle = document.createElement("span");
  playlistSearchResulHeadingEle.textContent = "Playlists";
  songSearchResultEle.append(playlistSearchResulHeadingEle);
  const playlistArr = findPlaylist(searchTextEle.value);
  playlistArr.forEach((val) => {
    songSearchResultEle.append(createBtnPlaylist(val));
  });
  if(playlistArr.length===0){
    const notFound=document.createElement('h4')
    notFound.textContent='Sorry, No playlist is found with this name'
    songSearchResultEle.append(notFound)
  }
  e.preventDefault();
});
let genresArr = [];
songsData.forEach((val) => {
  if (!genresArr.includes(val.genre)) genresArr.push(val.genre);
});
const selectGenreEle = document.getElementById("selectGenre"),
  songListEle = document.getElementById("songList");
const songImageEle = document.getElementById("songImage"),
  songTitleEle = document.getElementById("songTitle"),
  songArtistEle = document.getElementById("songArtist"),
  songAudioEle = document.querySelector("audio");
genresArr.forEach((val) => {
  const opt = document.createElement("option");
  opt.textContent = val;
  selectGenreEle.append(opt);
});
songsData.forEach((val) => songListEle.append(createBtn(val.name)));
selectGenreEle.addEventListener("change", () => {
  songListEle.innerHTML = "";
  document.getElementById("allSongDivHeading").textContent =
    selectGenreEle.value;
  if (selectGenreEle.value !== "All Songs") {
    songsData.forEach((val) => {
      if (val.genre === selectGenreEle.value)
        songListEle.append(createBtn(val.name));
    });
  } else {
    songsData.forEach((val) => songListEle.append(createBtn(val.name)));
  }
});
document.getElementById("forward").addEventListener("click", () => {
  let val = songTitleEle.textContent;
  val = val.replaceAll(" ", "_");
  const idx = songsData.findIndex((value) => value.name === val);
  playSong(songsData[(idx + 1) % songsData.length]);
});
document.getElementById("backward").addEventListener("click", () => {
  let val = songTitleEle.textContent;
  val = val.replaceAll(" ", "_");
  const idx = songsData.findIndex((value) => value.name === val);
  playSong(songsData[(songsData.length + idx - 1) % songsData.length]);
});
document.getElementById("addPlaylist").addEventListener("click", () => {
  if (currentPlaylist !== "") {
    let val = songTitleEle.textContent;
    val = val.replaceAll(" ", "_");
    const obj = songsData.find((value) => value.name === val);
    if (!playlistData[currentPlaylist].includes(obj)) {
      playlistData[currentPlaylist].push(obj);
      currentPlaylistShow(currentPlaylist);
    } else {
      alert("Dear user, this song is already added in your selected playlist.");
    }
  } else {
    if(Object.keys(playlistData).length===0) {
      alert(
          "Dear user, please create a playlist first then tap on the created playlist to add songs in it.",
      );
    }
    else{
      alert(
          "Dear user, please tap on any of your playlist first to add songs in it.",
      );
    }
  }
});

function createBtn(val, str) {
  const btn = document.createElement("button");
  btn.textContent = dashReplace(val);
  btn.classList.add("songButton");
  btn.addEventListener("click", () => {
    val=val.replaceAll(' ','_')
    const obj = songsData.find((value) => value.name === val);
    playSong(obj);
  });
  if (str === "searchBarSong")
    btn.addEventListener("click", () => {
      songSearchResultEle.innerHTML = "";
      searchTextEle.value = "";
    });
  return btn;
}

function createBtnPlaylist(val) {
  const btn = document.createElement("button");
  btn.textContent = dashReplace(val);
  btn.classList.add("songButton");
  btn.addEventListener("click", () => {
    currentPlaylistShow(val);
    songSearchResultEle.innerHTML = "";
    searchTextEle.value = "";
  });
  return btn;
}

function dashReplace(val) {
  return val.replaceAll("_", " ");
}

songImageEle.src = songsData[0].image;
songTitleEle.textContent = dashReplace(songsData[0].name);
songArtistEle.textContent = dashReplace(songsData[0].artist);
songAudioEle.src = songsData[0].source;

function playSong(obj) {
  songImageEle.src = obj.image;
  songTitleEle.textContent = dashReplace(obj.name);
  songArtistEle.textContent = dashReplace(obj.artist);
  songAudioEle.src = obj.source;
  songAudioEle.autoplay = true;
}

function findSong(str) {
  let arr = [];
  songsData.forEach((val) => {
    const re = new RegExp(str, "i");
    if (dashReplace(val.name).search(re) !== -1) {
      arr.push(val.name);
    }
  });
  return arr;
}

function findPlaylist(str) {
  let arr = [];
  Object.keys(playlistData).forEach((val) => {
    const re = new RegExp(str, "i");
    if (dashReplace(val).search(re) !== -1) {
      arr.push(val);
    }
  });
  return arr;
}

document.getElementById("createPlaylist").addEventListener("submit", (e) => {
  let val = document.getElementById("createPlaylistTextInput").value;
  val = val.replaceAll(" ", "_");
  if (!playlistData.hasOwnProperty(val)) {
    playlistData[val] = [];
    renderPlaylist();
  }
  document.getElementById("createPlaylistTextInput").value = "";
  e.preventDefault();
});

function renderPlaylist() {
  const allPlaylistEle = document.getElementById("allPlaylist");
  allPlaylistEle.innerHTML = "";
  Object.keys(playlistData).forEach((val) => {
    const btn = document.createElement("button");
    btn.textContent = dashReplace(val);
    btn.classList.add("songButton");
    btn.addEventListener("click", () => {
      currentPlaylistShow(val);
    });
    allPlaylistEle.append(btn);
  });
}

function currentPlaylistShow(val) {
  currentPlaylist = val;
  if (currentPlaylist !== "") {
    const currentPlaylistNameEle = document.getElementById(
      "currentPlaylistName",
    );
    currentPlaylistNameEle.textContent = dashReplace(currentPlaylist);
    const currentPlaylistSongsEle = document.getElementById(
      "currentPlaylistSongs",
    );
    currentPlaylistSongsEle.innerHTML = "";
    playlistData[currentPlaylist].forEach((song) => {
      const currentPlaylistSongsDivEle = document.createElement("div");
      currentPlaylistSongsDivEle.classList.add("currentPlaylistSongsDiv");
      const removeEle = document.createElement("button");
      removeEle.classList.add("removeSong");
      removeEle.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
      currentPlaylistSongsDivEle.append(
        createBtn(dashReplace(song.name)),
        removeEle,
      );

      currentPlaylistSongsEle.append(currentPlaylistSongsDivEle);
      removeEle.addEventListener("click", () => {
        const ind = playlistData[currentPlaylist].findIndex(
          (str) => str === song,
        );
        playlistData[currentPlaylist].splice(ind, 1);
        currentPlaylistSongsDivEle.remove();
      });
    });
  }
}

const bodyEl = document.querySelector("body");
bodyEl.addEventListener("click", () => {
  songSearchResultEle.innerHTML = "";
});
let ifLight = true;
document.querySelector(".toggleSwitchLabel").addEventListener("change", () => {
  if (ifLight) {
    document.documentElement.className = "dark";
  } else {
    document.documentElement.className = "light";
  }
  ifLight = !ifLight;
});

//Check Connectivity
window.addEventListener("offline", function() {
  document.querySelector('.connected').textContent='Please connect to the internet for this website to work perfectly'
})
window.addEventListener("online", function() {
  document.querySelector('.connected').textContent=''
})

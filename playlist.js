document.addEventListener('DOMContentLoaded', () => {
  fetch('videos.json')
    .then(response => response.json())
    .then(data => {
      buildPlaylist(data);
    })
    .catch(error => console.error('Error loading video data:', error));
});

function buildPlaylist(categories) {
  const playlist = document.getElementById("playlist");
  let firstVideo = null;

  categories.forEach((category, idx) => {
    const catDiv = document.createElement("div");
    catDiv.className = "category " + (idx === 0 ? "open" : "");

    const titleDiv = document.createElement("div");
    titleDiv.className = "category-title";
    titleDiv.textContent = category.categoryName;
    titleDiv.addEventListener("click", () => {
      document.querySelectorAll(".category").forEach(c => c.classList.remove("open"));
      catDiv.classList.add("open");
    });

    const videosDiv = document.createElement("div");
    videosDiv.className = "category-videos";

    category.videos.forEach(video => {
      if (!firstVideo) firstVideo = video;
      const item = document.createElement("div");
      item.className = "video-item";
      item.dataset.url = video.url;
      item.innerHTML = `
        <img class="video-thumb" src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}" />
        <div class="video-info">
          <div class="video-title">${video.title}</div>
        </div>
      `;
      item.addEventListener("click", () => loadVideo(video, item));
      videosDiv.appendChild(item);
    });

    catDiv.append(titleDiv, videosDiv);
    playlist.appendChild(catDiv);
  });

  // Initial load
  if (firstVideo) {
    const firstEl = document.querySelector(".video-item");
    loadVideo(firstVideo, firstEl);
  }
}

/* =========================================
   Video loading logic
========================================= */
const player = document.getElementById("main-player");
function loadVideo(video, el) {
  player.src = video.url + "?autoplay=1";
  document.querySelectorAll(".video-item").forEach(i => i.classList.remove("active"));
  el.classList.add("active");
}

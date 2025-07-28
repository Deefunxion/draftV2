let currentVideo = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  buildPlaylist();
  
  // Show welcome message initially
  displayWelcomeMessage();
});

// Display default welcome content
function displayWelcomeMessage() {
  const detailsContainer = document.getElementById('video-details-display');
  detailsContainer.innerHTML = `
    <div class="video-details-content">
      <h2>■ Καλώς ήρθατε στη Βιντεοθήκη AI</h2>
      <h4>Ανακαλύψτε τον κόσμο της Τεχνητής Νοημοσύνης</h4>
      <p>Αυτή η βιβλιοθήκη περιέχει μια επιλεγμένη συλλογή από 49+ βίντεο που σας καθοδηγούν στον συναρπαστικό κόσμο της AI. Από βασικές έννοιες μέχρι προχωρημένες στρατηγικές, θα βρείτε περιεχόμενο που ταιριάζει στο επίπεδό σας.</p>
      
      <h4>◆ Οργάνωση Περιεχομένου:</h4>
      <p><strong>▲ Top 5:</strong> Τα πιο δημοφιλή και αναγκαία βίντεο για αρχάριους</p>
      <p><strong>▲ Foundational:</strong> Βασικές έννοιες και θεωρητικό υπόβαθρο</p>
      <p><strong>▲ Strategy:</strong> Στρατηγικές υλοποίησης AI σε επιχειρήσεις</p>
      <p><strong>▲ Tutorials:</strong> Πρακτικοί οδηγοί βήμα προς βήμα</p>
      <p><strong>▲ Tools:</strong> Εργαλεία και πλατφόρμες AI</p>
      <p><strong>▲ Miscellaneous:</strong> Διάφορα θέματα και εξειδικευμένο περιεχόμενο</p>
      
      <div class="target-audience">
        ◆ Κοινό-Στόχος: Επιχειρηματίες, Φοιτητές, Developers, AI Enthusiasts
      </div>
      
      <p><strong>● Οδηγίες Χρήσης:</strong> Επιλέξτε μια κατηγορία από τη λίστα αναπαραγωγής στα δεξιά και κάντε κλικ σε οποιοδήποτε βίντεο για να δείτε λεπτομέρειες και να το παρακολουθήσετε.</p>
    </div>
  `;
}

// Display video details when a video is selected
function displayVideoDetails(video) {
  const detailsContainer = document.getElementById('video-details-display');
  detailsContainer.innerHTML = `
    <div class="video-details-content">
      <h2>${video.title}</h2>
      <h4>■ Κανάλι: ${video.channel || 'AI Education Channel'}</h4>
      <p><strong>● Περιγραφή:</strong></p>
      <p>${video.description || 'Ένα εκπαιδευτικό βίντεο σχετικά με την Τεχνητή Νοημοσύνη που θα σας βοηθήσει να κατανοήσετε τις βασικές έννοιες και εφαρμογές.'}</p>
      
      <div class="target-audience">
        ◆ Κοινό-Στόχος: ${video.targetAudience || 'Όλα τα επίπεδα'}
      </div>
      
      <a href="${video.url}" target="_blank" class="watch-button">
        ▶ Παρακολούθηση Βίντεο
      </a>
    </div>
  `;
}

async function buildPlaylist() {
  try {
    const response = await fetch('videos.json');
    const videos = await response.json();
    
    // Clear playlist
    const playlist = document.querySelector('.playlist');
    playlist.innerHTML = '';
    
    // Group videos by category
    const categories = {};
    videos.forEach(video => {
      if (!categories[video.category]) {
        categories[video.category] = [];
      }
      categories[video.category].push(video);
    });
    
    // Define category order
    const categoryOrder = ['Top 5', 'Foundational', 'Strategy', 'Tutorials', 'Tools', 'Miscellaneous'];
    
    // Create category structure in specified order
    categoryOrder.forEach(categoryName => {
      if (categories[categoryName]) {
        const category = createCategory(categoryName, categories[categoryName]);
        playlist.appendChild(category);
      }
    });
    
    // Add any remaining categories not in the predefined order
    Object.keys(categories).forEach(categoryName => {
      if (!categoryOrder.includes(categoryName)) {
        const category = createCategory(categoryName, categories[categoryName]);
        playlist.appendChild(category);
      }
    });
    
  } catch (error) {
    console.error('Error loading videos:', error);
    const playlist = document.querySelector('.playlist');
    playlist.innerHTML = '<div style="padding: 1rem; color: #ff6b6b;">▲ Σφάλμα φόρτωσης βίντεο</div>';
  }
}

function createCategory(name, videos) {
  const category = document.createElement('div');
  category.className = 'category';
  
  const title = document.createElement('div');
  title.className = 'category-title';
  title.textContent = name;
  title.addEventListener('click', () => {
    category.classList.toggle('open');
  });
  
  const videosContainer = document.createElement('div');
  videosContainer.className = 'category-videos';
  
  videos.forEach(video => {
    const videoItem = createVideoItem(video);
    videosContainer.appendChild(videoItem);
  });
  
  category.appendChild(title);
  category.appendChild(videosContainer);
  
  return category;
}

function createVideoItem(video) {
  const item = document.createElement('div');
  item.className = 'video-item';
  item.addEventListener('click', () => selectVideo(video, item));
  
  const thumb = document.createElement('img');
  thumb.className = 'video-thumb';
  thumb.src = `https://img.youtube.com/vi/${extractVideoId(video.url)}/mqdefault.jpg`;
  thumb.alt = video.title;
  thumb.onerror = function() {
    this.style.background = 'var(--border-color)';
    this.style.display = 'none';
  };
  
  const info = document.createElement('div');
  info.className = 'video-info';
  
  const title = document.createElement('div');
  title.className = 'video-title';
  title.textContent = video.title;
  
  info.appendChild(title);
  item.appendChild(thumb);
  item.appendChild(info);
  
  return item;
}

function selectVideo(video, element) {
  // Remove active class from all video items
  document.querySelectorAll('.video-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to selected item
  element.classList.add('active');
  
  // Display video details in the left panel
  displayVideoDetails(video);
  
  // Update current video
  currentVideo = video;
}

function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

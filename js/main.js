$(document).ready(function(){
  $('#menu-toggle').click(function(){
    $('.nav-list').toggleClass('active');
  });
});
$('a[href^="#"]').on('click', function(e) {
  e.preventDefault();
  var target = $(this.hash);
  $('html, body').animate({
    scrollTop: target.offset().top - 60
  }, 800);
});
const galleryGrid = $('#gallery-grid');

fetch('data/gallery.json')
  .then(res => res.json())
  .then(items => {
    items.forEach(item => {
      const html = `
        <div class="gallery-item">
          <img src="${item.img}" alt="${item.title}">
          <div class="overlay">
            <h3>${item.title}</h3>
            <p>${item.artist}</p>
          </div>
        </div>`;
      galleryGrid.append(html);
    });
  });
  $('.exhibition-card').hover(
  function(){ $(this).css('transform','scale(1.05)'); },
  function(){ $(this).css('transform','scale(1)'); }
);

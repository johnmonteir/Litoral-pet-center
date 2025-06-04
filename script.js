document.querySelector('.google-btn').addEventListener('click', function(e) {
  if(/Android|iPhone|iPad/i.test(navigator.userAgent)) {
    e.preventDefault();
    window.location.href = 'https://search.google.com/local/writereview?placeid=ChIJ-bArM43NwAcRCaSbEYZg9Fc';
  }
});

const floatingBtn = document.createElement('a');
floatingBtn.href = 'https://wa.me/5585994175022';
floatingBtn.className = 'float-whatsapp';
floatingBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
floatingBtn.target = '_blank';
document.body.appendChild(floatingBtn);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
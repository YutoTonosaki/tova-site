// 動画のやり方だとJQueryが必要なので、純粋なJSで実装

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNavbar');
  if(!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > nav.offsetHeight);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive: true});
});


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
});

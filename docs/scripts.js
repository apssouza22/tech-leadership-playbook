window.addEventListener('scroll', function() {
    console.log("scrolling")
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

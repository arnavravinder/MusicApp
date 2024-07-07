document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    VanillaTilt.init(document.querySelectorAll(".current-track"), {
        max: 25,
        speed: 400
    });
});

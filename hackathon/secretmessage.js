document.addEventListener("DOMContentLoaded", function() {
    const revealBtn = document.getElementById('revealBtn');
    const hiddenContent = document.getElementById('hiddenContent');
    const paraContainer = document.querySelector('.para-container');

    revealBtn.addEventListener('click', function() {
        hiddenContent.style.display = 'block';
        setTimeout(() => {
            hiddenContent.style.opacity = 1;
            paraContainer.style.display = 'block';
        }, 10);
        document.body.style.overflow = 'auto';
    });
});

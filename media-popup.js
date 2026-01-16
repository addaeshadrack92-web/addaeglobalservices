const popup = document.getElementById("media-popup");
const popupImage = document.getElementById("popup-image");
const popupVideo = document.getElementById("popup-video");
const closeBtn = document.getElementById("close-popup");

document.querySelectorAll(".media-trigger").forEach(media => {
    media.addEventListener("click", () => {
        popup.style.display = "flex";

        if (media.dataset.type === "image") {
            popupImage.src = media.src;
            popupImage.style.display = "block";
            popupVideo.style.display = "none";
        } else {
            popupVideo.src = media.src;
            popupVideo.style.display = "block";
            popupImage.style.display = "none";
        }
    });
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popupVideo.pause();
});

popup.addEventListener("click", e => {
    if (e.target === popup) {
        popup.style.display = "none";
        popupVideo.pause();
    }
});

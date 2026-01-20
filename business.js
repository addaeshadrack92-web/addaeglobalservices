// business.js

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("business-list");
    if (!container) return; // No container on this page

    fetch("businesses.json")
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            const isHomepage = container.dataset.page === "home";
            const businessesToShow = isHomepage ? data.filter(b => b.featured) : data;

            renderBusinesses(businessesToShow, container);
        })
        .catch(err => {
            console.error("Failed to load businesses:", err);
            container.innerHTML = "<p>Sorry, failed to load businesses. Please try again later.</p>";
        });
});

// Render businesses dynamically
function renderBusinesses(businesses, container) {
    container.innerHTML = ""; // Clear container

    businesses.forEach(business => {
        const card = document.createElement("div");
        card.className = "business-card";

        // Handle multiple images
        let imagesHTML = "";
        if (business.images && business.images.length > 0) {
            if (business.images.length === 1) {
                imagesHTML = `<img src="${business.images[0]}" alt="${business.name}" class="media-trigger" data-type="image">`;
            } else {
                imagesHTML = `<div class="carousel">`;
                business.images.forEach((img, idx) => {
                    imagesHTML += `<img src="${img}" alt="${business.name} image ${idx+1}" class="media-trigger" data-type="image">`;
                });
                imagesHTML += `</div>`;
            }
        }

        card.innerHTML = `
            ${imagesHTML}
            <h3>${business.name}</h3>
            <p><strong>Category:</strong> ${business.category}</p>
            <p><strong>Country:</strong> ${business.country}</p>
            <p>${business.description}</p>
            <p><em>Contact: ${business.contact || "Not provided"}</em></p>
        `;

        container.appendChild(card);
    });

    initMediaPopup(); // Initialize popup for images/videos
}

// ===== MEDIA POPUP FUNCTION =====
function initMediaPopup() {
    const triggers = document.querySelectorAll(".media-trigger");
    const popup = document.getElementById("media-popup");
    const popupImg = document.getElementById("popup-image");
    const popupVideo = document.getElementById("popup-video");
    const closeBtn = document.getElementById("close-popup");

    if (!popup || !popupImg || !popupVideo || !closeBtn) return;

    triggers.forEach(el => {
        el.addEventListener("click", () => {
            const type = el.dataset.type;
            if (type === "image") {
                popupImg.src = el.src;
                popupImg.style.display = "block";
                popupVideo.style.display = "none";
            } else if (type === "video") {
                popupVideo.src = el.src;
                popupVideo.style.display = "block";
                popupImg.style.display = "none";
            }
            popup.style.display = "flex";
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
}

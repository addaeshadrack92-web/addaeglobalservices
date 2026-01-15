document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("product-list");

    if (!container) {
        console.error("Error: #product-list container not found.");
        return;
    }

    fetch("businesses.json") // or "products.json"
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = "<p>No products available at the moment.</p>";
                return;
            }

            data.forEach(product => {
                const card = document.createElement("div");
                card.className = "product-card";

                // Handle multiple images
                let imagesHtml = "";
                if (product.image) {
                    const images = product.image.split(",").map(img => img.trim());
                    imagesHtml = images.map(img => 
                        `<img src="images/${img}" alt="${product.name}" class="product-image">`
                    ).join("");
                }

                card.innerHTML = `
                    <div class="product-images">
                        ${imagesHtml}
                    </div>
                    <h3>${product.name}</h3>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p>${product.description}</p>
                    <p><em>Contact: ${product.contact}</em></p>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading products:", error);
            container.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        });
});

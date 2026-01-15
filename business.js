// Fetch and display businesses from businesses.json
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("business-list");

    if (!container) {
        console.error("Error: #business-list container not found.");
        return;
    }

    fetch("businesses.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = "<p>No businesses found.</p>";
                return;
            }

            data.forEach(business => {
                const card = document.createElement("div");
                card.className = "business-card";

                card.innerHTML = `
                    <h3>${business.name}</h3>
                    <p><strong>Category:</strong> ${business.category}</p>
                    <p><strong>Country:</strong> ${business.country}</p>
                    <p>${business.description}</p>
                    <p><em>Contact: ${business.contact}</em></p>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading businesses:", error);
            container.innerHTML = "<p>Sorry, failed to load businesses. Please try again later.</p>";
        });
});

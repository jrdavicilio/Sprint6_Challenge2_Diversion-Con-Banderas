document.addEventListener("DOMContentLoaded", async () => {
    const countriesList = document.getElementById("countries-list");
    countriesList.classList.add("grid-container");

    try {
        const response = await fetch("https://restcountries.com/v3/all");
        if (!response.ok) throw new Error("Error al obtener los países");
        
        let countries = await response.json();
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

        countries.forEach((country) => {
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("country-item");

            const flag = document.createElement("img");
            flag.src = country.flags[1];
            flag.alt = `Bandera de ${country.name.common}`;
            flag.classList.add("flag");

            const countryName = document.createElement("p");
            countryName.textContent = country.name.common;
            countryName.classList.add("country-name");

            countryDiv.appendChild(flag);
            countryDiv.appendChild(countryName);
            countriesList.appendChild(countryDiv);

            countryDiv.addEventListener("click", () => showCountryDetails(country));
        });
    } catch (error) {
        console.error(error);
    }
});

function showCountryDetails(country) {
    const existingModal = document.getElementById("country-modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.id = "country-modal";
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="modal-content">
            <img src="${country.flags[1]}" alt="Bandera de ${country.name.common}" class="modal-flag">
        </div>
        <div class="modal-content2">
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[1] : "N/A"}</p>
            <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Lado de la carretera:</strong> ${country.car?.side || "N/A"}</p>
            <button id="close-modal">Cerrar</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("close-modal").addEventListener("click", () => {
        modal.remove();
    });
}
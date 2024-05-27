document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('digimonContainer');
    const searchInput = document.getElementById('searchInput');
    const levelFilter = document.getElementById('levelFilter');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popupImage');
    const popupName = document.getElementById('popupName');
    const popupLevel = document.getElementById('popupLevel');
    const closeButton = document.getElementById('closeButton');
    let digimonData = [];
    const url = 'https://digimon-api.vercel.app/api/digimon'

    fetch(url)
        .then(response => response.json())
        .then(data => {
            digimonData = data;
            const levels = [...new Set(data.map(digimon => digimon.level))];
            levels.forEach(level => {
                const option = document.createElement('option');
                option.value = level;
                option.textContent = level;
                levelFilter.appendChild(option);
            });

            displayDigimons(data);
        })
        .catch(error => console.error('Error fetching Digimon data:', error));

    function displayDigimons(digimons) {
        container.innerHTML = '';
        digimons.forEach(digimon => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = digimon.img;
            img.alt = digimon.name;

            const name = document.createElement('h2');
            name.textContent = digimon.name;

            const level = document.createElement('p');
            level.textContent = `Level: ${digimon.level}`;

            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'Ver detalhes';
            detailsButton.addEventListener('click', () => showPopup(digimon));

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(level);
            card.appendChild(detailsButton);
            container.appendChild(card);
        });
    }

    function filterDigimons() {
        const query = searchInput.value.toLowerCase();
        const selectedLevel = levelFilter.value;

        let filteredDigimons = digimonData.filter(digimon => 
            digimon.name.toLowerCase().includes(query)
        );

        if (selectedLevel !== 'all') {
            filteredDigimons = filteredDigimons.filter(digimon => digimon.level === selectedLevel);
        }

        displayDigimons(filteredDigimons);
    }

    function showPopup(digimon) {
        popupImage.src = digimon.img;
        popupName.textContent = digimon.name;
        popupLevel.textContent = `Level: ${digimon.level}`;
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    function closePopup() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }

    closeButton.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    searchInput.addEventListener('input', filterDigimons);
    levelFilter.addEventListener('change', filterDigimons);
});
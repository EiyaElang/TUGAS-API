document.addEventListener('DOMContentLoaded', function () {
    const kotaContainer = document.getElementById('kota');

    function showKota(provinsiId) {
        const apiUrl = `https://api.goapi.io/regional/kota?provinsi_id=${provinsiId}&api_key=c002c21d-9fc8-5c29-bfa9-e0159d99`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const kotaList = data.data.map(kota => `<li>${kota.name}</li>`).join('');
                    kotaContainer.innerHTML = `<ul>${kotaList}</ul>`;
                } else {
                    console.error('Failed to fetch data:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function onProvinsiSelectChange() {
        const provinsiId = this.value;
        if (provinsiId) {
            showKota(provinsiId);
        } else {
            kotaContainer.innerHTML = ''; 
        }
    }

    fetch('https://api.goapi.io/regional/provinsi?api_key=c002c21d-9fc8-5c29-bfa9-e0159d99')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const provinsiSelect = document.createElement('select');
                provinsiSelect.addEventListener('change', onProvinsiSelectChange);

                data.data.forEach(provinsi => {
                    const option = document.createElement('option');
                    option.value = provinsi.id;
                    option.textContent = provinsi.name;
                    provinsiSelect.appendChild(option);
                });

                document.body.insertBefore(provinsiSelect, kotaContainer);
            } else {
                console.error('Failed to fetch data:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// FileReader API
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileContent = document.getElementById('fileContent');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            if (file.type.startsWith('image/')) {
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100%';
                    fileContent.innerHTML = '';
                    fileContent.appendChild(img);
                };
                reader.readAsDataURL(file);
            } else {
                reader.onload = (e) => {
                    fileContent.textContent = e.target.result;
                };
                reader.readAsText(file);
            }
        }
    });
});

// Drag and Drop API
const dropArea = document.getElementById('dropArea');
const dropContent = document.getElementById('dropContent');

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#000';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = '#ccc';
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#ccc';
    const file = event.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        if (file.type.startsWith('image/')) {
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                dropContent.innerHTML = '';
                dropContent.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else {
            reader.onload = (e) => {
                dropContent.textContent = e.target.result;
            };
            reader.readAsText(file);
        }
    }
});

// Управление Устройствами
const geolocationBtn = document.getElementById('geolocationBtn');
const locationText = document.getElementById('location');
const cameraBtn = document.getElementById('cameraBtn');
const video = document.getElementById('video');

geolocationBtn.onclick = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            locationText.textContent = `Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude}`;
        }, (error) => {
            locationText.textContent = `Ошибка: ${error.message}`;
        });
    } else {
        locationText.textContent = 'Геолокация не поддерживается';
    }
};

cameraBtn.onclick = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            alert(`Ошибка: ${error.message}`);
        });
};
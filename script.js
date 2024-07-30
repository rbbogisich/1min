let planted = false; // Флаг для отслеживания состояния поля

document.getElementById('plantButton').addEventListener('click', plantSeeds);
document.getElementById('harvestButton').addEventListener('click', harvest);

function plantSeeds() {
    if (planted) {
        document.getElementById('status').innerText = 'Вы уже посадили семена!';
        return;
    }
    
    // Создание растения
    const field = document.getElementById('field');
    const plant = document.createElement('div');
    plant.className = 'plant';
    plant.style.left = `${Math.random() * 100}%`; // Случайное положение растения
    field.appendChild(plant);

    planted = true; // Устанавливаем флаг
    document.getElementById('status').innerText = 'Вы посадили семена!';
}

function harvest() {
    if (!planted) {
        document.getElementById('status').innerText = 'Нет урожая для сбора!';
        return;
    }

    // Убираем растение
    const field = document.getElementById('field');
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }

    planted = false; // Сбрасываем флаг
    document.getElementById('status').innerText = 'Вы собрали урожай!';
}
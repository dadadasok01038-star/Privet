// Инициализация Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем приложение на весь экран

let balance = 1000;

const balanceEl = document.getElementById('balance');
const openCaseBtn = document.getElementById('openCaseBtn');
const resultEl = document.getElementById('result');

// Логика нажатия на кейс/сейф
openCaseBtn.addEventListener('click', () => {
    if (balance < 100) {
        resultEl.innerText = "Недостаточно средств на балансе!";
        return;
    }

    balance -= 100; // Списываем стоимость открытия
    balanceEl.innerText = balance;
    
    resultEl.innerText = "Открытие хранилища...";
    
    // Имитация выпадения приза через секунду
    setTimeout(() => {
        const prizes = [
            { name: "Редкий крипто-ключ", reward: 150 },
            { name: "Энергетический кристалл", reward: 300 },
            { name: "Пустой сектор", reward: 0 },
            { name: "Сундук с золотом", reward: 500 }
        ];
        
        // Случайный выбор приза
        const won = prizes[Math.floor(Math.random() * prizes.length)];
        balance += won.reward;
        balanceEl.innerText = balance;
        
        if (won.reward > 0) {
            resultEl.innerHTML = `🎉 Вы выиграли: <b>${won.name}</b> (+${won.reward} 🪙)!`;
        } else {
            resultEl.innerHTML = `❌ Упс, этот сектор оказался пустым. Попробуйте еще раз!`;
        }
        
        // Легкая вибрация телефона (если поддерживается Telegram)
        if (tg.HapticFeedback) {
            tg.HapticFeedback.notificationOccurred('success');
        }
    }, 1000);
});

// Функция ежедневного бонуса
function claimBonus() {
    balance += 250;
    balanceEl.innerText = balance;
    resultEl.innerHTML = `🎁 Вы получили ежедневный бонус: <b>+250 🪙</b>!`;
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

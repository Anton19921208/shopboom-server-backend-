const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors({
  origin: [
    'https://shopboom-admin.vercel.app',
    'https://shopboom-store.vercel.app'
  ],
  credentials: true
}));
app.use(bodyParser.json());

// Подключение к MongoDB Atlas
mongoose.connect(
  'mongodb+srv://antondubikivskij:Z3qec7QhKUKOQVeG@cluster0.4cuzzdt.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0'
)
  .then(() => console.log('MongoDB подключена'))
  .catch(err => console.log('Ошибка подключения к MongoDB:', err));

// Подключение роутов для товаров
app.use('/api/products', require('./routes/products'));
// Подключение роутов для заказов
app.use('/api/orders', require('./routes/orders'));
// Подключение роутов для настроек сайта
app.use('/api/settings', require('./routes/settings'));

// Пример маршрута
app.get('/', (req, res) => {
  res.send('Магазин работает!');
});

// Здесь позже будут другие маршруты, например:
// app.use('/api/products', require('./routes/products'));

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
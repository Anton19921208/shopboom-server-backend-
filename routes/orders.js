const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Получить все заказы
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Создать заказ
router.post('/', async (req, res) => {
  try {
    const { items } = req.body; // [{ product, quantity }]
    // Подсчёт суммы заказа
    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ error: 'Товар не найден' });
      total += product.price * item.quantity;
    }
    const newOrder = new Order({ items, total });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании заказа' });
  }
});

module.exports = router; 
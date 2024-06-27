import express from 'express';
import Subscription from '../model/subscriptionModel.js';

const router = express.Router();

// Get all subscriptions
router.get('/getall', async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new subscription
router.post('/add', async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newSubscription = new Subscription({ name, price, description });
    await newSubscription.save();
    res.json({ msg: 'Subscription added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a subscription
router.delete('/delete/:id', async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/userRoute.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js'; // Import subscription routes

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
dotenv.config(); // Load environment variables

// Retrieve configuration values
const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

// Connect to MongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.use('/api/subscriptions', subscriptionRoutes); // Use subscription routes
app.use('/api', route); // Use user routes

// Health check route to ensure the server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

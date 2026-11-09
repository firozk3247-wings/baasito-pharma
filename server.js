require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Product = require('./models/Product');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    await seedDefaultProducts();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Make sure your local MongoDB service is running (mongod).');
  });

// Auto Seed Initial Products from Baasito Pharma Catalogue
async function seedDefaultProducts() {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const defaultProducts = [
        {
          name: 'PANSITO-DSR Capsules',
          composition: 'Pantoprazole Gastro-Resistant & Domperidone Prolonged-Release Capsules I.P.',
          packaging: '10 x 10 Capsules',
          category: 'Gastroenterology',
          indications: [
            'Advanced Relief from Acidity & Heartburn',
            'Acid Reflux (GERD) Management',
            'Relieves Nausea, Bloating & Indigestion',
            'Dual Action Fast-Absorbing Formula'
          ]
        },
        {
          name: 'BASIFLAM-SP Tablets',
          composition: 'Aceclofenac, Paracetamol & Serratiopeptidase Tablets',
          packaging: '10 x 10 Tablets',
          category: 'Anti-Inflammatory & Pain Relief',
          indications: [
            'Effective Relief from Acute Pain & Swelling',
            'Joint Pain, Arthritis & Spondylitis',
            'Post-Traumatic and Post-Operative Inflammation',
            'Triple Active Proven Formulation'
          ]
        },
        {
          name: 'CALSITO Tablets',
          composition: 'Calcium Citrate, Magnesium, Zinc & Vitamin D3 Tablets',
          packaging: '10 x 10 Tablets',
          category: 'Nutraceutical / Bone Health',
          indications: [
            'Daily Support for Strong Bones & Joint Health',
            'Enriched with Zinc, Magnesium & Bioactive Vitamin D3',
            'Reduces Muscle Cramps, Fatigue & Weakness',
            'High Bioavailability & Superior Absorption'
          ]
        }
      ];
      await Product.insertMany(defaultProducts);
      console.log('Default Baasito Pharma products successfully seeded to MongoDB.');
    }
  } catch (err) {
    console.error('Error during seeding:', err.message);
  }
}

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, city, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Name, phone and message are mandatory fields.' });
    }
    const newInquiry = new Inquiry({ name, email, phone, city, message });
    await newInquiry.save();
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully! Our team will contact you shortly.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record inquiry' });
  }
});

app.listen(PORT, () => {
  console.log(`Baasito Pharma Portal is running at http://localhost:${PORT}`);
});

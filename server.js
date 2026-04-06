const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(cors());
app.use(express.json());

// Supabase Connection
const supabaseUrl = 'https://tfhekwhubbdsgjbcjpxf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmaGVrd2h1YmJkc2dqYmNqcHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzE3NDMsImV4cCI6MjA5MTA0Nzc0M30.9zv-0Hx3BexgXlKVJnMXFUS1MsZaY4PDT4UDJWTYEC4';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Initialized Supabase Client');

// API to Save an Order
app.post('/api/orders', async (req, res) => {
    const { tableNumber, items, total, discount } = req.body;
    
    const { data: order, error } = await supabase
        .from('orders')
        .insert([{ tablenumber: tableNumber, items, total, discount }])
        .select()
        .single();
        
    if (error) {
        console.error('Error saving order:', error);
        return res.status(500).json({ error: 'Failed to save order' });
    }
    
    res.json({ message: 'Order saved successfully', order });
});

// API to Get All Orders
app.get('/api/orders', async (req, res) => {
    const { data: orders, error } = await supabase
        .from('orders')
        .select('*');
        
    if (error) {
        return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    
    res.json(orders);
});

// API to Save Feedback
app.post('/api/feedback', async (req, res) => {
    const { name, rating, comments } = req.body;
    
    const { data: feedback, error } = await supabase
        .from('feedback')
        .insert([{ name, rating, comments }])
        .select()
        .single();
        
    if (error) {
        console.error('Error saving feedback:', error);
        return res.status(500).json({ error: 'Failed to save feedback' });
    }
    
    res.json({ message: 'Feedback saved successfully', feedback });
});

// API to Get All Feedback
app.get('/api/feedback', async (req, res) => {
    const { data: feedback, error } = await supabase
        .from('feedback')
        .select('*');
        
    if (error) {
        return res.status(500).json({ error: 'Failed to fetch feedback' });
    }
    
    res.json(feedback);
});

app.listen(3000, () => console.log('Server running on port 3000'));
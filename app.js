// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const supabase = require("./supabase"); // Sesuaikan dengan path ke file db.js
const app = express();
const PORT = process.env.PORT || 1323;

app.use(bodyParser.json(), cors());

// Endpoint CRUD untuk tabel 'recaps'

// Get all recaps
app.get("/api/recaps", async (req, res) => {
  try {
    const { data, error } = await supabase.from("recaps").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single recap by ID
app.get("/api/recaps/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from("recaps")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new recap
app.post("/api/recaps", async (req, res) => {
  const { amount, type, date, income} = req.body;
  try {
    const { data, error } = await supabase
      .from("recaps")
      .insert([{ amount, type, date, income }]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update recap by ID
app.put("/api/recaps/:id", async (req, res) => {
  const id = req.params.id;
  const { amount, type, date, income} = req.body;
  try {
    const { data, error } = await supabase
      .from("recaps")
      .update({ amount, type, date, income })
      .eq("id", id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete recap by ID
app.delete("/api/recaps/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase.from("recaps").delete().eq("id", id);
    if (error) throw error;
    res.status(204).json({ message: "Recap deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint CRUD untuk tabel 'types'

// Get all types
app.get("/api/types", async (req, res) => {
  try {
    const { data, error } = await supabase.from("types").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single type by ID
app.get("/api/types/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from("types")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new type
app.post("/api/types", async (req, res) => {
  const { name, price } = req.body;
  try {
    const { data, error } = await supabase
      .from("types")
      .insert([{ name, price }]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update type by ID
app.put("/api/types/:id", async (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;
  try {
    const { data, error } = await supabase
      .from("types")
      .update({ name, price })
      .eq("id", id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete type by ID
app.delete("/api/types/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase.from("types").delete().eq("id", id);
    if (error) throw error;
    res.status(204).json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

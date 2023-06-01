import express from "express";
import Monkey from "../models/monkey.js";
const router = express.Router();

// /monkeys

router.get("/", async (req, res) => {
  try {
    const monkeys = await Monkey.find();
    res.json(monkeys);
  } catch {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.get("/:id", getMonkey, (req, res) => {
  res.send(res.monkey);
});

router.post("/", async (req, res) => {
  const monkey = new Monkey({ name: req.body.name, breed: req.body.breed });
  try {
    const newMonkey = await monkey.save();
    res.status(201).json(newMonkey);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.patch("/:id", getMonkey, async (req, res) => {
  if (req.body.name != null) {
    res.monkey.name = req.body.name;
  }
  if (req.body.breed != null) {
    res.monkey.breed = req.body.breed;
  }
  if (req.body.birthDate != null) {
    res.monkey.birthDate = req.body.birthDate;
  }
  try {
    const updatedMonkey = await res.monkey.save();
    res.json(updatedMonkey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getMonkey, async (req, res) => {
  try {
    await Monkey.findByIdAndRemove(res.monkey._id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMonkey(req, res, next) {
  let monkey;
  try {
    monkey = await Monkey.findById(req.params.id);
    if (monkey == null) {
      return res.status(404).json({ message: "monkey not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.monkey = monkey;
  next();
}

export default router;

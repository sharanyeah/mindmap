const express = require('express');
const MindMap = require('../models/MindMap');
const authMiddleware = require('../middleware/auth');

const router = require('express').Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const mindmaps = await MindMap.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(mindmaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const mindmap = await MindMap.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!mindmap) {
      return res.status(404).json({ error: 'Mind map not found' });
    }
    
    res.json(mindmap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, data } = req.body;

    if (!name || !data) {
      return res.status(400).json({ error: 'Name and data are required' });
    }

    const mindmap = new MindMap({
      name,
      data,
      userId: req.userId
    });

    await mindmap.save();
    res.status(201).json(mindmap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, data } = req.body;

    const mindmap = await MindMap.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, data, updatedAt: Date.now() },
      { new: true }
    );

    if (!mindmap) {
      return res.status(404).json({ error: 'Mind map not found' });
    }

    res.json(mindmap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const mindmap = await MindMap.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!mindmap) {
      return res.status(404).json({ error: 'Mind map not found' });
    }

    res.json({ message: 'Mind map deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

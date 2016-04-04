import express from 'express';
import odds from './odds.json';

const router = new express.Router();

router.get('/odds', (req, res) => {
    res.json(odds)
});

export default router;

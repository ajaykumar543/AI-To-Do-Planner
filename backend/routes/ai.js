import { Router } from 'express';
import { createPlan } from '../../services/aiService.js';

const router = Router();
router.post('/plan', async (req, res) => {
  const { goal, deadline, priority, preferences = {} } = req.body ?? {};
  if (typeof goal !== 'string' || !goal.trim() || goal.trim().length > 1000) {
    return res.status(400).json({ error: 'Please provide a goal of up to 1,000 characters.' });
  }
  if (!deadline || Number.isNaN(new Date(`${deadline}T00:00:00`).getTime())) {
    return res.status(400).json({ error: 'Please choose a valid deadline.' });
  }
  if (!['Low', 'Medium', 'High'].includes(priority)) return res.status(400).json({ error: 'Please choose a valid priority.' });
  try {
    const plan = await createPlan({ goal: goal.trim(), deadline, priority, preferences });
    return res.json(plan);
  } catch (error) {
    console.error('AI plan error:', error?.status || error?.message);
    if (error?.code === 'API_KEY_MISSING') return res.status(503).json({ error: 'AI service is not configured. Add OPENAI_API_KEY to your .env file.' });
    if (error?.status === 429) return res.status(429).json({ error: 'The AI service is busy. Please try again shortly.' });
    return res.status(502).json({ error: 'Unable to generate your plan right now. Please try again.' });
  }
});
export default router;

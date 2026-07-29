import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// EYFI Reward Tiers Data Schema
const EYFI_TIERS = [
  { level: 0, threshold: 0, title: "Scout", perks: ["Private community access", "Starter kit"], perkValue: "$50" },
  { level: 1, threshold: 25, title: "Campus Ambassador", perks: ["Official Title", "First swag drop", "Prize-linked challenge"], perkValue: "$150" },
  { level: 2, threshold: 50, title: "Campus Captain", perks: ["Event grants for your campus", "Exclusive merch"], perkValue: "$350" },
  { level: 3, threshold: 75, title: "Campus Lead", perks: ["Mentorship access", "Campus event grants"], perkValue: "$750" },
  { level: 4, threshold: 100, title: "Polygnan Legend", perks: ["Paid internship opportunities", "Invite to ambassador events"], perkValue: "Paid Internship" },
  { level: 5, threshold: 200, title: "Founding Tier", perks: ["Founding Team consideration"], perkValue: "Founding Equity" }
];

// GET /api/tiers - Fetch all milestone configurations
app.get('/api/tiers', (req, res) => {
  res.json({
    success: true,
    spec: "SPEC-001 v1.1",
    tiers: EYFI_TIERS
  });
});

// POST /api/simulate - Calculate progression & delta for given registration count
app.post('/api/simulate', (req, res) => {
  const { currentRegs = 0 } = req.body;
  const numRegs = Number(currentRegs);

  const nextTier = EYFI_TIERS.find(t => t.threshold > numRegs) || null;
  const currentUnlockedTier = [...EYFI_TIERS].reverse().find(t => numRegs >= t.threshold) || EYFI_TIERS[0];
  const delta = nextTier ? nextTier.threshold - numRegs : 0;
  const isMaxTier = !nextTier;

  res.json({
    success: true,
    currentRegs: numRegs,
    currentUnlockedTier,
    nextTier,
    delta,
    isMaxTier,
    calloutMessage: isMaxTier
      ? "🏆 Maximum Tier Achieved! You are under consideration for the Founding Team."
      : `Just ${delta} more registrations to unlock ${nextTier.title}!`
  });
});

// GET /api/health - Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", service: "EYFI Reward Ladder Backend API", port: PORT });
});

app.listen(PORT, () => {
  console.log(`🚀 EYFI Reward Ladder Backend API running on http://localhost:${PORT}`);
});

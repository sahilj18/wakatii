import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono();

// Middlewares
app.use(logger()); // Enable logger
app.use(cors());

const defaultWPM = 238;

function calculateSpeed(
  text: string,
  wpm: number
): { wpm: number; seconds: number; minutes: number; wordsCount: number } {
  const wordsCount = text.trim().split(/\s+/).length;
  const seconds: number = (wordsCount / wpm) * 60;
  const minutes: number = seconds / 60;
  return {
    wpm,
    seconds: Number(seconds.toFixed(2)),
    minutes: Number(minutes.toFixed(2)),
    wordsCount,
  };
}

// MARK: Routes
app.get("/status", (c) => {
  return c.json({ message: "API is active 🔥" });
});

app.get("/", (c) => {
  const text = c.req.query("text");
  const wpm = c.req.query("wpm");

  if (!text) {
    return c.json({ message: "Please provide text" }, 400);
  }

  const result = calculateSpeed(text, wpm ? Number(wpm) : defaultWPM);

  return c.json(result);
});

app.post("/", async (c) => {
  const { text, wpm } = await c.req.json();

  if (!text) {
    return c.json({ message: "Please provide text" }, 400);
  }

  const result = calculateSpeed(text, Number(wpm) || defaultWPM);

  return c.json(result);
});

export default app;

import { createApp } from "./app";

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`🚀 Server running on http://localhost:${PORT}`);
});

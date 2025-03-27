import http from "http";
import app from "./app";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const server = http.createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
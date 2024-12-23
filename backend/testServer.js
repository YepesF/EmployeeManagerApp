import { app } from "./index.js";

const testServerPort = process.env.TEST_PORT || 3002;

const testServer = app.listen(testServerPort, () => {
  console.log(`Test server running on port ${testServerPort}`);
});

export default testServer;

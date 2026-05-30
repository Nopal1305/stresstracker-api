import server from './server/index.js';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

export default server;

if (process.env.NODE_ENV !== 'production') {
  server.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
}
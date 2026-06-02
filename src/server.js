import server from './server/index.js';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

export default server;

const wakeUpML = async () => {
  try {
    await axios.get('https://nooww-stresstracker-ml.hf.space/', { timeout: 60000 });
    console.log('ML API sudah siap');
  } catch (e) {
    console.log('ML API belum siap:', e.message);
  }
};

wakeUpML();

if (process.env.NODE_ENV !== 'production') {
  server.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
}
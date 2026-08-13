const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwsB8ponAe9WHP9r7C_0uMhB7kv5Idcs5sxqDIgB_jiu-Rc0ylUTst5oNTc7GdXh4W2tA/exec';

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const response = await fetch(SCRIPT_URL);
      const data = await response.text();

      res.setHeader('Content-Type', 'application/json');

      return res.status(response.status).send(data);
    }

    if (req.method === 'POST') {
      let body = req.body;

      // Se a Vercel entregar o body como objeto, transforma em JSON.
      // Se já for uma string, mantém como está.
      if (typeof body !== 'string') {
        body = JSON.stringify(body);
      }

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body
      });

      const data = await response.text();

      res.setHeader('Content-Type', 'application/json');

      return res.status(response.status).send(data);
    }

    return res.status(405).json({
      error: 'Method not allowed'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
};

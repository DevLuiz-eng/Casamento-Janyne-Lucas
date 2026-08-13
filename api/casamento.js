export default async function handler(req, res) {
  const SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbwsB8ponAe9WHP9r7C_0uMhB7kv5Idcs5sxqDIgB_jiu-Rc0ylUTst5oNTc7GdXh4W2tA/exec';

  try {
    if (req.method === 'GET') {
      const response = await fetch(SCRIPT_URL);
      const data = await response.text();

      return res.status(response.status).send(data);
    }

    if (req.method === 'POST') {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(req.body)
      });

      const data = await response.text();

      return res.status(response.status).send(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro ao conectar com o Google Apps Script'
    });
  }
}

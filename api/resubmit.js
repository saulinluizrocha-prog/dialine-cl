export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const orderId = body.id || body.order_id;
    if (!orderId) {
      return res.status(400).json({ error: 'Missing order id' });
    }

    const payload = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) {
      if (value !== undefined && value !== null && value !== '') {
        payload.append(key, String(value));
      }
    }

    const url = `https://tracker.everad.com/conversion/${orderId}/phone`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.toString()
    });

    let data = {};
    try {
      data = await response.json();
    } catch (e) {
      data = { text: await response.text().catch(() => '') };
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Error in resubmit:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

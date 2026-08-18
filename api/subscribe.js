export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Extrair dados do corpo da requisição e query params
    const body = req.body || {};
    const query = req.query || {};

    // 2. Extrair query params do Referer, se disponível
    let refererParams = {};
    const referer = req.headers['referer'] || req.headers['referrer'] || '';
    if (referer) {
      try {
        const parsedUrl = new URL(referer);
        for (const [key, value] of parsedUrl.searchParams.entries()) {
          refererParams[key] = value;
        }
      } catch (e) {
        // Ignora se não for URL válida
      }
    }

    // 3. Determinar o IP real do cliente
    let clientIp = req.headers['cf-connecting-ip'] || 
                   req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.socket?.remoteAddress || 
                   '';
    if (clientIp.includes(',')) {
      clientIp = clientIp.split(',')[0].trim();
    }

    // 4. Montar o payload para a Everad combinando referer, query e body
    const payload = {
      ...refererParams,
      ...query,
      ...body,
      ip: clientIp,
      is_smart_form: 'true'
    };

    // Garantir valores padrão de campanha se não informados
    if (!payload.country_code) payload.country_code = 'CL';
    if (!payload.campaign_id) payload.campaign_id = '1496763';
    if (!payload.landing_id) payload.landing_id = '12613';

    // Converter para URLSearchParams (application/x-www-form-urlencoded)
    const formParams = new URLSearchParams();
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined && value !== null && value !== '') {
        formParams.append(key, String(value));
      }
    }

    // 5. Enviar POST para o tracker da Everad
    const everadUrl = 'https://tracker.everad.com/conversion/new';
    const response = await fetch(everadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formParams.toString()
    });

    const statusCode = response.status;
    let data = {};
    try {
      data = await response.json();
    } catch (e) {
      data = { raw: await response.text().catch(() => '') };
    }

    console.log('Everad response status:', statusCode, 'data:', data);

    const conversionId = data.id || data.conversion_id || '';
    const clientName = payload.name || '';
    const clientPhone = payload.phone || '';

    // Se a requisição for AJAX / Fetch (esperando JSON)
    const isAjax = req.headers['accept']?.includes('application/json') || 
                   req.headers['x-requested-with'] === 'XMLHttpRequest';

    if (isAjax) {
      return res.status(200).json({
        success: statusCode === 200,
        status: statusCode,
        id: conversionId,
        data: data
      });
    }

    // Se for submissão padrão de formulário pelo navegador
    if (statusCode === 423) {
      const redirectUrl = referer ? `${referer}${referer.includes('?') ? '&' : '?'}is_pending_order_check_failed=true` : '/?is_pending_order_check_failed=true';
      return res.redirect(302, redirectUrl);
    }

    // Redireciona para a página de obrigado
    const successUrl = `/success.html?order_id=${encodeURIComponent(conversionId)}&name=${encodeURIComponent(clientName)}&phone=${encodeURIComponent(clientPhone)}`;
    return res.redirect(302, successUrl);

  } catch (error) {
    console.error('Error submitting order to Everad:', error);
    // Em caso de erro, redireciona para a página de sucesso para não perder o usuário
    return res.redirect(302, '/success.html?status=processed');
  }
}

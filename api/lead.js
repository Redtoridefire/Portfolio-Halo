module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    company,
    companySize,
    challenge,
    problemArea,
    urgency,
    timeframe,
  } = req.body || {};

  if (!name || !email || !challenge) {
    return res.status(400).json({ error: 'Name, email, and challenge are required.' });
  }

  const tags = [
    `size:${companySize || 'unknown'}`,
    `problem:${problemArea || 'unspecified'}`,
    `urgency:${urgency || 'unspecified'}`,
    `timeframe:${timeframe || 'unspecified'}`,
  ];

  const submission = {
    leadId: `lead_${Date.now()}`,
    name,
    email,
    company: company || 'Not provided',
    companySize: companySize || 'Not provided',
    problemArea: problemArea || 'Not provided',
    urgency: urgency || 'Not provided',
    challenge,
    timeframe: timeframe || 'Not provided',
    tags,
    receivedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  let routedToWebhook = false;

  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      routedToWebhook = webhookResponse.ok;
    } catch (error) {
      console.error('Lead webhook routing failed:', error);
    }
  }

  console.log('New lead submission:', submission);

  return res.status(200).json({
    success: true,
    routedToWebhook,
    leadId: submission.leadId,
    message: 'Thanks for reaching out! Mike will review your request shortly.',
  });
};

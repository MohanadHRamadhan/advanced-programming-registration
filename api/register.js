export default async function handler(req, res) {

  // Allow POST requests only
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // ============================================================
    //  The Apps Script URL is stored safely as an environment
    //  variable in Vercel — never hard-coded here
    // ============================================================
    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

    if (!APPS_SCRIPT_URL) {
      return res.status(500).json({ error: 'APPS_SCRIPT_URL is not set in environment variables.' });
    }

    // Forward the form data to Google Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

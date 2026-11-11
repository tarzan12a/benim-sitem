export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST istekleri kabul edilir.' });
  }

  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API anahtarı bulunamadı.' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: "Sen Zaman Tüneli adlı tarih, oyun ve medya portalının akıllı asistanısın. Kullanıcılara Atatürk, tarihi miraslar, retro oyunlar ve filmler hakkında yardımcı oluyorsun." 
          },
          { role: "user", content: message }
        ],
        max_tokens: 200
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Yapay zeka yanıt vermedi.' });
  }
}

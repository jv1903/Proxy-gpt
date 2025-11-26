export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL não fornecida." });
    }
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({
        error: "Falha ao baixar arquivo do OneDrive.",
        status: response.status
      });
    }
    const buffer = await response.arrayBuffer();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Content-Type", "application/octet-stream");
    return res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Erro no proxy:", err);
    return res.status(500).json({ error: "Erro interno no proxy." });
  }
}

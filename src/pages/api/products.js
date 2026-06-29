import products from '../../data/products.json';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Support basic filtering by category if requested
  const { category } = req.query;
  if (category) {
    const filtered = products.filter(
      (p) => p.category.toLowerCase() === category.toString().toLowerCase()
    );
    return res.status(200).json(filtered);
  }

  return res.status(200).json(products);
}

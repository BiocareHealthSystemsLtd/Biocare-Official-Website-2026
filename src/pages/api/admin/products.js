import fs from 'fs';
import path from 'path';
import siteConfig from '../../../data/siteConfig';
import { createDatabaseBackup } from '../../../lib/backup';

const filePath = path.join(process.cwd(), 'src/data/products.json');

function checkAuth(req) {
  const cookies = req.headers.cookie || '';
  return cookies.includes(`${siteConfig.admin.sessionCookieName}=authorized`);
}

export default async function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Load existing products on demand from file system to prevent caching
  let products = [];
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    products = JSON.parse(fileContent);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read products database' });
  }

  switch (req.method) {
    case 'GET':
      return res.status(200).json(products);

    case 'POST':
      try {
        const newProduct = req.body;
        if (!newProduct.id || !newProduct.name || !newProduct.category) {
          return res.status(400).json({ error: 'Missing required product attributes' });
        }
        
        // Check duplicate ID
        if (products.some(p => p.id === newProduct.id)) {
          return res.status(400).json({ error: 'Product ID already exists' });
        }

        products.push(newProduct);
        createDatabaseBackup('products');
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
        return res.status(201).json({ success: true, product: newProduct });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to write product' });
      }

    case 'PUT':
      try {
        const updatedProduct = req.body;
        const index = products.findIndex(p => p.id === updatedProduct.id);
        if (index === -1) {
          return res.status(404).json({ error: 'Product not found' });
        }

        products[index] = { ...products[index], ...updatedProduct };
        createDatabaseBackup('products');
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
        return res.status(200).json({ success: true, product: products[index] });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to update product' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'Product ID is required' });
        }

        const filtered = products.filter(p => p.id !== id);
        if (filtered.length === products.length) {
          return res.status(404).json({ error: 'Product not found' });
        }

        createDatabaseBackup('products');
        fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf8');
        return res.status(200).json({ success: true });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to delete product' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

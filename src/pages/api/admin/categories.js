import fs from 'fs';
import path from 'path';
import siteConfig from '../../../data/siteConfig';
import { createDatabaseBackup } from '../../../lib/backup';

const filePath = path.join(process.cwd(), 'src/data/categories.json');

function checkAuth(req) {
  const cookies = req.headers.cookie || '';
  return cookies.includes(`${siteConfig.admin.sessionCookieName}=authorized`);
}

export default async function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let categories = [];
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    categories = JSON.parse(fileContent);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read categories database' });
  }

  switch (req.method) {
    case 'GET':
      return res.status(200).json(categories);

    case 'POST':
      try {
        const newCategory = req.body;
        if (!newCategory.id || !newCategory.name || !newCategory.slug) {
          return res.status(400).json({ error: 'Missing required category fields' });
        }

        if (categories.some(c => c.id === newCategory.id || c.slug === newCategory.slug)) {
          return res.status(400).json({ error: 'Category ID or Slug already exists' });
        }

        categories.push(newCategory);
        createDatabaseBackup('categories');
        fs.writeFileSync(filePath, JSON.stringify(categories, null, 2), 'utf8');
        return res.status(201).json({ success: true, category: newCategory });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to write category' });
      }

    case 'PUT':
      try {
        const updatedCategory = req.body;
        const index = categories.findIndex(c => c.id === updatedCategory.id);
        if (index === -1) {
          return res.status(404).json({ error: 'Category not found' });
        }

        categories[index] = { ...categories[index], ...updatedCategory };
        createDatabaseBackup('categories');
        fs.writeFileSync(filePath, JSON.stringify(categories, null, 2), 'utf8');
        return res.status(200).json({ success: true, category: categories[index] });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to update category' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'Category ID is required' });
        }

        const filtered = categories.filter(c => c.id !== id);
        if (filtered.length === categories.length) {
          return res.status(404).json({ error: 'Category not found' });
        }

        createDatabaseBackup('categories');
        fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf8');
        return res.status(200).json({ success: true });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to delete category' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

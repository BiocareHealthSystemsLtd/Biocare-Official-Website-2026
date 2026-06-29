import fs from 'fs';
import path from 'path';
import siteConfig from '../../../data/siteConfig';
import { createDatabaseBackup } from '../../../lib/backup';

const filePath = path.join(process.cwd(), 'src/data/blog-posts.json');

function checkAuth(req) {
  const cookies = req.headers.cookie || '';
  return cookies.includes(`${siteConfig.admin.sessionCookieName}=authorized`);
}

export default async function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let posts = [];
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    posts = JSON.parse(fileContent);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read blog database' });
  }

  switch (req.method) {
    case 'GET':
      return res.status(200).json(posts);

    case 'POST':
      try {
        const newPost = req.body;
        if (!newPost.slug || !newPost.title || !newPost.excerpt || !newPost.content) {
          return res.status(400).json({ error: 'Missing required article fields' });
        }

        if (posts.some(p => p.slug === newPost.slug)) {
          return res.status(400).json({ error: 'Article Slug already exists' });
        }

        // Insert at the beginning of the array so it shows first
        posts.unshift(newPost);
        createDatabaseBackup('blog-posts');
        fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
        return res.status(201).json({ success: true, post: newPost });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to write article' });
      }

    case 'PUT':
      try {
        const updatedPost = req.body;
        const index = posts.findIndex(p => p.slug === updatedPost.slug);
        if (index === -1) {
          return res.status(404).json({ error: 'Article not found' });
        }

        posts[index] = { ...posts[index], ...updatedPost };
        createDatabaseBackup('blog-posts');
        fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
        return res.status(200).json({ success: true, post: posts[index] });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to update article' });
      }

    case 'DELETE':
      try {
        const { slug } = req.query;
        if (!slug) {
          return res.status(400).json({ error: 'Article Slug is required' });
        }

        const filtered = posts.filter(p => p.slug !== slug);
        if (filtered.length === posts.length) {
          return res.status(404).json({ error: 'Article not found' });
        }

        createDatabaseBackup('blog-posts');
        fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf8');
        return res.status(200).json({ success: true });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to delete article' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

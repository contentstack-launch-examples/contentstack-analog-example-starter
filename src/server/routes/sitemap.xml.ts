import { defineEventHandler } from 'h3';
import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler((event) => {
  try {
    // Path to sitemap.xml in the public directory
    const sitemapPath = join(process.cwd(), 'dist/analog/public/sitemap.xml');
    
    // Read the sitemap file synchronously
    const sitemap = readFileSync(sitemapPath, 'utf-8');
    
    // Set proper headers
    event.node.res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    event.node.res.setHeader('Cache-Control', 'public, max-age=3600');
    event.node.res.setHeader('Access-Control-Allow-Origin', '*');
    
    return sitemap;
  } catch (error) {
    // If file doesn't exist, return 404
    event.node.res.statusCode = 404;
    return { error: 'Sitemap not found' };
  }
});


import { Component } from '@angular/core';

@Component({
  selector: 'app-rewrite-test',
  standalone: true,
  template: `
    <div class="container">
      <h1>Edge Rewrite Test Page</h1>
      <p>This page demonstrates Edge URL Rewrites in Contentstack Launch.</p>
      
      <div class="info-section">
        <h2>Rewrite Configuration</h2>
        <p>The following routes are configured with rewrites:</p>
        <ul>
          <li><strong>/old-ssr</strong> → rewrites to <strong>/ssr</strong> (via launch.json)</li>
          <li><strong>/blog/:slug</strong> → rewrites to <strong>/blog/posts/:slug</strong> (via launch.json)</li>
          <li><strong>/rewrite-test</strong> → rewrites to <strong>/ssr</strong> (via Edge Function)</li>
        </ul>
      </div>

      <div class="test-section">
        <h2>Test Links (Using Anchor Tags)</h2>
        <p>These links use native anchor tags (&lt;a&gt;) instead of RouterLink to ensure rewrites work at the edge:</p>
        <ul>
          <li>
            <a href="/old-ssr" class="test-link">Test /old-ssr rewrite → /ssr</a>
            <span class="note">(launch.json rewrite)</span>
          </li>
          <li>
            <a href="/rewrite-test" class="test-link">Test /rewrite-test rewrite → /ssr</a>
            <span class="note">(Edge Function rewrite)</span>
          </li>
          <li>
            <a href="/blog/test-post" class="test-link">Test /blog/:slug rewrite → /blog/posts/:slug</a>
            <span class="note">(launch.json rewrite with path variable)</span>
          </li>
        </ul>
      </div>

      <div class="note-section">
        <h2>Important Note</h2>
        <p>
          <strong>When using Edge Rewrites:</strong> You must use native &lt;a&gt; tags instead of RouterLink 
          (or NuxtLink in Nuxt) to ensure the rewrite is executed at the CDN edge level. 
          RouterLink performs client-side navigation, which bypasses edge logic.
        </p>
      </div>

      <p class="back-link">
        <a href="/">← Back to Home</a>
      </p>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        font-family: system-ui, -apple-system, sans-serif;
      }
      h1 {
        color: #dd0031;
        margin-bottom: 1rem;
      }
      h2 {
        color: #333;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }
      p {
        line-height: 1.6;
        margin-bottom: 1rem;
        color: #333;
      }
      .info-section,
      .test-section,
      .note-section {
        background: #f5f5f5;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 1.5rem;
      }
      .note-section {
        background: #fff3e0;
        border-left: 4px solid #dd0031;
      }
      ul {
        list-style-type: disc;
        padding-left: 1.5rem;
        line-height: 1.8;
      }
      li {
        margin-bottom: 1rem;
        color: #333;
      }
      .test-link {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
        display: inline-block;
        margin-right: 0.5rem;
      }
      .test-link:hover {
        text-decoration: underline;
      }
      .note {
        color: #666;
        font-size: 0.9rem;
        font-style: italic;
      }
      strong {
        color: #dd0031;
      }
      .back-link {
        text-align: center;
        margin-top: 3rem;
      }
      .back-link a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }
      .back-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export default class RewriteTestPage {}

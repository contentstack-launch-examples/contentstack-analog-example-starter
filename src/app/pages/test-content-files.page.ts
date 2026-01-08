import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { injectContentFiles } from '@analogjs/content';

/**
 * TEST PAGE: Understanding injectContentFiles()
 * 
 * Visit /test-content-files to see what injectContentFiles() does
 */

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

@Component({
  selector: 'app-test-content-files',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div style="padding: 2rem; max-width: 1200px; margin: auto; font-family: system-ui;">
      <h1>🔍 Testing injectContentFiles()</h1>
      
      <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
        <h2>What does injectContentFiles() do?</h2>
        <ol style="line-height: 1.8;">
          <li><strong>Scans</strong> your <code>src/content/</code> folder (and other markdown files)</li>
          <li><strong>Reads</strong> all <code>.md</code> files it finds</li>
          <li><strong>Parses</strong> the frontmatter (YAML at the top between <code>---</code>)</li>
          <li><strong>Extracts</strong> metadata (title, slug, description, etc.)</li>
          <li><strong>Returns</strong> an array of content file objects</li>
        </ol>
      </div>

      <div style="background: #fff3e0; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
        <h2>📊 Results</h2>
        <p><strong>Total files found:</strong> {{ allFiles.length }}</p>
        <p><strong>Files matching filter:</strong> {{ filteredFiles.length }}</p>
      </div>

      <div style="margin: 2rem 0;">
        <h2>📁 All Content Files (No Filter)</h2>
        @if (allFiles.length === 0) {
          <p style="color: #dc2626;">❌ No files found! Check:</p>
          <ul>
            <li>Are markdown files in <code>src/content/</code>?</li>
            <li>Did you restart the dev server after creating files?</li>
            <li>Check browser console for filename patterns</li>
          </ul>
        } @else {
          <div style="display: grid; gap: 1rem;">
            @for (file of allFiles; track file.filename) {
              <div style="background: white; padding: 1rem; border-radius: 8px; border: 1px solid #e5e7eb;">
                <h3 style="margin: 0 0 0.5rem 0; color: #2563eb;">{{ file.filename }}</h3>
                <pre style="background: #f9fafb; padding: 0.5rem; border-radius: 4px; overflow-x: auto; font-size: 0.875rem;">{{ file.attributes | json }}</pre>
              </div>
            }
          </div>
        }
      </div>

      <div style="margin: 2rem 0;">
        <h2>✅ Filtered Files (From src/content/)</h2>
        @if (filteredFiles.length === 0) {
          <p style="color: #dc2626;">❌ No files match the filter!</p>
          <p>Check the "All Content Files" section above to see what filenames look like.</p>
        } @else {
          <div style="display: grid; gap: 1rem;">
            @for (file of filteredFiles; track file.filename) {
              <div style="background: #ecfdf5; padding: 1rem; border-radius: 8px; border: 2px solid #10b981;">
                <h3 style="margin: 0 0 0.5rem 0; color: #059669;">{{ file.attributes.title || 'No title' }}</h3>
                <p style="margin: 0.5rem 0; color: #666;"><strong>Slug:</strong> {{ file.attributes.slug }}</p>
                <p style="margin: 0.5rem 0; color: #666;"><strong>Filename:</strong> {{ file.filename }}</p>
                <details style="margin-top: 0.5rem;">
                  <summary style="cursor: pointer; color: #2563eb;">View Full Attributes</summary>
                  <pre style="background: #f9fafb; padding: 0.5rem; border-radius: 4px; overflow-x: auto; font-size: 0.875rem; margin-top: 0.5rem;">{{ file.attributes | json }}</pre>
                </details>
              </div>
            }
          </div>
        }
      </div>

      <div style="background: #eff6ff; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
        <h2>💡 How to Use This</h2>
        <ol style="line-height: 1.8;">
          <li>Look at "All Content Files" to see what Analog.js discovers</li>
          <li>Check the filename patterns - they might be different than expected</li>
          <li>See "Filtered Files" to verify your filter function works</li>
          <li>Use this info to fix the filter in <code>blog.page.ts</code></li>
        </ol>
      </div>

      <p style="margin-top: 2rem;">
        <a href="/blog" style="color: #2563eb; text-decoration: none;">← Back to Blog</a>
      </p>
    </div>
  `,
})
export default class TestContentFilesComponent {
  // Get ALL content files without any filter
  readonly allFiles = injectContentFiles<PostAttributes>();

  // Get files matching our filter (same as blog.page.ts)
  readonly filteredFiles = injectContentFiles<PostAttributes>((contentFile) => {
    const filename = contentFile.filename;
    const isInContentDir = 
      filename.includes('src/content/') ||
      (filename.includes('content/') && !filename.includes('app/pages'));
    const isMarkdown = filename.endsWith('.md');
    return isInContentDir && isMarkdown;
  });

  constructor() {
    // Log everything to console for debugging
    console.log('=== injectContentFiles() Test ===');
    console.log('Total files found:', this.allFiles.length);
    console.log('Filtered files:', this.filteredFiles.length);
    
    if (this.allFiles.length > 0) {
      console.log('\n📁 All filenames:');
      this.allFiles.forEach((file, i) => {
        console.log(`  ${i + 1}. ${file.filename}`);
        console.log(`     Attributes:`, file.attributes);
      });
    } else {
      console.warn('⚠️ No content files found at all!');
      console.warn('This might mean:');
      console.warn('  1. Content files don\'t exist in src/content/');
      console.warn('  2. Dev server needs restart');
      console.warn('  3. Content plugin not configured correctly');
    }

    if (this.filteredFiles.length > 0) {
      console.log('\n✅ Filtered files:');
      this.filteredFiles.forEach((file, i) => {
        console.log(`  ${i + 1}. ${file.filename} - ${file.attributes.title}`);
      });
    } else {
      console.warn('\n⚠️ No files match the filter!');
      console.warn('Check filenames above to adjust the filter.');
    }
  }
}


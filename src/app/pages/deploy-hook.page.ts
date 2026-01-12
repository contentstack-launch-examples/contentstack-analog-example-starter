import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deploy-hook',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>🚀 Deploy Hook</h1>
      <p>This page demonstrates Contentstack Launch Deploy Hook functionality.</p>
      <p>Click the button below to trigger a deployment using the Deploy Hook URL.</p>
      
      <div class="info-section">
        <h2>Deploy Hook Information</h2>
        <ul>
          <li><strong>Page Type:</strong> SSR (Server-Side Rendering)</li>
          <li><strong>Rendering Mode:</strong> Rendered on-demand</li>
          <li><strong>Functionality:</strong> Trigger deployment via POST request</li>
          <li><strong>Documentation:</strong> <a href="https://www.contentstack.com/docs/developers/launch/deploy-hooks" target="_blank" rel="noopener noreferrer">Contentstack Deploy Hooks</a></li>
        </ul>
      </div>

      <div class="deploy-section">
        <h2>Trigger Deployment</h2>
        <div class="hook-info" *ngIf="deployHookUrl">
          <p><strong>Deploy Hook URL:</strong></p>
          <code class="url-display">{{ deployHookUrl }}</code>
        </div>
        <div class="hook-info" *ngIf="!deployHookUrl">
          <p class="warning">⚠️ Deploy Hook URL not configured. Please set VITE_DEPLOY_HOOK_URL environment variable.</p>
        </div>
        
        <div class="button-container">
          <button
            (click)="triggerDeployHook()"
            [disabled]="isLoading() || !deployHookUrl"
            [class]="getButtonClass()"
          >
            <span *ngIf="isLoading()" class="button-content">
              <svg class="spinner" viewBox="0 0 24 24">
                <circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Triggering Deployment...</span>
            </span>
            <span *ngIf="!isLoading()" class="button-content">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Trigger Deployment</span>
            </span>
          </button>
        </div>

        <div *ngIf="message()" [class]="getMessageClass()">
          {{ message() }}
        </div>

        <div class="response-section" *ngIf="responseData()">
          <h3>Response:</h3>
          <pre>{{ responseData() | json }}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
        font-family: system-ui, -apple-system, sans-serif;
      }
      h1 {
        color: #dd0031;
        margin-bottom: 1rem;
        font-size: 2.5rem;
      }
      h2 {
        color: #333;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }
      h3 {
        color: #333;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
      }
      p {
        line-height: 1.6;
        margin-bottom: 1rem;
        color: #333;
      }
      .info-section {
        background: #f5f5f5;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 1.5rem;
      }
      .deploy-section {
        background: #e3f2fd;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 1.5rem;
        border-left: 4px solid #2196f3;
      }
      .hook-info {
        background: white;
        padding: 1rem;
        border-radius: 6px;
        margin: 1rem 0;
        border-left: 3px solid #2196f3;
      }
      .hook-info .warning {
        color: #d32f2f;
        font-weight: 500;
      }
      .url-display {
        display: block;
        padding: 0.75rem;
        background: #f5f5f5;
        border-radius: 4px;
        word-break: break-all;
        font-family: 'Monaco', 'Courier New', monospace;
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
      .button-container {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      button:active:not(:disabled) {
        transform: translateY(0);
      }
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .button-primary {
        background: #2196f3;
        color: white;
      }
      .button-primary:hover:not(:disabled) {
        background: #1976d2;
      }
      .button-primary:active:not(:disabled) {
        background: #1565c0;
      }
      .button-loading {
        background: #9e9e9e;
        color: white;
      }
      .button-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .icon {
        width: 1rem;
        height: 1rem;
      }
      .spinner {
        width: 1rem;
        height: 1rem;
        animation: spin 1s linear infinite;
      }
      .spinner-circle {
        opacity: 0.25;
      }
      .spinner-path {
        opacity: 0.75;
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .message {
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        max-width: 500px;
        margin-top: 1rem;
        border: 1px solid;
      }
      .message-success {
        background: #d4edda;
        color: #155724;
        border-color: #c3e6cb;
      }
      .message-error {
        background: #f8d7da;
        color: #721c24;
        border-color: #f5c6cb;
      }
      .response-section {
        margin-top: 1.5rem;
        padding: 1rem;
        background: white;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
      }
      .response-section pre {
        margin: 0;
        padding: 0.75rem;
        background: #f5f5f5;
        border-radius: 4px;
        overflow-x: auto;
        font-family: 'Monaco', 'Courier New', monospace;
        font-size: 0.875rem;
      }
      ul {
        list-style-type: disc;
        padding-left: 1.5rem;
        line-height: 1.8;
      }
      li {
        margin-bottom: 0.5rem;
        color: #333;
      }
      strong {
        color: #dd0031;
      }
      a {
        color: #2196f3;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      code {
        color: #d32f2f;
      }
    `,
  ],
})
export default class DeployHookPage {
  isLoading = signal<boolean>(false);
  message = signal<string>('');
  responseData = signal<any>(null);

  // Get deploy hook URL from environment variable
  deployHookUrl = import.meta.env['VITE_DEPLOY_HOOK_URL'];

  getButtonClass(): string {
    return this.isLoading()
      ? 'button-loading'
      : 'button-primary';
  }

  getMessageClass(): string {
    return this.message().includes('✅') || this.message().includes('successfully')
      ? 'message message-success'
      : 'message message-error';
  }

  async triggerDeployHook(): Promise<void> {
    if (!this.deployHookUrl) {
      this.message.set('❌ Deploy Hook URL is not configured.');
      return;
    }

    this.isLoading.set(true);
    this.message.set('');
    this.responseData.set(null);

    try {
      const response = await fetch(this.deployHookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      this.responseData.set(data);

      if (response.ok) {
        this.message.set('✅ Deployment triggered successfully!');
        // Clear message after 5 seconds
        setTimeout(() => {
          this.message.set('');
        }, 5000);
      } else {
        this.message.set(
          `❌ Failed to trigger deployment. Status: ${response.status}`
        );
      }
    } catch (error) {
      this.responseData.set({ error: error instanceof Error ? error.message : 'Unknown error' });
      this.message.set(
        `❌ Error triggering deployment: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      this.isLoading.set(false);
    }
  }
}


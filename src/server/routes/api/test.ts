import { defineEventHandler } from 'h3';

export default defineEventHandler(() => ({
  message: 'Test API endpoint',
  status: 'success',
  timestamp: new Date().toISOString(),
  data: {
    version: '1.0.0',
    description: 'This is a test API endpoint created for Analog.js',
  },
}));


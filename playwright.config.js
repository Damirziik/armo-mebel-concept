import { defineConfig } from '@playwright/test';

const externalBaseUrl = process.env.BASE_URL;

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: { baseURL: externalBaseUrl || 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  webServer: externalBaseUrl ? undefined : { command: 'npm run preview', port: 4173, reuseExistingServer: true }
});

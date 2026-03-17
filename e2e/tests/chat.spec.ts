import { test, expect } from '@playwright/test';

test('A user can log in, navigate, and send a real-time message in a circle', async ({
  page,
}) => {
  await page.goto('/login');

  await page.getByPlaceholder('helloworld@gmail.com').fill('admin@test.com');
  await page.getByPlaceholder('••••••••').fill('password1234');

  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  await page.waitForURL('**/home');
  await page.click('text=My circle(s)');

  await page.click('text=Spanish fun club!');

  const input = page.getByPlaceholder('Write your message...');
  await expect(input).toBeVisible({ timeout: 10000 });

  const testMessage = 'e2e test for chatting in a circle!';
  await input.fill(testMessage);
  await input.press('Enter');

  const sentMessage = page.getByText(testMessage);
  await expect(sentMessage).toBeVisible({ timeout: 10000 });
});

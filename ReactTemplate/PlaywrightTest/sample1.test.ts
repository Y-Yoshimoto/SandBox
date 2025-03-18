import { test, expect, Page } from '@playwright/test';

test('ページタイトル取得', async ({ page }: { page: Page }) => {
    await page.goto('/');
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle('Vite App');
});

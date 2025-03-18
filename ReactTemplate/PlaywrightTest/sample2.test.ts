import { test, expect, Page } from '@playwright/test';

test('ボタンのテキストを確認する', async ({ page }: { page: Page }) => {
    await page.goto('/');
    // 全てのボタンのテキストを取得
    const [primaryButtonText, secondaryButtonText, clearButtonText] = await Promise.all([
        page.textContent('[data-testid="button-primary"]'),
        page.textContent('[data-testid="button-secondary"]'),
        page.textContent('[data-testid="button-clear"]')
    ]);
    expect(primaryButtonText).toBe('primary');
    expect(secondaryButtonText).toBe('secondary');
    expect(clearButtonText).toBe('clear');
});

test('ボタンをクリックしてテキストを変更する', async ({ page }: { page: Page }) => {
    await page.goto('/');
    // data-testid="button-primary"のボタンをクリックする
    await page.click('[data-testid="button-primary"]');

    // data-testid="text-label"のテキストがprimaryであることを確認
    await page.textContent('[data-testid="text-label"]').then((textLabel) => {
        expect(textLabel).toBe('primary');
    });
});


test('プロミス内でテスト実施する', async ({ page }: { page: Page }) => {
    return page.goto('/').then(() => {
        const actionCallback = () => clickButton(page, '[data-testid="button-secondary"]');
        const expextCallback = () => expectCheckText(page, '[data-testid="text-label"]', 'secondary');
        return testSet(actionCallback, expextCallback);
    });
});

// テキストの内容を確認する
const expectCheckText = (page: Page, textSelector: string, expectedText: string) => {
    return page.textContent(textSelector).then(text => expect(text).toBe(expectedText));
};

// ボタンをクリックして期待結果を確認する
const clickButton = (page: Page, buttonSelector: string) => page.click(buttonSelector);
// テスト実施
const testSet = (actionCallback: () => Promise<void>, expextCallback: () => Promise<void>) => {
    return actionCallback().then(() => expextCallback());
};
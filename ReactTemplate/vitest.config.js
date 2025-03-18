import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// テストの実行環境のタイムゾーンを環境変数から取得
process.env.TZ = "Asia/Tokyo";
// テストの実行環境の言語を環境変数から取得
// process.env.LANG = "ja_JP.UTF-8";

import * as path from "path";
export default defineConfig({
    plugins: [react()],
    test: {
        reporters: 'default',
        globals: true,
        environment: "jsdom",
        include: ["./src/**/*.{test,spec}.{js, ts, jsx, tsx}", "'./src/**/*.{test,spec}.?(c|m)[jt]s?(x)'"], alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        // https://vitest.dev/guide/coverage.html#coverage
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
        },
        // https://vitest.dev/guide/browser/
        browser: {
            provider: 'playwright',
            enabled: true,
            name: 'chromium',
            headless: true,
        },
    },
});
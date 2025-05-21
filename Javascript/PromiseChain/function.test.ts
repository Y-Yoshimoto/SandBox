// テスト対象関数
import { _func } from './function';

//テストパターン
const testPattern = [
    { in: , out:  },
]

test('test', () => {
    testPattern.map(t => {
        expect(_func(t.in)).toBe(t.out);
    })
});
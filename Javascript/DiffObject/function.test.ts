// テスト対象関数
import { objectDiffFunctison } from './function';

//テストパターン
const testPattern = [
    {
        in: [{ a: 1, b: 2 }, { a: 1, b: 2 }],
        out: { diff: false, diffObj: {} }
    },
    {
        in: [{ a: 1 }, { a: 1, b: 2 }],
        out: { diff: true, diffObj: { b: 2 } }
    },
    {
        in: [{ a: 1, b: 2 }, { a: 1 }],
        out: { diff: true, diffObj: { b: null } }
    },
    {
        in: [{ a: "a" }, { a: "b" }],
        out: { diff: true, diffObj: { a: "b" } }
    },
    {
        in: [{ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }],
        out: { diff: true, diffObj: { b: { c: 3 } } }
    },
    {
        in: [{ a: 1, b: { c: 'c', d: 'd' } }, { a: 1, b: { c: 'c', d: 'd2' } }],
        out: { diff: true, diffObj: { b: { d: 'd2' } } }
    },
    {
        in: [{ a: 1, b: [1, 2, 3] }, { a: 1, b: [1, 2, 4] }],
        out: { diff: true, diffObj: { b: [1, 2, 4] } }
    },
    {
        in: [{ a: 1 }, { a: 1, b: [1, 2, 4] }],
        out: { diff: true, diffObj: { b: [1, 2, 4] } }
    },
    {
        in: [{ a: 1, b: [1, 2, 3] }, { a: 1, b: 'text' }],
        out: { diff: true, diffObj: { b: 'text' } }
    },
    {
        in: [{ a: 1, b: { c: 'c', d: 'd2' } }, { a: 1, b: null }],
        out: { diff: true, diffObj: { b: null } }
    },
    {
        in: [{ a: 1, b: null }, { a: 1, b: { c: 'c', d: 'd2' } }],
        out: { diff: true, diffObj: { b: { c: 'c', d: 'd2' } } }
    }

]

test('test', () => {
    testPattern.map(t => {
        // console.log(t.in);
        expect(objectDiffFunctison(t.in[0], t.in[1])).toEqual(t.out);
    })
});
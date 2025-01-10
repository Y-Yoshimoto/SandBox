// obj[key]の形式でアクセスための型鄭羲
type ComparisonObj = {
    [key: string]: any
}
// 差分対象オブジェクト全体
type ComparisonObjs = {
    objA: ComparisonObj,
    objB: ComparisonObj
}
// 差分対象の値
type ComparisonValueAndKey = {
    key: string,
    valueA: any,
    valueB: any
}
// console.log("objectDiffFunctison()");
// ディープコピー(https://developer.mozilla.org/ja/docs/Glossary/Deep_copy)
// const orgObj = structuredClone(objA); // 参考

// オブジェクト差分抽出関数
export const objectDiffFunctison = (objA: ComparisonObj, objB: ComparisonObj) => {
    // JSON化してオブジェクトを比較して差分がなければ差分なしとする
    if (!ComparisonOfJson({ objA, objB })) return { diff: false, diffObj: {} };
    // 2つのオブジェクトの全てのキーを生成する。
    const diffValueList = allKeys({ objA, objB })
        .map((key: string): any => diffValue({ objA, objB, key }));
    return { diff: true, diffObj: Object.assign({}, ...diffValueList) };
}

// 値を比較して差分を抽出するコア関数
const diffValue = ({ objA, objB, key }: ComparisonObjs & { key: string }) => {
    // 値がオブジェクトの場合は再帰的に差分を抽出する
    const typeValue = checkTypeValue(objA[key], objB[key]);
    // console.log(`type of ${key}: ${typeValue}`);
    // 比較対象の型によって差分抽出の方法を変える
    switch (typeValue) {
        case 'invalid':
            return diffInvalid({ valueA: objA[key], valueB: objB[key], key });
        case 'array':
            return diffArray({ valueA: objA[key], valueB: objB[key], key });
        case 'object':
            return diffObject({ valueA: objA[key], valueB: objB[key], key });
        case 'validPrimitive':
        default:
            return diffPrimitive({ valueA: objA[key], valueB: objB[key], key });
    }
};

// ------------------- 内部関数 --------------------------------
// 2つのオブジェクトの全てのキーリストを生成する
const allKeys = ({ objA, objB }: ComparisonObjs) => {
    return Array.from(new Set([...Object.keys(objA), ...Object.keys(objB)]));
};
// JSON化してオブジェクトを比較する(差分があればtrueを返す)
const ComparisonOfJson = ({ objA, objB }: ComparisonObjs) => {
    return JSON.stringify(objA) !== JSON.stringify(objB);
};
// 値がnull || undefinedか判定する
const isInvalid = (value: any) => value === null || value === undefined;


// 比較対象型判別関数(ToDO / UnitTest 対象にできる関数, else処理の厳密化が必要)
const checkTypeValue = (valueA: any, valueB: any) => {
    if (isInvalid(valueA) || isInvalid(valueB)) return 'invalid';
    if (Array.isArray(valueA) || Array.isArray(valueB)) return 'array';
    if (typeof valueA === 'object' || typeof valueB === 'object') return 'object';
    return 'validPrimitive';
};

// -------------------- 各値の差分抽出関数 -------------------------------- 
// リストの差分を抽出する Json比較で差分があれば差分を抽出する
const diffArray = ({ valueA, valueB, key }: ComparisonValueAndKey) => {
    return ComparisonOfJson({ objA: valueA, objB: valueB }) ? { [key]: valueB } : null;
};
// オブジェクトの差分を再起的に抽出する(メイン関数を再起的に利用)
const diffObject = ({ valueA, valueB, key }: ComparisonValueAndKey) => {
    const re: any = objectDiffFunctison(valueA, valueB);
    return re.diff ? { [key]: re.diffObj } : null;
};
// 有効なプリミティブ型の差分を抽出する
const diffPrimitive = ({ valueA, valueB, key }: ComparisonValueAndKey) => {
    return valueA !== valueB ? { [key]: valueB } : null;
};
// invalid値(null, undefind)の差分を抽出する
const diffInvalid = ({ valueA, valueB, key }: ComparisonValueAndKey) => {
    if (isInvalid(valueA)) return { [key]: valueB };
    if (isInvalid(valueB)) return { [key]: null };
    return null;
};
// ----------------------------------------------------------------------

// 動作確認用
if (require.main === module) {
    console.debug("Direct execution.");
    console.time('ProcessingTime: ');

    // const re = objectDiffFunctison({ a: 1, b: 2 }, { a: 1, b: 2 });
    // const re = objectDiffFunctison({ a: "a" }, { a: "b" });
    // const re = objectDiffFunctison({ a: "a" }, { a: "a", b: "b" });
    // const re = objectDiffFunctison({ a: "a", b: "b" }, { a: "b" });
    // const re = objectDiffFunctison({ a: 1, b: { c: 'c' } }, { a: 1, b: { c: 'd' } });
    // const re = objectDiffFunctison({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } });
    // const re = objectDiffFunctison({ a: 1, b: { c: 'c', d: 'd' } }, { a: 1, b: { c: 'c', d: 'd2' } });
    // const re = objectDiffFunctison({ a: 1, b: [1, 2, 3] }, { a: 1, b: [1, 2, 4] });

    //const re = objectDiffFunctison({ a: 1, b: null }, { a: 1, b: { c: 'c', d: 'd2' } });
    const re = objectDiffFunctison({ a: 1, b: { c: 'c', d: 'd2' } }, { a: 1 });


    console.log(re);

    console.timeEnd('ProcessingTime: ');
}


// 関数宣言
export const promiseChain = () => {

}

const consoleLogAndDate = (message: string) => {
    console.log(`${new Date().toISOString()}: ${message}`);
};
// 指定ms秒に履行するPromiseを返す関数
const timer = (ms: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            consoleLogAndDate(`wait ${ms} ms`);
            return resolve(ms);
        }, ms);
    });
};
// 指定ms秒に拒否するPromiseを返す関数
const timerReject = (ms: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            consoleLogAndDate(`wait ${ms} ms`);
            return reject(new Error(`wait ${ms} ms`));
        }, ms);
    });
};

// 基底値を返す基底プロミスを生成する関数
const accPromise = (acc: any) => {
    return new Promise((resolve) => resolve(acc));
};

// プロミスのリストと基底のプロミスを受け取りチェーンする関数型
type PromiseReducer<T> = (acc: Promise<T>, PromiseList: Array<(arg: T) => Promise<T>>) => Promise<T>;
// プロミスのリストと基底のプロミスを受け取りチェーンする関数
const promiseReducer: PromiseReducer<any> = (acc, PromiseList) => {
    return PromiseList.reduce((acc, cur: (arg: any) => Promise<any>) => {
        return acc.then((re) => cur(re));
    }, acc);
};

// 動作確認用
if (require.main === module) {

    // 成功時のプロミス
    const timeList = [(s: number) => timer(s + 100), (s: number) => timer(s + 200), (s: number) => timer(s + 300)];
    const prom1 = promiseReducer(accPromise(1000), timeList);
    prom1.then(re => { console.log(`End re: ${re}`); return re; });

    // 途中で失敗するプロミス
    const timeList2 = [(s: number) => timer(s + 110), (s: number) => timerReject(s + 210), (s: number) => timer(s + 310)];
    const prom2 = promiseReducer(accPromise(1000), timeList2);
    prom2.then(re => { console.log(`End re: ${re}`); return re; })
        .catch((err) => { console.log(`End err: ${err}`); });

}

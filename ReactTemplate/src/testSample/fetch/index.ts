// vitestの動作環境確認サンプルコード
// React
import { useState, useRef, useEffect } from 'react';

// テスト対象のカスタムフック
const useFetch = <T>({ url = './api/sample' }: { url: string }) => {
    // レスポンス
    const [response, setResponse] = useState<T | null>(null);
    const loadingRef = useRef(false);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        if (!loadingRef.current) {
            loadingRef.current = true;
            fetch(url)
                .then((res) => {
                    if (!res.ok) throw new Error(res.statusText);
                    return res.json();
                })
                .then((json) => {
                    setResponse(json);
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => {
                    loadingRef.current = false;
                });
        }
    }, [url]);
    return { response, loading: loadingRef.current, error };
}

export default useFetch;
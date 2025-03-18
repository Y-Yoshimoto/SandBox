// vitestの動作環境確認サンプルコード
import { describe, it, expect, vi } from 'vitest';

// テスト対象の関数
import useFetch from '.';
import { renderHook, waitFor } from "@testing-library/react"

// fetchの成功を返す関数
const genMockFetch = ({ bodyObj = {}, status = 200, statusText = "" }) => {
    const body = JSON.stringify(bodyObj);
    return vi.spyOn(globalThis, 'fetch')
        .mockResolvedValue(new Response(body, { status, statusText }));
};

// fetchのエラーを返す関数(ネットワークエラー)
const genMockFetchError = (error: Error) => {
    return vi.spyOn(globalThis, 'fetch')
        .mockRejectedValue(error);
};

describe('Fetchモック動作確認', () => {
    it('サンプルテスト 200', async () => {
        const data = { message: 'Hello, World!' };
        const _ = genMockFetch({ bodyObj: data });
        const { result } = renderHook(() => useFetch<{ message: string }>({ url: './api/sample' }));
        await waitFor(() => {
            expect(result.current.response).toEqual(data);
            // console.log(result.current)
        });
    });

    it('サンプルテスト 404', async () => {
        const _ = genMockFetch({ bodyObj: {}, status: 404, statusText: 'Not Found' });
        const { result } = renderHook(() => useFetch<{ message: string }>({ url: './api/sample' }));
        await waitFor(() => {
            expect(result.current.error?.message).toEqual('Not Found');
            // console.log(result.current)
        });
    });

    it('サンプルテスト ネットワークエラー', async () => {
        const error = new Error('Network Error');
        const _ = genMockFetchError(error);
        const { result } = renderHook(() => useFetch<{ message: string }>({ url: './api/sample' }));
        await waitFor(() => {
            expect(result.current.error?.message).toEqual('Network Error');
            // console.log(result.current)
        });
    });

});



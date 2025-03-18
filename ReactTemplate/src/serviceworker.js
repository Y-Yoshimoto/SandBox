//サービスワーカ
//FetchEventを中継する
self.addEventListener("fetch", (event) => {
    if (event.request.url.includes('/api')) {
        console.debug("SW fetch API", event.request.url);
        //console.dir(event.request.headers);
        event.respondWith(fetch(event.request, { headers: { 'Authorization': 'Bearer your_token_here' } }));
    }
});


// トークン受け取り処理
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SET_TOKEN') {
        const token = event.data.token;
        // トークンを保存する処理
        console.log('Token set:', token);
    }
});

/* // トークン追加アプリケーション実装例
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
        const token = 'myToken'; // 設定するトークン
        registration.active.postMessage({ type: 'SET_TOKEN', token });
    });
}*/
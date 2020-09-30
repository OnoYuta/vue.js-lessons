var app = new Vue({ 
    el: '#app',
    data: {
        message: 'こんにちは!',
        message_ja: 'こんにちは!',
        message_en: 'Hello!',
        lang: 'en',
        pSize: '40px',
        isCapital: true,
        products: [
            {code: 'A01', name: 'プロダクトA'},
            {code: 'B01', name: 'プロダクトB'},
            {code: 'C01', name: 'プロダクトC'},
        ],
        price: 100,
    }
});

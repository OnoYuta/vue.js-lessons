var ball = new Vue({ 
    // HTML要素とコンポーネントを結びつける
    el: '#ball',
    // 下記のように関数でHTML要素を取得することもできる
    // el: document.querySelector('#ball'),

    // コンポーネントにデータを持たせる
    data: {
        pos: {x: 0, y: 0},
        redius: 20,
    },

    // コンポーネントのもつメソッドを定義する
    methods: {
        move: function(x, y) {
            this.pos.x += x;
            this.pos.y += y;
        },
    },
});
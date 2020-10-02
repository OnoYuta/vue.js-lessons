var app = new Vue({ 
    el: '#app',
    data: {
        stock: 10,
        message: '',
    },
    methods: {
        onDeleteItem: function() {
            this.stock--;
        },
    },
    watch: {
        // 在庫が変化したとき呼び出されるハンドラ
        // 第一引数に変化後の値、第二引数に変化前の値を受け取る
        stock: function(newStock, oldStock) {
            if (newStock == 0){
                this.message = '売り切れ';
            }
        }
    },
    // 算出プロパティを用いる場合
    computed: {
        statusMessage:function(){
            if (this.stock == 0){
                return '売り切れ';
            }
            return '';
        },
    }
})

let app = new Vue({
    el: '#app',
    data: {
        // セール対象のチェック状態
        isSaleFilterChecked: false,
        // 送料無料のチェック状態
        isDelvFreeFilterChecked: false,
        // 並び替え方法（1:標準、2:価格が安い順）
        sortOrder: 1,
        // 商品リスト
        items: [
            {
                id: 1,
                name: 'Michael<br>スマホケース',
                price: 1580,
                image: "images/01.jpg",
                delv: 0,
                isSale: true,
            },
            {
                id: 2,
                name: 'Raphael<br>スマホケース',
                price: 1580,
                image: "images/02.jpg",
                delv: 0,
                isSale: true,
            },
            {
                id: 3,
                name: 'Gabriel<br>スマホケース',
                price: 1580,
                image: "images/03.jpg",
                delv: 240,
                isSale: true,
            },
            {
                id: 4,
                name: 'Uriel<br>スマホケース',
                price: 980,
                image: "images/04.jpg",
                delv: 0,
                isSale: false,
            },
            {
                id: 5,
                name: 'Ariel<br>スマホケース',
                price: 980,
                image: "images/05.jpg",
                delv: 0,
                isSale: false,
            },
            {
                id: 6,
                name: 'Azrael<br>スマホケース',
                price: 1580,
                image: "images/06.jpg",
                delv: 0,
                isSale: false,
            },
        ],
        // 残り時間（ミリ秒）
        // leftMs: 20000,
        // timer: null,
    },
    filters: {
        number_format: function(val){
            return val.toLocaleString();
        },
        // ms_format: function(val) {
        //     let s = Math.floor(val / 1000);
        //     let ms = val % 1000 / 100;
        //     return ('00' + s).slice(-2) + '.' + ('0' + ms).slice(-1);
        // }
    },
    watch: {
        saleFilter: function(newVal, oldVal) {
            console.log('sale filter checked');
        },
        delvFilter: function(newVal, oldVal) {
            console.log('delv filter checked');
        },
    },
    computed: {
        // リアクティブデータ(isDelvFreeFilterCheckedなど)が変更されたときに再評価される
        processedItems: function() {

            // 絞り込み条件に一致する商品のみ絞り込む
            let newItems = this.filter(this.items);

            // 商品を指定した並び順に並び替える
            newItems = this.sort(newItems);

            return newItems;
        },
        // 表示中の商品の数
        count: function() {
            return this.processedItems.length;
        }
    },
    methods: {
        filter: function(items) {
            let newItems = [];

            for (let i = 0; i < items.length; i++) {
                let isShow = true;

                // セール対象にチェックがあり、商品がセール対象でない場合
                if (this.isSaleFilterChecked && ! items[i].isSale) {
                    isShow = false;
                }

                // 送料無料にチェックがあり、商品の送料が0円でない場合
                if (this.isDelvFreeFilterChecked && items[i].delv > 0) {
                    isShow = false;
                }

                if (isShow) {
                    newItems.push(items[i]);
                }
            }

            return newItems;
        },
        sort: function(items) {
            if (this.sortOrder === 2) {
                items.sort(function(a, b) {
                    return a.price - b.price;
                })
            }
            return items;
        },
        // countDown: function() {
        //     if(this.leftMs > 0) {
        //         setTimeout(() => {
        //             this.leftMs -= 100;
        //             this.countDown();
        //         }, 100);
        //     }
        // }
    },
    // created: function() {
    //     this.countDown();
    // }
});

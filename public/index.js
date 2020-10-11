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
        items: [],
        // エラーの有無
        isError: false,
        message: '',
    },
    filters: {
        number_format: function(val){
            return val.toLocaleString();
        },
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
        getItems: function() {
            let url = 'http://localhost/index.php';
            $.ajax({
                url: url,
                type: "GET",
                dataType: 'json',
            }).done(function(data, textStatus, jqXHR) {
                console.log('通信が成功しました');
                // bind()でthisの参照するオブジェクトをvueに指定する
                this.items = data;
            }.bind(this)).fail(function(jqXHR, textStatus, errorThrown) {
                console.log('通信が失敗しました');
                this.isError = true;
                this.message = '商品の取り込みに失敗しました。';
            }.bind(this));
        }
    },
    created: function() {
        this.getItems();
    }
});

var app = new Vue({ 
    el: '#app',
    data: {
        selectedCategoryId: '',
        categories: [
            {id: 'cg1', name: '和食'},
            {id: 'cg2', name: '中華'},
            {id: 'cg3', name: 'イタリアン'},
            {id: 'cg4', name: 'フレンチ'},
        ],
        selectedItemId: '',
        items: [
            {id: 'it1', categoryId: 'cg1', name: '寿司'},
            {id: 'it2', categoryId: 'cg1', name: 'そば'},
            {id: 'it3', categoryId: 'cg1', name: '天ぷら'},
            {id: 'it4', categoryId: 'cg2', name: 'ラーメン'},
            {id: 'it5', categoryId: 'cg2', name: '餃子'},
            {id: 'it6', categoryId: 'cg2', name: '青椒肉絲'},
            {id: 'it7', categoryId: 'cg3', name: 'マルゲリータピザ'},
            {id: 'it8', categoryId: 'cg3', name: 'ナポリタン'},
            {id: 'it9', categoryId: 'cg4', name: 'キッシュ'},
        ]
    },
    methods: {
    },
    computed: {
        selectedCategory: function (){
            // findメソッドで、idが一致する最初のカテゴリを取得する
            let category = this.categories.find(category => category.id === this.selectedCategoryId);

            // アイテムが選択された後にカテゴリを再選択した場合はアイテムをリセットする
            this.selectedItemId = '';

            return category ? category : {id: '', name: '未選択'};
        },
        filteredItems: function (){
            // filterメソッドで、カテゴリidの一致するすべてのアイテムを取得する
            let found = this.items.filter(item => item.categoryId === this.selectedCategoryId);

            return found ? found : null;
        },
        selectedItem: function (){
            let item = this.items.find(item => item.id === this.selectedItemId);
            
            return item ? item : {id: '', name: '未選択'};
        },
    }
})
let app = new Vue({
    el: '#app',
    data: {
        items: [
            {id: 1, name: 'スマホケース1', price: 980},
            {id: 2, name: 'スマホケース2', price: 980},
            {id: 3, name: 'スマホケース3', price: 1580},
            {id: 4, name: 'スマホケース4', price: 1580},
            {id: 5, name: 'スマホケース5', price: 1580},
            {id: 6, name: 'スマホケース6', price: 980},
        ]
    },
    components: {
        'my-component': myComponent,
    },
    methods: {
        priceDown: function() {
            this.price = Math.max(this.price - 50, 500);
        }
    }
});
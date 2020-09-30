// 汎用的なフィルターはVue.filter()メソッドでグローバルスコープに登録し、全コンポーネントから利用できる
Vue.filter('number_format', function(val){
    return val.toLocaleString() + '円';
});

// Vue.filter()は、new Vue()よりも前に定義する必要があるので注意する
var app = new Vue({ 
    el: '#app',
    data: {
        price: 10000,
    },
    filters: {
        local_number_format: function(val){
            return val.toLocaleString() + '円（ローカル）';
        }
    }
});

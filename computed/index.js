var app = new Vue({ 
    el: '#app',
    data: {
        year: (new Date()).getFullYear(),
        show: true,
    },
    methods: {
        now1: function() {
            return (new Date()).toLocaleString();
        },
    },
    computed: {
        // 今年が閏年か判定する算出プロパティ
        isUrudoshi: function() {
            return ((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0);
        },
        now2: function() {
            return (new Date()).toLocaleString();
        }
    },
});

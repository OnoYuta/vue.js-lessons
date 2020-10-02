var app = new Vue({ 
    el: '#app',
    data: {
        stock: 10,
        width: window.innerWidth,
        height: window.innerHeight,
        point: {
            x: 0,
            y: 0,
        },
    },
    created: function() {
        addEventListener('resize', this.resizeHandler);
        addEventListener('mousemove', this.mousemoveHnadler);
    },
    beforeDestory: function() {
        removeEventListener('resize', this.resizeHandler);
        removeEventListener('mousemove', this.mousemoveHnadler);
    },
    methods: {
        onDeleteItem: function() {
            this.stock--;
        },
        resizeHandler: function($event) {
            this.width = $event.target.innerWidth;
            this.height = $event.target.innerHeight;
        },
        mousemoveHnadler:function($event){
            this.point.x = $event.clientX;
            this.point.y = $event.clientY;
        }
    },
})

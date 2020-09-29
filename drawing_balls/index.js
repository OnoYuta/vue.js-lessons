var app = new Vue({ 
    el: '#app',
});

// Movableオブジェクトの定義
var Movable = function(x, y) {
    this.pos = {
        x: x,
        y: y,
    };
    this.move = function(x, y){
        this.pos.x += x;
        this.pos.y += y;
    }
}

// 100個のボールインスタンスを生成する
var balls = [];
for(var i = 0; i < 100; i++){
    balls[i] = new Movable(
        Math.floor(Math.random() * window.innerWidth),
        Math.floor(Math.random() * window.innerHeight)
    );
}

// 100個のボールインスタンスを描画する
for(var i = 0; i < 100; i++){
    document.write('<div class="ball" style="top: ' + balls[i].pos.y + 'px; left: ' + balls[i].pos.x + 'px;">●</div>');
}
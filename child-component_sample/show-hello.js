Vue.component('show-hello', {
    // テンプレート内で改行したい場合はバッククォートで囲む
    template: `
    <p>
    {{ message }}
    </p>
    `,
    // オブジェクトを返す関数として定義する必要がある
    data: function(){
        return {
            message: 'hello vue!!'
        }
    }
});
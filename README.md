# vue.js-lessons
To learn basic operations of Vue.js.

## Vue.jsを学ぶメリット

フレームワークを使うメリット

* 汎用的な機能があらかじめ実装されているのでコンテンツの開発に集中できる
* フレームワークのルールを守ることが強制されるため構成が統一され保守性が高まる

フロント側で表示の切り替えを制御することで通信の遅延や画面のチラつきを抑えられる

* 表示を切り替えるたびにバックエンドと通信を行うと遅延やチラつきが問題になる
* JavaScriptはAjaxという非同期通信を利用して遅延を最小にする
* バックエンドはフロントエンドが要求したデータだけを送り返すAPIを実装する

Vue.jsにより煩雑なDOM操作から解放される

* JavaScriptでノードへアクセスして操作することもできるが変更が多い場合は複雑になる
* JQueryはシンプルな構文でノードにアクセスできるが下記のような問題がある
  * 階層構造をもつノードの集合としてHTMLを捉える必要があり、慣れないとロジック構築が難しい
  * ノードへアクセス、内容を変更という二段階の処理が必要なため、人による記述の場所やクセが出て読みづらくなる
* Vue.jsは描画に使うデータを定義し、更新すれば、自動的にDOMが更新されるためDOMを操作する必要がほぼなくなる
  * このようにデータ更新がトリガーとなって表示や動作が変わることを**データ駆動**と呼ぶ

> DOM（Document Object Model）とは
>
> DOMとは、読み込んだHTMLをツリー状のデータ構造としてメモリ上に保持する仕組みや保持したモデルのこと。
>
> ツリーの節に相当するHTML要素のことをノードと呼ぶ。

## Vue.jsの機能概要

Vue.jsの機能は下記のとおりだが、主要な機能は次の2つに大別できる。

* ページを構成する部品を描画する機能（テンプレートやレンダリング）
* ユーザの操作をアプリケーション側で検知する機能（イベントやフォーム）

| 機能                          | 説明                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| テンプレート構文              | HTMLタグと似た構文でDOMのテンプレートを定義する機能          |
| フィルター                    | データがDOMに出力される直前に加工処理を施す機能              |
| データバインディング          | アプリケーションのデータをDOMと結び付ける機能                |
| 条件付きレンダリング          | データの状態に応じて表示・非表示を切り替える機能             |
| リストレンダリング            | 複数のデータを繰り返し描画する機能                           |
| イベントハンドリング          | ブラウザで発生したイベントを検知する機能                     |
| フォーム入力バインディング    | フォームの入力とDOMを結びつける機能                          |
| コンポーネント                | UIの一部を再利用可能な部品にする機能                         |
| トランジション/アニメーション | DOM要素の表示スタイルを連続的に変化させて表示効果を与える機能 |
| ミックスイン                  | コンポーネントに再利用可能な機能を付加する機能               |
| カスタムディレクティブ        | Vue.jsにデフォルトで存在しない独自のディレクティブを追加する機能 |
| 描画関数                      | テンプレート構文を使わずJavaScriptのプログラミングでDOMを構築する機能 |
| プラグイン                    | 拡張ライブラリなどを利用可能とする機能                       |

### リアクティブ

データの変更が即座にDOMに反映される様子をリアクティブという。

Vue.jsが備えるこのような仕組みをリアクティブシステム、Vue.jsの管理下に置かれたデータをリアクティブデータと呼ぶ。

### ビューモデル

Vue.jsアプリケーションは、MVCモデルから派生したMVVM（Model-View-ViewModel）モデル。

ViewModelは、Viewから受け取った入力情報をModelに伝え、Modelから処理結果を受け取ってViewに伝える。

ViewModelはMVCモデルのControllerに似ているが、**Controllerは描画処理に介入しないのに対し、ViewModelはデータバインディングを通してModelとViewを自動的に結びつける点が異なる**。

### コンポーネント

コンポーネントとは、Vue.jsにおける単体のオブジェクトを指す。

```javascript
// あらかじめ定義されているVueもコンポーネントの一種
var app = new Vue({ 
    el: '#app',
});
```

Vueクラスのコンストラクタは、引数にObjectを受け取る。Vueは次のようなプロパティを持つことができる。

| プロパティ | 説明                                                         |
| ---------- | ------------------------------------------------------------ |
| el         | コンポーネントのインスタンスをどのHTML要素に結びつけるか定義する |
| data       | コンポーネントが保持するデータを定義する                     |
| methods    | コンポーネントが持つメソッドを定義する                       |
| filters    | コンポーネントが持つフィルターを定義する                     |
| computed   | コンポーネントが持つ算出プロパティを定義する                 |
| watch      | コンポーネントが持つウォッチャを定義する                     |

### レンダリング

HTMLテキスト内にマスタッシュで囲んでプロパティ名を記述すると`{{ プロパティ名 }}`、コンポーネントのdataオプションに定義したプロパティの値が出力される。dataが更新されると、HTMLテキストも自動的に置き換わる。

#### テキストにバインドする

```html
<!-- プロパティのバインディング -->
<p>{{ message }}</p>
```

#### 三項演算子を使った出力

```html
<!-- 三項演算子による制御 -->
<p>{{ lang == 'ja' ? message_ja : message_en }}</p>
```

#### 属性にバインドする

```html
<form action="" method="post">
    <!-- v-bind:属性名='プロパティ名'で属性をバインドできる -->
    <input type="text" name="text" v-bind:value="message">
</form>
```

#### スタイルにバインドする

```html
<!-- v-bind:style="{CSSプロパティ（キャメルケース）:Vueコンポーネントプロパティ}"でスタイルをバインドする -->
<p v-bind:style="{fontSize: pSize}">文字サイズは{{ pSize }}です</p>
```

#### クラスにバインドする

```html
<!-- v-bind:class="{class名: calss名を出力する条件式}"でクラスをバインドする -->
<p v-bind:class="{capitalize: isCapital}">hello vue!</p>
```

#### 配列を出力する

v-bind:keyがなくても表示できるが、要素を削除した場合に各要素のプロパティがバラバラになってしまう。

```html
<table border='1'>
    <tr>
        <th>商品コード</th>
        <th>商品名</th>
    </tr>
    <!-- 各々の配列要素を区別できる値(ここではcode)をkey属性でバインドすることが推奨される -->
    <tr v-for="item in products" v-bind:key="item.code">
        <td>{{ item.code }}</td>
        <td>{{ item.name }}</td>
    </tr>
</table>
```

#### 条件式で表示・非表示を切り替える

if文を使用した切り替え

```html
<!-- <要素名 v-if="条件式">出力内容</要素名>で条件式成立の場合のみ表示する -->
<p v-if="price < 1000">セール実施中</p>
<p v-else-if="price > 1000">原材料高騰につき値上げ</p>
<p v-else>定価</p>
```

複数行をまとめて扱いたいときは`template`タグを使用する

```html
<!-- 広範囲をまとめて切り替えたいときはtemplateタグを使用する -->
<template v-if="price < 1000">
    <p>大特価の{{ price }}円で好評販売中！</p>
    <p>10周年記念の限定特別セールです！！</p>
</template>
```

v-showを使用した切り替え（非表示時は`dispaly: none;`が適用された上でDOMに出力される）

```html
<!-- v-showで条件式が成立する場合のみ表示する -->
<!-- v-ifと違いDOMには必ず出力されdisplay: none;スタイルが適用される -->
<p v-show="price > 1000">価格が1000円以上です。</p>
```

### フィルター

`price=1000`と数値型で格納された値を、表示のときだけ`1,000円`と整形したいときなどにフィルタを使用する

#### グローバルスコープにフィルタを登録する

Vue.fiflet()メソッドを使用するとグローバルスコープにフィルタが登録される

グローバルスコープのフィルタはすべてのコンポーネントから共通で使用できる

```js
// 汎用的なフィルターはVue.filter()メソッドでグローバルスコープに登録し、全コンポーネントから利用できる
Vue.filter('number_format', function(val){
    return val.toLocaleString() + '円';
});

// Vue.filter()は、new Vue()よりも前に定義する必要があるので注意する
var app = new Vue({ 
    el: '#app',
    data: {
        price: 10000,
    }
});
```

フィルタの適用

```html
<!-- {{ プロパティ名 | フィルタ名 }}でフィルタを適用できる -->
<p>{{ price | number_format }}</p>
```

属性にフィルタを適用する

```html
<!-- v-bind:属性名="プロパティ名 | フィルタ名"でバインドしたデータにフィルタを適用できる -->
<form action="">
    <input type="text" name='price' v-bind:value="price | number_format">
</form>
```

#### ローカルスコープにフィルタを登録する

コンポーネントのfiltersオプションに登録したフィルタは他のコンポーネントから隠蔽される

```js
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
```

#### 複数のフィルタをパイプで繋ぐ

```html
<p>{{ price | number_format | unit }}</p>
```

### 算出プロパティ

コンポーネントのcomputedプロパティに算出プロパティを定義できる

```html
<p>調べたい年：<input type="text" v-model:value="year"></p>
<p>{{ year }}年は{{ isUrudoshi ? '閏年です' : '閏年ではありません' }}</p>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        year: (new Date()).getFullYear(),
    },
    computed: {
        // 今年が閏年か判定する算出プロパティ
        isUrudoshi: function(){
            return ((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0);
        }
    },
});
```

#### 算出プロパティはキャッシュされる

メソッドは描画のたびに再実行されるが算出プロパティは依存関係にあるリアクティブデータが更新されない限りキャッシュが使われる

```html
<!-- consoleからapp.show=false、app.show=trueを実行するとnow1()だけが更新される -->
<div v-show="show">
    <p>now1: "{{ now1() }}"</p>
    <p>now2: "{{ now2 }}"</p>
</div>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        show: true,
    },
    methods: {
        now1: function() {
            return (new Date()).toLocaleString();
        },
    },
    computed: {
        now2: function() {
            return (new Date()).toLocaleString();
        }
    },
});

```

コンソール画面で次のように実行するとnow1()だけが更新される

```bash
app.show = false
false
app.show = true
true
```

```html
now1: "2020/10/1 9:07:30"
now2: "2020/10/1 9:07:01"
```

算出プロパティが適するケースは、たとえば商品一覧をある条件で並び替える場合など

毎回商品一覧の取得からやり直すのではなく、取得した商品を使いまわして並び替えた方が無駄がない

### ウォッチャ

ウォッチャは、データの変更を監視して、自動的にハンドラを実行する

イベントハンドリングとにているが、イベントではなく、データの変更がトリガーになる点が異なる

```html
<template v-if="stock > 0">
    <p class="num">残り{{ stock }}個</p>
    <p>
        <button class="btn" v-on:click="onDeleteItem">削除</button>
    </p>
</template>
<p>{{ message }}</p>
```

```js
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
})
```

#### ウォッチャを使うべき場面

算出プロパティでも上記と同じように表示を制御することができる

```html
<template v-if="stock > 0">
    <p class="num">残り{{ stock }}個</p>
    <p>
        <button class="btn" v-on:click="onDeleteItem">削除</button>
    </p>
</template>
<p>{{ statusMessage }}</p>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        stock: 10,
    },
    methods: {
        onDeleteItem: function() {
            this.stock--;
        },
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
```

しかし、算出プロパティはハンドラの処理が終わるまで再描画されないので、ユーザと待たせる可能性がある

- データが更新されたとき、サーバ間の通信など重い処理が発生する場合
- ユーザの操作によって、高い頻度で処理が発生する場合

上記のような場合は、Ajaxと呼ばれる非同期通信で待ち時間を短縮したり、ブラウザに重い負荷がかからないようにハンドラの実行頻度を調節できるウォッチャが適している
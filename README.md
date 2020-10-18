## Vue.jsとは

### 学ぶメリット

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

### Vue.jsの機能概要

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

## 書式

### コンポーネント

**コンポーネントとは、Vue.jsにおける単体のオブジェクトを指す**。

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

#### HTMLタグをそのまま出力する

```js
name: 'Michael<br>スマホケース',
```

```html
<p v-html='item.name'></p>
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

### イベントハンドリング

ボタンやリンクのクリックやページのスクロールといったユーザの操作をイベントと呼ぶ

イベントの発生をプログラムで検知して何らかの処理を実行することをイベントハンドラと呼ぶ

#### ボタンクリックによって在庫が減らす

```html
<template v-if="stock > 0">
    <p class="num">残り{{ stock }}個</p>
    <button class="btn" v-on:click="onDeleteItem">削除</button>
</template>
<template v-else>
    <p>在庫切れ</p>
</template>
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
});
```

#### コンポーネント外部のイベントハンドリング

v-onディレクティブでイベントハンドラを登録できるのはコンポーネントのスコープ内にある要素に限られる

次のようなウィンドウ自体に発生するイベントはv-onでは検知することができない

* load：ページが読み込まれた時に発生する
* resize：ウィンドウサイズが変更された時に発生する
* scroll：ページをスクロールさせた時に発生する

上記はVueは使わずaddEventLisner関数でイベントハンドラに登録する必要がある

登録するタイミングは早いほうが良く、コンポーネントのcreatedプロパティなどを使用する

Vueを介さずに登録したイベントハンドラはremoveEventListener関数で明示的に解除する必要がある

```html
<p>ウィンドウの横幅：{{ width }}</p>
<p>ウィンドウの高さ：{{ height }}</p>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
  	// コンポーネント作成時にイベントハンドラを登録する
    created: function() {
        addEventListener('resize', this.resizeHandler);
    },
  	// コンポーネント破棄時にイベントハンドラを解除する
    beforeDestory: function() {
        removeEventListener('resize', this.resizeHandler);
    },
    methods: {
        resizeHandler: function($event) {
            this.width = $event.target.innerWidth;
            this.height = $event.target.innerHeight;
        },
    },
});
```

#### イベントに引数を渡す

イベントが発生すると、ブラウザはイベントオブジェクトを生成する

イベントオブジェクトにはDOMノードそのものを示すtargetオブジェクトなどが含まれる

Vueでは、$eventという変数名でイベントオブジェクトを受け取る

#### マウスカーソル位置の取得

```html
<p>ウィンドウの横幅：{{ width }}</p>
<p>ウィンドウの高さ：{{ height }}</p>
<p>マウスカーソルの位置：{{ point.x }}, {{ point.y }}</p>
```

 ```js
var app = new Vue({ 
    el: '#app',
    data: {
        point: {
            x: 0,
            y: 0,
        },
    },
    created: function() {
        addEventListener('mousemove', this.mousemoveHnadler);
    },
    beforeDestory: function() {
        removeEventListener('mousemove', this.mousemoveHnadler);
    },
    methods: {
        mousemoveHnadler:function($event){
            this.point.x = $event.clientX;
            this.point.y = $event.clientY;
        }
    },
})
 ```

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

### フォーム入力バインディング

フォーム入力をバインドする場合はv-modelディレクティブを使う

```html
<input type="text" name="text" v-model="year">
<p>{{ year }}</p>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        year: (new Date().getFullYear()),
    },
})
```

HTMLのフォームコントロールには通常value属性やchecked属性、selected属性が使われる

しかしv-modelを指定したフォームコントロールではそれらの設定値が無視される

そのため、コンポーネント側のdataオプションで初期値を設定しておく必要がある

#### 全角文字をリアルタイムで反映させる

v-modelを使う方法は、全角文字を入力する場合はエンターを押すまで変更が反映されない

全角文字でもキー入力ごとにデータに反映させるには下記のようにイベントハンドラを用いる

```html
<input type="text" name="text" v-on:input="yearInputHandler" v-bind:value='year'>
<p>{{ year }}</p>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        year: (new Date().getFullYear()),
    },
    methods: {
        // yearのinputイベントハンドラ
        yearInputHandler: function($event){
            this.year = $event.target.value;
        }
    }
})
```

#### チェックボックスのバインド

チェックボックスにバインドされるデータの型は、選択肢が単体か複数かで異なる

* 単体のチェックボックスの場合は真偽値
* 複数のチェックボックスの場合は文字列の配列

単体のチェックボックスの場合

```html
<p>ケーキはお好きですか？：{{ answer }}</p>
<input type="checkbox" id="cake" v-model="answer" true-value="はい" false-value="いいえ">
<label for="cake">チェックしてください</label>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        answer: 'はい',
    },
})
```

複数のチェックボックス

```html
<!-- グループに対して1つのプロパティをバインドする -->
<p>ご注文をお選びください:{{ selection }}</p>
<label>
    <input type="checkbox" v-model="answers" value="ケーキ">ケーキ
</label>
<label>
    <input type="checkbox" v-model="answers" value="紅茶">紅茶
</label>
<label>
    <input type="checkbox" v-model="answers" value="コーヒー">コーヒー
</label>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        answers: [],
    },
    computed: {
        selection: function() {
            return this.answers.join();
        }
    }
})
```

#### ラジオボラン

ラジオボタンは1つしか選択できないためプロパティは配列ではなく文字列型

```html
<p>当店のサービスはいかがでしたか？：{{ radio_answer }}</p>
<label>
    <input type="radio" v-model="radio_answer" value="素晴らしい">素晴らしい
</label>
<label>
    <input type="radio" v-model="radio_answer" value="普通">普通
</label>
<label>
    <input type="radio" v-model="radio_answer" value="まだまだ">まだまだ
</label>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        radio_answer: '選択してください'
    },
})
```

#### セレクトボックス

単数選択の場合

```html
<p>当店のご利用頻度は？：{{ select_answer }}</p>
<select v-model="select_answer">
    <option value="初めて">初めて</option>
    <option value="週一回以上">週一回以上</option>
    <option value="月2回以上">月2回以上</option>
    <option value="半年に一回">半年に一回</option>
</select>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        select_answer: '',
    },
})
```

単数選択でvalueを数値にしたい場合(.number修飾子を使う)

```html
<li class="nav-item">
    <label for="sort">並び替え</label>
    <select id="sort" class="sorting" v-model.number='sortOrder'>
        <option value="1">標準</option>
        <option value="2">価格が安い順</option>
    </select>
</li>
```

```js
// 並び替え方法（1:標準、2:価格が安い順）
sortOrder: 1,
```

複数選択の場合

```html
<p>分類：{{ selectedCategory }}</p>
<select v-model="category" multiple>
    <option value="宿泊費">宿泊費</option>
    <option value="食費">食費</option>
    <option value="交通費">交通費</option>
</select>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        category: [],
    },
    computed: {
        selectedCategory: function() {
            return this.category.length > 0 ? this.category.join() : '';
        }
    }
})
```

セレクトボックスの選択肢にバインドする

```html
<!-- セレクトボックスの選択肢にバインドする -->
<p>当店のご利用頻度は？：{{ option_bind_answer }}</p>
<select v-model="option_bind_answer">
    <option disabled value="">選択してください</option>
    <option v-for="item in options" v-bind:value="item.label" v-bind:key="item.code">
        {{ item.label }}
    </option>
</select>
```

```js
var app = new Vue({ 
    el: '#app',
    data: {
        option_bind_answer: '',
        options: [
            {code: 'ans1', label: '初めて'},
            {code: 'ans2', label: '週一回'},
            {code: 'ans3', label: '月2回'},
            {code: 'ans4', label: '半年に一回'},
        ],
    },
})
```

ある項目の選択により別の項目の選択肢が動的に変化するセレクトボックス

```html
<!-- 動的な選択肢 -->
<div id="app">
    <!-- カテゴリの選択 -->
    <p>selected category: {{ selectedCategory.name }}</p>
    <select name="category" v-model="selectedCategoryId">
        <option value="" disabled>選択してください</option>
        <option v-for="category in categories" v-bind:value="category.id" v-bind:key="category.id">
            {{ category.name }}
        </option>
    </select>
    <!-- アイテムの選択 -->
    <template v-if="filteredItems">
        <p>selected item: {{ selectedItem.name }}</p>
        <select name="item" v-model="selectedItemId">
            <option value="" disabled>選択してください</option>
            <option v-for="item in filteredItems" v-bind:value="item.id" v-bind:key="item.id">
                {{ item.name }}
            </option>
        </select>
    </template>
</div>
```

```js
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
```

## Ajax

Ajaxは、Asynchronous JavaScript + XMLの略で、JavaScriptとXMLを用いた非同期通信アプローチのこと

### 同期通信と非同期通信の違い

**同期通信**

- データや処理をリクエストしてから、レスポンスが返ってくるまでプログラムを一時停止する
- 複数の処理を順序正しく実装しなければならないケースに適する

**非同期通信**

- アプリケーションのメインロジックと外部との通信を並行して実行する
- サーバのレスポンスを待つ必要がないのでユーザを待たせなくて済む

JavaScriptはマウスオーバやクリックなどのイベントを検知することができる

そのため、それらをトリガーに非同期通信を開始してDOMを操作する窓口として利用される

### XMLとは

XMLは、Extensible Markup Languageの略で、HTMLと同じマークアップ言語のひとつ

#### データの意味がわかりやすい

マークアップの記述に使われるタグ`<xxx>`の「xxx」を要素という

XMLでは要素名を自由につけることができる

```xml
新しいオフィスは<住所>東京都渋谷区〇〇</住所>です。
```

上記のような記述が可能なので、該当するデータを検索しやすくなる

#### アプリケーション間のデータ交換に用いられる

XMLは階層構造や要素名を自由に定義できるため、データの管理に適している

テキストファイルとして手軽にデータ交換を行うことができ、そのままデータの格納が可能

CSVなども汎用的だが階層構造を表現することができないためXMLが使用される

#### XMLとHTMLの違い

両者は似ているが、HTMLがウェブページを記述するための言語であるのに対し、XMLはデータの意味や階層を文章で表現するための言語であるため、用途が全く異なる

XMLでデータを格納した後、HTMLに変換して表示するといったことも可能

### JSONとは

JSONは、JavaScript Object Notationの略で、JavaScriptのオブジェクト表記を用いたデータ形式

マークアップ言語のように閉じタグが不要なので、XMLよりも簡潔に記述することができる

**XMLで記述する例**

```xml
<item>
    <id>1</id>
    <name>商品A</name>
    <price>1000</price>
</item>
```

**JSONで記述する例**

```json
{
    "item": {
        "id": 1,
        "name": "商品A",
        "price": 1000
    }
}
```

#### JSONの用途

JSONはeval()関数でJavaScriptオブジェクトに変換することができる

そのためAjaxでのデータ交換フォーマットとしてXMLの代わりに広く利用される

主要なプログラミング言語にはJSONの生成や読み込みのためのライブラリが存在する

#### JSON表記のルール

- 文字コードはUTF-8を使用する
- 文字列はすべてダブルクォート`"`で囲む
- 配列の最後の要素の後ろにはカンマ`,`はつけない

### クロスドメイン制約とは

CORSはCross-Origin Resource Sharingの略で、ブラウザがオリジン以外の場所からデータを取得すること

オリジンは、HTMLを読み込んだサーバの下記の情報の組み合わせで識別する

- プロトコルスキーム：http://, https://, file://など
- ホスト名：amazon.co.jpなど
- ポート番号：80, 8080など

ブラウザは原則として異なるオリジン以外の場所かデータを取得することを禁止している

ローカルPC上のファイルにアクセスする際はfileプロトコルが使われる

そのため、XMLHttpRequestを用いてhttpプロトコルでアクセスしようとするとエラーが発生する

このセキュリティ上の制約をクロスドメイン制約と呼ぶ

### jQueryでAjaxを利用する例

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>商品一覧</title>
</head>
<body>
    <!-- 読み込みボタン -->
    <button id="load">読み込み</button>
    <div class="container">
        <!-- 結果を表示するための領域 -->
        <div id="result" class="row"></div>
    </div>
    <!-- jQueryのCDNを読み込む -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="index.js"></script>
</body>
</html>
```

index.js

```js
$('#load').on('click', function(event) {
    // 通信をになうXMLHttpRequestオブジェクトのインスタンスを生成する
    $.ajax({
        url: './server/items.json',
        type: 'GET',
        dataType: 'json'
    }).done(function (data, textStatus, jqXHR) {
        // 通信が成功したとき
        console.log('通信が成功しました');
        updateScreen(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // 通信が失敗したとき
        console.log('通信が失敗しました');
    });
});

// 取得した商品情報を描画する
function updateScreen(items) {
    // 商品リストのノードをすべて削除する
    $('#result').empty();

    // 商品の子ノードをDOMに挿入する
    let list = '';
    for(let i = 0; i < items.length; i++) {
        list += '<div class="col-md-4">';
        list += '<div class="position-relative">';
        list += '<div class="sale">SALE</div>';
        list += '<img src="' + items[i].image + '" alt="">';
        list += '</div>';
        list += '<div class="text-center">';
        list += '<p>' + items[i].name + '</p>';
        list += '</div>';
        list += '<div class="text-center">';
        list += '<div class="price"><span class="bold h3">' + items[i].price + '</span>円（税込）</div>';
        list += '<div class="shipping-fee">+送料' + items[i].delv + '円</div>';
        list += '</div>';
        list += '</div>';
    }

    $('#result').append(list);
}
```

### Vue.jsでAjaxを利用する例

index.js

```js
let app = new Vue({
    el: '#app',
    data: {
        items: [],
        isError: false,
        message: '',
    },
    methods: {
        getItems: function() {
            let url = './server/items.js';
            $.ajax({
                url: url,
                type: "GET",
                dataType: 'jsonp',
                jsonp: 'callback', // クエリパラメータの名前
                jsonpCallback: 'items', // コールバック関数の名前
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

```

./server/items.js

```js
items([
    {
        "id": 1,
        "name": "Michael<br>スマホケース",
        "price": 1580,
        "image": "images/01.jpg",
        "delv": 0,
        "isSale": true
    },
    {
        "id": 2,
        "name": "Raphael<br>スマホケース",
        "price": 1580,
        "image": "images/02.jpg",
        "delv": 0,
        "isSale": true
    },
    {
        "id": 3,
        "name": "Gabriel<br>スマホケース",
        "price": 1580,
        "image": "images/03.jpg",
        "delv": 240,
        "isSale": true
    },
    {
        "id": 4,
        "name": "Uriel<br>スマホケース",
        "price": 980,
        "image": "images/04.jpg",
        "delv": 0,
        "isSale": false
    },
    {
        "id": 5,
        "name": "Ariel<br>スマホケース",
        "price": 980,
        "image": "images/05.jpg",
        "delv": 0,
        "isSale": false
    },
    {
        "id": 6,
        "name": "Azrael<br>スマホケース",
        "price": 1580,
        "image": "images/06.jpg",
        "delv": 0,
        "isSale": false
    }
]);
```

## コンポーネント

### グローバルスコープにコンポーネントを登録

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="../js/vue.js"></script>
    <title>Introduction</title>
</head>
<body>
    <div id="app">
        <p>↓ここにコンポーネントが入る</p>
        <show-hello></show-hello>
    </div>
    <!-- Vue.component()などのグローバルメソッドはnew Vue()より先に実行する必要がある -->
    <script src="show-hello.js"></script>
    <script src="index.js"></script>
</body>
</html>
```

index.js

```js
let app = new Vue({
    el: '#app',
});
```

show-hellp.js

```js
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
```

### ローカルスコープにコンポーネントを登録

親コンポーネントのcomponentオプションに子コンポーネントを定義するとローカルスコープとなる

index.html

```html
<body>
    <div id="app">
        <!-- このコンポーネントは描画される -->
        <my-component></my-component>
    </div>
    <div id="app2">
        <!-- このコンポーネントは描画されない -->
        <my-component></my-component>
    </div>
    <script src="my-component.js"></script>
    <script src="index.js"></script>
</body>
```

my-component.js

```js
let myComponent = {
    template: `
    <p>
    {{ message }}
    </p>
    `,
    data: function(){
        return {
            message: '子コンポーネント',
        }
    }
};
```

index.js

```js
let app = new Vue({
    el: '#app',
    components: {
        'my-component': myComponent,
    }
});
```

### 親コンポーネントから子コンポーネントに値を渡す

子コンポーネントが値を受け取るためには次のような手順をとる

- 子コンポーネントが受け取るデータのプロパティ名をpropsオプションに定義する
- 親のテンプレートで子コンポーネントのカスタムタグ内に属性を追加する

my-component.js

```js
let myComponent = {
    template: `
    <div>
        <span>{{name}}</span>:<span>{{price}}(円)</span>
    </div>
    `,
    // 子コンポーネントにpropsプロパティを追加する
    props: [
        'name',
        'price'
    ]
};
```

親コンポーネントのカスタムタグに属性として値を登録する

index.html

```html
<body>
    <div id="app">
      	<!-- 定義したプロパティ名で値を渡す -->
        <my-component name="スマホケースA" price="980"></my-component>
        <my-component name="スマホケースB" price="1580"></my-component>
    </div>
    <script src="my-component.js"></script>
    <script src="index.js"></script>
</body>
```

### リアクティブなデータを渡す

親コンポーネントに定義したデータをカスタムタグ内にバインドすることもできる

index.js

```js
let app = new Vue({
    el: '#app',
    data: {
        name: 'スマホケース',
        price: 980,
    },
    components: {
        'my-component': myComponent,
    }
});
```

index.html

```html
<body>
    <div id="app">
        <my-component name="スマホケースA" price="980"></my-component>
        <my-component name="スマホケースB" price="1580"></my-component>
        <my-component v-bind:name="name" v-bind:price="price"></my-component>
    </div>
    <script src="my-component.js"></script>
    <script src="index.js"></script>
</body>
```

my-component.js

```js
let myComponent = {
    template: `
    <div>
        <span>{{name}}</span>:<span>{{price}}(円)</span>
    </div>
    `,
    props: [
        'name',
        'price'
    ]
};
```

### 子コンポーネントから親コンポーントに値を渡す

子から親のテンプレートは見えないので属性を介して渡すことはできない

そのため、子から親に値を渡すときは次のようにする

- 親は子からデータを受け取るためのイベントハンドラを用意する
- 子は親にデータを渡したいタイミングでイベントハンドラを呼び出す

my-component.js

```js
let myComponent = {
    // ボタンがクリックされたらclickHndlerを呼び出す
    template: `
    <div>
        <button v-on:click="clickHndler">値下げをする</button>
        <span>{{name}}</span>:<span>{{price}}(円)</span>
    </div>
    `,
    props: [
        'name',
        'price'
    ],
    methods: {
        // ボタンのクリックイベントハンドラを定義する
        clickHndler: function() {
            // 子コンポーネントにchild-clickイベントを発生させる
            this.$emit('child-click');
        }
    }
};
```

index.html

```html
<body>
    <div id="app">
        <!-- 親テンプレート内でchild-clickイベントが発生したときのイベントハンドラを割り当てる -->
        <my-component v-on:child-click="priceDown" v-bind:name="name" v-bind:price="price"></my-component>
    </div>
    <script src="my-component.js"></script>
    <script src="index.js"></script>
</body>
```

index.js

```js
let app = new Vue({
    el: '#app',
    data: {
        name: 'スマホケース',
        price: 980,
    },
    components: {
        'my-component': myComponent,
    },
    methods: {
        priceDown: function() {
            this.price = Math.max(this.price - 100, 0);
        }
    }
});
```

クリックのたびに値下げする金額を子コンポーネント側で指定する

1. 500円以上の商品はクリックのたびに50円値下げする
2. 500円までしか値下げしない

my-component.js

```js
let myComponent = {
    // ボタンがクリックされたらclickHndlerを呼び出す
    template: `
    <div>
        <button v-on:click="clickHndler">値下げをする</button>
        <span>{{name}}</span>:<span>{{price}}(円)</span>
    </div>
    `,
    props: [
        'name',
        'price'
    ],
    methods: {
        clickHndler: function() {
            // 値引き金額を子コンポーネント側で定義する
            let discount = this.price - 50 > 500 ? 50 : this.price - 500;

            // $emit()の第二引数で値引き金額を渡す
            this.$emit('child-click', discount);
        }
    }
```

index.js

```js
let app = new Vue({
    el: '#app',
    data: {
        name: 'スマホケース',
        price: 980,
    },
    components: {
        'my-component': myComponent,
    },
    methods: {
        // priceDownの引数に値引き金額を追加する
        priceDown: function(discount) {
            // 値引き金額が指定されなかったときは100円とする
            if(discount === undefined) {
                discount = 100;
            }

            this.price -= discount;
        }
    }
});
```

### .native修飾子でコンポーネントのイベントを検知する

通常はコンポーネントのカスタムタグは`v-on:click="handler"`と記述しただけではイベントが発生しない

```html
<div id="app">
    <!-- 子コンポーネントをクリックしてもpriceDownメソッドは実行されない -->
    <my-component v-on:click="priceDown" v-bind:price="price"></my-component>
</div>
```

しかしv-onディレクティブに,native修飾子を併用すると、子コンポーネントのどこをクリックしてもイベントが発生するようになる

index.html

```html
<body>
    <div id="app">
        <!-- 子コンポーネントをクリックするとイベントが発生する -->
        <my-component v-on:click.native="priceDown" v-bind:price="price"></my-component>
    </div>
    <script src="my-component.js"></script>
    <script src="index.js"></script>
</body>
```

my-component.js

```js
let myComponent = {
    // 子コンポーネントにイベント（$emit）を定義する必要はない
    template: `<span>現在の価格：{{price}}(円)</span>`,
    props: ['price'],
};
```

index.js

```js
let app = new Vue({
    el: '#app',
    data: {
        name: 'スマホケース',
        price: 980,
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
```

このように.native修飾子を使うことで、親はこの実装を知らなくてもイベントハンドリングを行うことができる

ただし、子コンポーネントの特定の要素にだけイベントを発生させたい場合にはこの方法は使えない

### コンポーネントを繰り返し描画する

親のコンポーネントに商品の配列を定義する

index.js

```js
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
});
```

my-component.js

```js
let myComponent = {
    template: `<li>{{id}} {{name}} {{price}}(円)</li>`,
    props: ['id', 'name', 'price'],
};
```

index.html

```html
<body>
    <div id="app">
        <!-- 下記のようにオブジェクトをv-bindするとプロパティを一括でバインドすることができる -->
        <my-component v-for="item in items"　v-bind="item" v-bind:key="item.id"></my-component>
        <!-- プロパティをひとつずつバインドする場合は下記のように記述する -->
        <my-component v-for="item in items" v-bind:id="item.id" v-bind:name="item.name" v-bind:price="item.price" v-bind:key="item.id"></my-component>
    </div>
    <script src="my-component.js"></script>
    <script src="index.js"></script>
</body>
```


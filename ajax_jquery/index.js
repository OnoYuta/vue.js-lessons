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
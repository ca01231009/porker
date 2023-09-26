
var cards = [];    //山札
var my_hand = [];    //自分の手札
var my_rank = 11;    //自分の役
var cpu_rank = 11;   //CPUの役
var my_rank_name;    //自分の役名
var cpu_rank_name;   //CPUの役名
var difficultyNum = 0;    //難易度設定

//開始ボタン
start = () => {
    initCard(); //山札セット
    shuffleCard(); //山札シャッフル
    first();
    $("#startbutton").hide();
    $("#changebutton").show();
    $("#judgebutton").show();
}

//カードを山札にセット
initCard = () => {
    x = 0;
    for (i = 1; i <= 13; i++) {
        cards[x] = new Card(0, i);
        x++;
        cards[x] = new Card(1, i);
        x++;
        cards[x] = new Card(2, i);
        x++;
        cards[x] = new Card(3, i);
        x++;
    }
    cards[52] = new Card(4, 15);
}

//カードシャッフル
shuffleCard = () => {
    for (i = 0; i < 53; i++) {
        r = Math.floor(Math.random() * 13 * 4);
        w = cards[i];
        cards[i] = cards[r];
        cards[r] = w;
    }
}

function Card(mark, num) {
    this.mark = mark;
    this.num = num;
}


//カードを表示する関数
dispCard = (card) => {
    let imgurl = "";
    for (i = 0; i < card.length; i++) {
        imgurl = `${card[i].mark}_${card[i].num}`;
        // console.log(imgurl);
        $("#disp").append(`<img src=img/${imgurl}.png alt=card${i}>`);
    }
}

//山札から引きつつ山札削除＆表示
draw = () => {
    my_hand = cards.slice(0, 5);
    cards.splice(0, 5);
    dispCard(my_hand);
    my_rank_name = rank(my_hand);
    $("#rank_name").text(my_rank_name);
}

//CPUの手札準備
cpu_draw = () => {
    cpu_hand = cards.slice(0, 5);
    cards.splice(0, 5);
    for (i = 0; i < 5; i++) {
        $("#cpu_disp").append(`<img src = img/0_0.png alt=card${i}>`);
    };
}

//役判定＆表示
rank = (my_hand, my_rank, my_rank_name) => {
    my_rank = rank_judge(my_hand);
    my_rank_name = disp_rank(my_rank, my_rank_name);
    return my_rank_name;
}

'use strict';

{
    //必要な要素取得
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById( 'stop');
    const reset = document.getElementById('reset');

    //現在時刻を startTime という名前で取得（取得はstartのクリックイベントで）
    //再代入するのでletで指定、startTimeは他関数でも使うため外で宣言
    let startTime;
    //setTimeoutの返り値を格納する変数
    let timeoutId;

    //stopを押した時点での経過時間を保持する変数
    let elapsedTime = 0;

    //カウントアップ関数
    function countUp(){
        //現在の時刻から start ボタンを押したときの時刻である startTime を引いてあげれば、 startTime からの経過ミリ秒がわかるはず
        //countUpが実行されるたびにDate.now()で現在時刻が更新される
        //現在時刻からstartを押した時間を引いていけばcoutUpが実行された時間がわかる

        // console.log(Date.now() - startTime);
        //1回目:現在時刻 - 開始時刻を計算（例：18:41:18 - 18:41:16）= 00:00:02
        //2回目:現在時刻 - 開始時刻を計算（例：18:41:20 - 18:41:16）= 00:00:04
        //上記のようにstartを押してから1回目のcountUp実行まで2秒、2回目までは4秒かかっていることがわかる（経過時間）

        //現在の数値の単位はミリ秒なので、分や秒にする
        // 経過時間をDateオブジェクトにしてから、その情報から分、秒、ミリ秒を取得する
        //表示が一桁だった場合は0を入れたいのでpadStartを使う、そのためにはStringで文字列にする必要がある
        //
        // const d = new Date(Date.now() - startTime);
        //elapsedTimeを足すことでstop押下時点での経過時間を足すことになる = 途中からスタートできる
        //stopを押下していない場合はelapsedTimeは0だから初期状態でのスタートになる 
        const d = new Date(Date.now() - startTime + elapsedTime);
        const m = String(d.getMinutes()).padStart(2,'0');
        const s = String(d.getSeconds()).padStart(2,'0');
        const ms = String(d.getMilliseconds()).padStart(3,'0');

        //上記で取得した情報をテンプレートリテラルで表示
        timer.textContent = `${m}:${s}:${ms}`;

        //countUp() の処理を一定時間ごとに繰り返していきたいので setTimeout()を使う
        timeoutId = setTimeout( () => {
            countUp();
        },10);
    }

    // 状態管理は関数で管理する（button要素の場合）
    // function setButtonStateInitial(){
    //     start.disabled = false;
    //     stop.disabled = true;
    //     reset.disabled = true;
    // }
    // function setButtonStateRunning(){
    //     start.disabled = true;
    //     stop.disabled = false;
    //     reset.disabled = true;

    // }
    // function setButtonStateStopped(){
    //     start.disabled = false;
    //     stop.disabled = true;
    //     reset.disabled = false;
    // }

    //状態管理は関数で管理する（クラスのツケ外しの場合）
    function setButtonStateInitial(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.add('inactive');
    }
    function setButtonStateRunning(){
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        reset.classList.add('inactive');

    }
    function setButtonStateStopped(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');
    }

    setButtonStateInitial()







    //スタートのクリックイベント
    //start ボタンを押したらカウントアップが始まる
    start.addEventListener('click', () => {
        //containsは左記の条件に一致するか検査するメソッド
        //左記条件に一致するならtrue、一致しないならfalseを返す
        if (start.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateRunning();
        //基準となる日時からの経過ミリ秒を使って計算していきたいので Date.now()を使用
        //ここの現在時刻はstartを押した時点で固定される
        startTime = Date.now();
        countUp();
    });

    //ストップのクリックイベント
    //stopを押した時にcountUp関数内のsetTimeout処理を止めるclearTimeoutを実行する
    stop.addEventListener('click', () => {
        if (stop.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateStopped();
        // clearTimeout() メソッドは、 setTimeout() の呼び出しによって以前に確立されたタイムアウトを解除します。
        // 引数 ⇨ timeoutID
        // 解除したいタイムアウトの識別子です。この ID は対応する setTimeout() から返されたものです。
        clearTimeout(timeoutId);

        //sotp時点での経過時間を保持
        //=だけだと2回目にstop押した時点での時間に上書きされてしまう
        //1回目stopの経過時間と2回目、3回目、、、stopの経過時間を足す必要がある
        // ※以下elapsedTimeの挙動を参照
        // elapsedTime = Date.now() - startTime;
        elapsedTime += Date.now() - startTime;
    });


    //リセットのクリックイベント
    //resetを押した時に最初からなるようにする
    reset.addEventListener('click', () => {
        if (reset.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateInitial();
        timer.textContent = `00:00:000`;
        //リセットなので保持している経過時間もリセット
        elapsedTime = 0;
    });



}

// Date.now() - startTimeの挙動
//Startボタンを押したタイミングでの現在時刻は startTime = Date.now(); の
// 時点で固定されます．
// これに対し， Date.now() - startTime で Date.now() はその都度最新時刻が
// 更新されるため，この差を取ることでクリックしたときからの経過時間をとることができます．



// ※elapsedTimeの挙動

// elapsedTime = Date.now() - startTime;のままで、複数回stopを押した時の動作を
// 考えてみます。
// 例えば、startして1秒後にstopを押し、その1秒後にstartを押して再開し、そのまた1秒後に
// stopを押して、さらにその1秒後にまたstartを押して再開したとします。
// するとelapsedTimeはそれぞれのタイミングで以下のようになります。

// T0（はじめ）: startを押す elapsedTimeは0、startTimeはT0
// T1（1秒後）: stopを押す elapsedTimeは1000ミリ秒（現在の時間T1とstartTime T0の差）
// T2（2秒後）: startを押す elapsedTimeは1000ミリ秒なのでタイマーに表示される時間は
// 1000ミリ秒足される。また、この時startTimeはT2
// T3（3秒後）: stopを押す elapsedTimeは1000ミリ秒（現在の時間T3とstartTime T2の差）
// T4（4秒後）: startを押す elapsedTimeは1000ミリ秒なのでタイマーに表示される時間は
// 1000ミリ秒足される。結果として時間が戻ることになる。
// この例だとT2の時にstartを押した時に戻ったと言える


// elapsedTime += Date.now() - startTime;とするとどのようにelapsedTimeが変化するか
// 同じように書きます。

// T0（はじめ）: startを押す elapsedTimeは0、startTimeはT0
// T1（1秒後）: stopを押す elapsedTimeは初期値の0に1000ミリ秒
// （現在の時間T1とstartTime T0の差）を足して1000ミリ秒
// T2（2秒後）: startを押す elapsedTimeは1000ミリ秒なのでタイマーに
// 表示される時間は1000ミリ秒足される。また、この時startTimeはT2
// T3（3秒後）: stopを押す elapsedTimeは1000ミリ秒に1000ミリ秒
// （現在の時間T3とstartTime T2の差）を足して2000ミリ秒
// T4（4秒後）: startを押す elapsedTimeは2000ミリ秒なのでタイマーに
// 表示される時間は2000ミリ秒足される。これで正しくこれまでの経過時間を加えて表示できる



//不具合改修
//・Start ボタンを連打したあとに Stop ボタンを押しても 1 回だけでは止まらない
//Start ボタンを押すたびに何回もストップウォッチが起動してしまうことが原因

//・Start を押したあとで Stop ボタンを連打すると、 
// elapsedTime が新しい値で更新されてしまうので、
//再開したときに少しおかしな値から始まってしまう

// 上記はボタンが押せるべきでないときに押せてしまうことが原因なので、
// スタート前は Start だけ押せる状態にしてあげて、それぞれのボタンを
// 押したときに押すべきではないボタンは適宜無効化してあげれば OK 

// ストップウォッチを3つの状態管理をする
//最初の状態は=Initial
// ⇨startだけが押せる状態

//startが押されている状態は=Running
// ⇨stopだけが押せる状態

//stopが押されている状態=Stopped
//⇨startとresetが押せる状態にする
// ⇨startを押した場合はRunningだがresetを押した場合はInitialに戻る分岐が必要

// 使えないボタンはdesabled属性(jsで指定するときはdesabledプロパティと呼ぶ)をtrue、
// 使えるボタンはdesabled属性をfalseにする
// document.getElementById("stop").disabled === true;
// document.getElementById("reset").disabled === true;
// 上記のdesabled属性はbutton要素に有効、div要素でbuttonを作る場合は無理





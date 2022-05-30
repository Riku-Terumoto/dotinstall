'use strict';
{

    function setWord(){
        //以下だと同じ単語が重複して出てくる
        // word = words[Math.floor(Math.random() * words.length)];

        //spalicで配列から取り出した値は元の配列から削除とする
        //splice() の返り値は結果がひとつであっても配列になるので、配列から取り出すために、添字の 0 をつけてあげる
        word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        target.textContent = word;
        loc = 0;
    }

    const words = [
        'red',
        'blue',
        'pink',
    ]
    //画面に表示するword
    let word;

    //wordの文字数
    let loc = 0;

    //クリックしてゲームを始めた時間
    let startTime;

    //プレイ中か否か
    let isPlaying = false;

    const target = document.getElementById('target');
    //文字列に対して配列のような記法を使うと、個々の文字にアクセスできる
    // 例）console.log(word[0]);rが取得できる

    document.addEventListener('click', () => {
        //もし処理が始まっていたらこのイベントは終了とする
        if (isPlaying === true) {
            return;
        }

        isPlaying = true;
        startTime = Date.now();
        setWord();
    });

    document.addEventListener('keydown', e => {
        //メインとなる処理以外のケースを早めに除外してあげて、メインとなる処理をわかりやすくすることを早期リターン、もしくはアーリーリターンと呼ぶ
        if (e.key !== word[loc]) {
            return;
        }


        //word[loc]は最初のkeyダウンで0になるのでrが取得できる
        //分岐の部分でタイプした内容がrであればtrueとなる
        //(今回は早期リターンに切り替えた為コメントにした)
        // if (e.key === word[loc]) {
        loc++;
        // ※repeatとsubstringについてを参照
        target.textContent = '_'.repeat(loc) + word.substring(loc);
        // }

        if (loc === word.length) {
            //wordsの配列がなくなった場合は結果を表示したいので下記とする
            if (words.length === 0) {
                //Date.now() - startTimeで経過時間が表示されるがミリ秒なので1000で割ることで秒数で表示することができる
                //また、toFixedで小数点以下二桁まで指定して表示する
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                const result = document.getElementById('result');
                result.textContent = `Finished! ${elapsedTime} seconds!`;
                return;
            }
            setWord();
        }
    });
}




    //キーが押されたときのイベントはkeydown
    //押したキーの情報が欲しいのでイベントオブジェクトを引数で受けっとっておく
    //引数名はなんでも良いがイベントオブジェクトのeにする
    // document.addEventListener('keydown', e => {
        // console.log(e);
        // 上記で確認するとeの中に入っているイベントオブジェクトの中にkeyプロパティがあり、下記でeのkeyプロパティを取り出している
        // addEventListener()の第二引数に渡す関数は引数にeventをとる
        // イベントが発火してaddEventListener()に渡された関数が実行される際には必ずeventオブジェクトが引数として渡ってくる
        // const target = document.getElementById('target');
        // target.textContent = e.key;
    // });

    // ※repeatとsubstringについて
    //repeatについては"a".repeat(10);とすると、これは文字列"aaaaaaaaaa"を返します。文字列"a"を10個繰り返したということになります。
    //substringについては"abc".substring(1);と書くと、文字列"bc"が返ります。これは、元の文字列"abc"の1文字目よりあとの文字列"bc"が返されていると考えていただければと思います。
    // また、"abc".substring(1,2);とすると、元の文字列"abc"の1文字目よりあとから2文字目までを返しますので結果は"b"となります。

    //new Date()とDate.now()について

    // new Date() は Date オブジェクトを生成するのに対して
    // Date.now() は下記の数値を返します。

    // 「Date.now() メソッドは、UTC (協定世界時) での 1970 年 1 月 1 日 0 時 0 分 0 秒 から現在までの経過時間をミリ秒単位で返します。」

    // 日時を扱うときは Date オブジェクト(new Date())を使うと思ってください。

    // Date.now() から数値を取得するのは
    // 今回のように秒数の差分だけが取りたいときなど特定の場面です。
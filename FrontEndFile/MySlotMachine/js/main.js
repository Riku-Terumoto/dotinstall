'use strict';

{
    class Panel{
        //section 要素に panel クラスをつけて、そのなかに img 要素と stop ボタンを div 要素で追加したうえで、 section を main に対して追加する
        constructor(){
            //section だけ const で定数にしたのは、 section はこのコンストラクターの中でしか使わないからですね。
            //mg と stop に this をつけたのはこのクラスのほかのメソッドから呼び出したいから
            const section = document.createElement('section');
            section.classList.add('panel');

            this.img = document.createElement('img');
            this.img.src = this.getRandomImage();

            this.timeoutId = undefined;

            this.stop = document.createElement('div');
            this.stop.textContent = 'STOP';
            //最初からstopは押せないようにする為にinacive
            this.stop.classList.add('stop', 'inactive');
            this.stop.addEventListener('click', () =>{
                if (this.stop.classList.contains('inactive')) {
                    return;
                }
                this.stop.classList.add('inactive');
                clearTimeout(this.timeoutId);
                panelsLeft--;
                
                if (panelsLeft === 0) {
                    //stopを押し終えたらinactiveを外して押せる状態にする
                    //再度ゲームができるようにする
                    spin.classList.remove('inactive');
                    panelsLeft = 3;
                    checkResult();
                }

            })


            section.appendChild(this.img);
            section.appendChild(this.stop);

            const main = document.querySelector('main');
            main.appendChild(section);
        }


        //画像をランダムで取得するメソッド
        getRandomImage() {
            const images = [
                'img/seven.png',
                'img/bell.png',
                'img/cherry.png',
            ];



            return images[Math.floor(Math.random() * images.length)];
        }

        //ランダムで取得した画像をimgのsrc属性に入れるメソッド
        spin() {
            this.img.src = this.getRandomImage();
            this.timeoutId = setTimeout(() => {
                this.spin();
            },50)
        }

        isUnmached(p1,p2){
            // 条件が true だったら true を返す、 false だったら false を返すので、この条件自体を return してあげても良い
            // if (this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
            //     return true;
            // } else {
            //     return false;
            // }
            return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
            // ここのthis.img.srcは、最初の画像というよりもクルクル回ってる画像の中で
            // clickを押したときの画像という方が解釈的には正しいと思います。

            // それを処理しているソースは、下記の部分となります。
            // this.stop.addEventListener('click', () => {
            // clearTimeout(this.timeoutId); // ここでsetTimeoutを止めて、this.img.srcを確定させている
            //     }
            // this.img.srcの中にクリック時に確定した3枚の画像が入っていて、p1とp2の画像を抜き取ると最後に残るのは今回判定対象のthis.img.srcになるので上記の判定ができると解釈した
        }


        unmatch(){
            this.img.classList.add('unmatched');
        }

        activate(){
            this.img.classList.remove('unmatched');
            this.stop.classList.remove('inactive');
        }
    }

    // こちらの関数ですが、個々のパネルに関する処理ではなくて、パネル同士を比較する処理なので、 panel クラスの外で書い
    function checkResult(){
        // パネルをひとつずつ調べてほかのパネルとマッチしなかったら、色を薄くしてあげればいい
        if (panels[0].isUnmached(panels[1],panels[2])) {
            panels[0].unmatch();
        }
        if (panels[1].isUnmached(panels[0],panels[2])) {
            panels[1].unmatch();
        }
        if (panels[2].isUnmached(panels[0],panels[1])) {
            panels[2].unmatch();
        }
    }
    
    //インスタンス作成
    const panels = [
        //画面に表示されている画像一覧
        new Panel(),
        new Panel(),
        new Panel(),
    ];

    // いくつ動いているパネルが残っているかをまずは変数で保持(クラス外だからlet)
    let panelsLeft = 3;

    //spinボタンを押したときにインスタンス配列のpanelsをforEachをして全てに干渉できるようにする
    //その後、Panelクラス内で定義したspin()を実行する
    //phpみたいにクラス内の関数実行はpanels->spin();って感じでpanel.spin();とする
    const spin = document.getElementById('spin');
    spin.addEventListener('click', () => {
        //containsでinaciveが付いているから検査
        if (spin.classList.contains('inactive')) {
            return;
        }
        spin.classList.add('inactive');
        panels.forEach(panel => {
            //
            panel.activate();
            panel.spin();
        })
    });
}

// ※thisの概要
// this はクラスから作られるインスタンスを表します。これはこのレッスンでも同じです。

// 以下のコードでは、「クラスから作られるインスタンス」は panel のことです。そのため、this.img = ... でセットしたプロパティには panel.img でアクセスできます。クラス定義内では実際のインスタンス名（ここでは panel）がわからないので、 this で表現することになっています。

// class Panel {
//   constructor() {
//     const section = document.createElement('section');
//     section.classList.add('panel');

//     this.img = document.createElement('img');
//   }
// }

// const panel = new Panel();

// const で定義した定数は、{} で区切られた範囲しか有効になりません。
// const だけを使う場合は、img が必要になるたびにいちいち定義しなおさないといけません


// これでは面倒なので、予め必要な img 等はインスタンスに紐付けるかたちで保存することにしました。

// このコードでは img がインスタンスに紐付いて保存されます。クラス定義の外からは panel.img でアクセスできますし、クラス定義内の他のメソッドからでも this.img で呼び出すことができます

// class Panel {
//   constructor() {
//     const section = document.createElement('section');
//     section.classList.add('panel');

//     this.img = document.createElement('img');
//   }
//   spin() {
//     this.img.src = this.getRandomImage();
//   }
// }

// const panel = new Panel();
// panel.img



// this.img = document.createElement('img'); などは通常の変数ではなく、オブジェクトにプロパティを追加する処理です。

// 例えば以下のコードをみてみましょう

// const a = {};
// console.log(a.timeoutId); // => undefined

// a.timeoutId = 1;
// console.log(a.timeoutId); // => 1
// a というオブジェクトの timeoutId プロパティの値を参照しようとしています。JavaScript のオブジェクトは、存在しないプロパティのデフォルト値は undefined です。よって 2 行目の時点では a.timeoutId は undefined になります。

// a.timeoutId = 1; することで timeoutId プロパティに値がセットされるので、 a.timeoutId の値は 1 になります。

// JavaScript のオブジェクトは、存在しないプロパティのデフォルト値は undefined なので、

// a.timeoutId = undefined
// は書いても書かなくても同じです。

// this.timeoutId = undefined;を省略（コメントアウト）しても問題なく動作するのはなぜでしょうか。

// こちらも先程の例と同様に考えることができます。

// this.timeoutId = undefined;
// を書かなくても、 timeoutId プロパティは存在しないため、予め undefined が代入されていると考えることができます。




// ※クラスを使うメリット
// たとえば今回はパネルをあらわす Panel クラスを作っていますね。

// クラスを使う大きな理由のひとつは関心事をクラス内に閉じ込められることです。

// Panel クラスをうまく設計すると、
// コード全体でこういうことが言えるようになります。

// パネルに関する操作をしたいときは Panel クラスだけを見ればいい
// パネルの一部を書き換えても、パネル以外の箇所に影響を与えない
// 他の箇所を書き換えることでパネルの性質が変わることはない
// もしパネルのコードを Panel クラスの中にまとめずに
// JavaScript のプロジェクトのソースコードのあっちこっちにパネルの設計が書かれていたら
// パネルのある部分を変更するときにコードのどこを見ればいいのかわかりにくくなります。

// またパネルのコードがクラスの外部にあると
// パネルだけを変更したいいのにその影響がどこまで及ぶかについて
// 常にソースコード全体を見張る必用が出てきます。

// そしてパネルと関係ない部分を書き換えたせいでパネルが動かなくなることもあります。

// パネルに関することを Panel クラスに任せることで
// これらの問題を避けることができるようになります。

// 今回はひとりでコードを書いていますが、
// 複数の人でひとつのプロジェクトのコードを書くときなどは
// 特にこのメリットが活きてきます。

// 慣れないうちは「わざわざクラスにまとめる」という感じがすると思いますが
// たくさんコードを書くようになると
// クラスを使わない方がずっと面倒だと感じるようになるかと思います。
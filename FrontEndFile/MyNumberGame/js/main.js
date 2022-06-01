'use strict';

{

    class Panel{
        //constructor メソッドは、 class で作成されたオブジェクトの生成と初期化のための特殊なメソッドです。
        //Panelクラスをインスタンス化した際に引数に入れたGameクラスのインスタンスを
        //コンストラクタで受け取ってPanelクラスでも使用できるようにしている
        constructor(game){
            //受け取ったGameクラスのインスタンスをgameプロパティに代入する
            this.game = game;
            this.el = document.createElement('li');
            this.el.classList.add('pressed');
            //今回の場合 Panel クラスのインスタンスは複数作成されますが、そのすべてに同じイベントリスナーが設定されていることが期待されるためですね。
            //Panel クラスのコンストラクタ内にイベントリスナーを記述しないとすると。 Panel クラスのインスタンスを作成するたびに明示的にイベントリスナーを設定することになります。
            this.el.addEventListener('click', () => {
                this.check();
            });
        }

        getEl(){
            return this.el;
        }

        activate(num){
            this.el.classList.remove('pressed');
            this.el.textContent = num;
        }

        check(){
            //this.el.textContent は文字列なので、 parseInt() で数値にしてあげて、比較してあげる
            //parseInt() 関数は、文字列の引数を解析し、指定された基数 (数学的記数法の底) の整数値を返します。
            //parseIntの第二引数には基数を指定することができて、10とすると第一引数で与えられた文字列を10進数として解釈しますという意味になります。
            if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
                this.el.classList.add('pressed');
                //他クラスのプロパティを直接操作するのは好ましくないのでメソッドにして操作する（カプセル化）
                this.game.addCurrentNum();

                // if (this.game.getCurrentNum() === 4) {
                    // パネル分を比較
                if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
                    clearTimeout(this.game.getTimeoutId());
                }
            }
        }
    }

    class Board{
        //Boardクラスをインスタンス化した際に引数に入れたGameクラスのインスタンスを
        //コンストラクタで受け取ってBoardクラスでも使用できるようにしている
        constructor(game){
            //受け取ったGameクラスのインスタンスをgameプロパティに代入する
            this.game = game;
            this.panels = [];

            
            //今まで 4 と書いていたところを this.game.getLevel() の 2乗 と表現するとパネルが増える為、難易度が上がる
            // for (let i = 0; i < 4; i++) {
            for (let i = 0; i < this.game.getLevel() ** 2; i++) {
                this.panels.push(new Panel(this.game));
            }
            this.setup();
        }

        setup(){
            const board = document.getElementById('board');
            this.panels.forEach(panel => {
                //今回追加するのは li 要素なのでpanel の el プロパティを追加してあげればよいのですけれども、実はクラスのプロパティに外部から直接アクセスしないほうがよいとされているので、こちらのプロパティはメソッド経由で取得したほうがいい
                //直接プロパティにアクセスせずに、わざわざメソッドを作ってアクセスすることをオブジェクト思考のカプセル化と呼ぶ
                //逆に関数だったら別のクラスから使ってよいらしい
                // board.appendChild(panel.el);
                board.appendChild(panel.getEl());
            });
        }


        activate() {
            // const nums = [0,1,2,3];
            const nums = [];
            //パネル分プッシュ
            for (let i = 0; i < this.game.getLevel() ** 2; i++) {
                nums.push(i);
            }


            this.panels.forEach(panel => {
                //splice() の返り値はひとつでも配列になるので、 [0] を付けて中身を取り出してあげる必要があるので注意
                const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
                panel.activate(num);
            });
        }
    }

    class Game{
        constructor(level){
            this.level = level;
            //以下の引数はGameクラスのインタンスを引数で渡して他クラスでも
            //Gameのインタンスを使用できるようにしている
            this.board = new Board(this);

            //今押し込むべき数値を currentNum で保持
            this.currentNum = undefined;
            this.startTime = undefined;
            this.timeoutId = undefined;


            const btn = document.getElementById('btn');
            btn.addEventListener('click', () => {
                this.start();
            });
            this.setup();
        }

        setup(){
            const container = document.getElementById('container');
            const PANEL_WIDTH = 50;
            const BOARD_PADDING = 10;
            /* 50px * 2 + 10px * 2 */
            container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
        }

        start(){
            //timeoutIdが空じゃなかったらタイマーは動いているので止めてあげる
            //typeof 演算子は対象となる値のデータ型を表す文字列を返す演算子です。
            // typeof timeoutId !== 'number'でも良いがundefined かどうかをチェックしているというのは、何に関心があるのかというのをコードに落としているからかなと思います。

            // この部分では timeoutId には何が入っててもいいけど、 undefined かどうかだけに関心があります。
            // timeoutId が number かどうかをチェックするということは string や object などではなく number が入ってることに関心があるというように見えてしまいます。

            // ロジックとしてはどちらでも問題なく動きますが、何に関心がありどのようにコードを書くとその意図が汲み取りやすいかを考えると良いのかなと思います。

            // == を使った方が便利な場合がありますが、 === を使った方がバグの少ないコードになることが多いです。ですので基本的には === を使うことをお勧めしています。
            if (typeof this.timeoutId !== 'undefined') {
                clearTimeout(this.timeoutId);
            }

            this.currentNum = 0;
            this.board.activate();

            this.startTime = Date.now();
            this.runTimer();
        }

        runTimer(){
            //現在の時刻から START ボタンを押したときの時刻を引いてあげるのですが、デフォルトでミリ秒単位なので 1000 で割ってあげて、小数点以下 2 桁までを表示するために toFixed()
            const timer = document.getElementById('timer');
            timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
    
            //10ms後にruntimerを呼び出すことを繰り返すのでタイマーの完成
            this.timeoutId = setTimeout(() => {
                this.runTimer();
            }, 10);
        }

        addCurrentNum(){
            this.currentNum++;
        }

        getCurrentNum(){
            return this.currentNum;
        }

        getTimeoutId(){
            return this.timeoutId;
        }

        getLevel(){
            return this.level;
        }

    }

    new Game(5);    
}

// ※コンストラクタの概要
// コンストラクターを使用すると、インスタンス化されたオブジェクトに対して、他のメソッドを呼び出す前に行う必要のある独自の初期化を提供することができます。

// class Person {

//   constructor(name) {
//     this.name = name;
//   }

//   introduce() {
//     console.log(`Hello, my name is ${this.name}`);
//   }

// }

// const otto = new Person('Otto');

// otto.introduce();
// Copy to Clipboard



// ※クラスを汎用的は汎用的にする為の一例
// dotinstallの質問を参照している

// Gameクラスのインスタンスを作成する際に、以下のように変数として、

//  const game = new Game();
// Panelクラス内のcheck()メソッドを以下のようにしても問題なく動きました。

//    check() {
//       if (game.currentNum === parseInt(this.el.textContent, 10)) {
//         this.el.classList.add('pressed');
//         game.currentNum++;

//         if (game.currentNum === 4) {
//           clearTimeout(game.timeoutId);
//         }
//       }
//     }
// レッスンの方法は少し回りくどく、こちらの方法の方がシンプルと考えますが、この方法だと何か問題がありますか？
// ※カプセル化していないことは問題かと思いますが、本題と逸れるため、無視頂けると助かります。

//  先生
// 質問機能をご利用いただきありがとうございます。

// そうですね、ご質問者さんが書かれたコードでも動作はするかと思います。

// ただ、クラスは汎用的に使えるようにするためにあります。
// クラスを使う人がGameクラスをグローバル定数に入れずに使用したら、Panelクラスは動作しなくなります。
// また、gameという定数名を違う名前にしてしまっても動作しなくなりますね。

// クラスは処理をまとめたものですが、誰でも同じように使用できることも目的のひとつなので、グローバル定数を直接使うといった設計はするべきではないと思います。

//  ユーザー
// ご回答ありがとうございます。
// グローバル定数が理解できていません。
// 「クラスを使う人がGameクラスをグローバル定数に入れずに使用したら」の所を補足して頂けないでしょうか？

//  先生
// ご質問者さんが以下のように記述した箇所はお手本のコードの最後（98行目）に記述しているnew Game();の箇所ですよね？

// const game = new Game();
// 上記のコードはクラスのブロック外のグローバルスコープに記述しています。グローバルスコープに定義する変数や定数をグローバル変数・定数といいます。
// ここをお手本の通りにnew Game();すると動作しなくなってしまいますよね。
// 「クラスを使う人がGameクラスをグローバル定数に入れずに使用したら」というのはこのことになります。

// 一人で開発している場合には動作すれば良し、という考え方もできますが、実務では複数人で開発していくことが多く、一つのクラスを複数人が使うこともよくあります。
// ご質問者さんが書いたコードですと、Panelクラスを使う場合にはGameクラスをインスタンス化するときにgameという名前のグローバル定数にインスタンスを入れておかなければならない、というルールが必要になっていまいますよね。
// また、そのルールをプロジェクト全員に共有し把握してもらう必要があります。

// ですが、Panelクラスをインスタンス化するときに、Gameクラスのインスタンスも必要だからコンストラクタで渡してね、というルールにしておけば、Gameクラスのインスタンスを入れておく場所も名前もPanelクラスは気にしなくてよくなります。
// そのルールもPanelクラスの定義を見ればわかるので、共有せずとも把握することも可能です。

// クラスの機能はクラスの中だけで完結させるべきなので、クラス外のコードに依存する設計は望ましくない、ということになります。

// お手本のコードは一見回りくどく感じてしまうかもしれませんが、よく使われる手法なので慣れておくことをお勧めします。
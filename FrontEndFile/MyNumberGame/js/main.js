'use strict';

{

    class Panel{
        //constructor メソッドは、 class で作成されたオブジェクトの生成と初期化のための特殊なメソッドです。
        constructor(){
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

        acivate(num){
            this.el.classList.remove('pressed');
            this.el.textContent = num;
        }

        check(){
            //this.el.textContent は文字列なので、 parseInt() で数値にしてあげて、比較してあげる
            //parseInt() 関数は、文字列の引数を解析し、指定された基数 (数学的記数法の底) の整数値を返します。
            //parseIntの第二引数には基数を指定することができて、10とすると第一引数で与えられた文字列を10進数として解釈しますという意味になります。
            if (currentNum === parseInt(this.el.textContent, 10)) {
                this.el.classList.add('pressed');
                currentNum++;

                if (currentNum === 4) {
                    clearTimeout(timeoutId);
                }
            }
        }
    }

    class Board{
        constructor(){
            this.panels = [];
            for (let i = 0; i < 4; i++) {
                this.panels.push(new Panel());
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
            const nums = [0,1,2,3];

            this.panels.forEach(panel => {
                //splice() の返り値はひとつでも配列になるので、 [0] を付けて中身を取り出してあげる必要があるので注意
                const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
                panel.acivate(num);
            });
        }
    }

    function runTimer(){
        //現在の時刻から START ボタンを押したときの時刻を引いてあげるのですが、デフォルトでミリ秒単位なので 1000 で割ってあげて、小数点以下 2 桁までを表示するために toFixed()
        const timer = document.getElementById('timer');
        timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2);

        //10ms後にruntimerを呼び出すことを繰り返すのでタイマーの完成
        timeoutId = setTimeout(() => {
            runTimer();
        }, 10);
    }

    const board = new Board();

    //今押し込むべき数値を currentNum で保持
    let currentNum = 0;
    let startTime;
    let timeoutId;


    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        //timeoutIdが空じゃなかったらタイマーは動いているので止めてあげる
        //typeof 演算子は対象となる値のデータ型を表す文字列を返す演算子です。
        // typeof timeoutId !== 'number'でも良いがundefined かどうかをチェックしているというのは、何に関心があるのかというのをコードに落としているからかなと思います。

        // この部分では timeoutId には何が入っててもいいけど、 undefined かどうかだけに関心があります。
        // timeoutId が number かどうかをチェックするということは string や object などではなく number が入ってることに関心があるというように見えてしまいます。

        // ロジックとしてはどちらでも問題なく動きますが、何に関心がありどのようにコードを書くとその意図が汲み取りやすいかを考えると良いのかなと思います。

        // == を使った方が便利な場合がありますが、 === を使った方がバグの少ないコードになることが多いです。ですので基本的には === を使うことをお勧めしています。
        if (typeof timeoutId !== 'undefined') {
            clearTimeout(timeoutId);
        }
        board.activate();

        startTime = Date.now();
        runTimer();
    });
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

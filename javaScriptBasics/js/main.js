'use strict';

{

// const scores = [70,78,83,87]

//splice関数
// scores.push(60,81);
// scores.splice(1,1,40,50);

// for (let i = 0; i < scores.length; i++) {
//     console.log(`Score ${i}; ${scores[i]}`);
// }

// forEachは引数に関数を渡す
//  scores.forEach((score, index) => {
//      console.log(`Score ${index}; ${score}`);
//  });

//mapも引数に関数を渡す
// const prices = [180,190,200]
// const updatePrices = prices.map((price) => {
//     return price + 20;
// });
// const prices = [180,190,200]
// const updatePrices = prices.map(price => price + 20);
// console.log(updatePrices);


//filter関数
// const numbers = [1,4,7,8,10]
// const evenNumbers = numbers.filter( number => {
//     if (number % 2 === 0) {
//         return true;
//     } else{
//         return false;
//     }
// });


// const numbers = [1,4,7,8,10]
// const evenNumbers = numbers.filter( number => number % 2 === 0);

// console.log(evenNumbers);

//オブジェクト(forEachは使えない)
// const point = [100,180];
// const point = {
//     x:100, 
//     y:180,
// };
// xがキー、100が値　二つ合わせてプロパティ

//値変更
// point.x = 120;
// point['x'] = 120;

// console.log(point.x);
// console.log(point['y']);

//値追加
// point.z = 90;

//値削除
// delete point.y;

//スプレッド構文 (...) を使うと、配列式や文字列などの
// 反復可能オブジェクトを、0 個以上の引数 (関数呼び出しの場合) や
// 要素 (配列リテラルの場合) を期待された場所で展開したり、
// オブジェクト式を、0 個以上のキーと値の組 (オブジェクトリテラルの場合)
//  を期待された場所で展開したりすることができます。
    // const otherProps = {
    //     r:4,
    //     color: 'red',
    // };
    // const point = {
    //     x:100, 
    //     y:180,
    //     ...otherProps
    // };
    // console.log(point);
    //分割代入 (Destructuring assignment) 構文は、
    // 配列から値を取り出して、あるいはオブジェクトからプロパティを取り出して
    // 別個の変数に代入すること
    // 分割代入でスプレッド構文を使う場合は展開ではなく、配列あるいはオブジェクト
    // を保持


    // const {x,r, ...others} = point;
    // console.log(x);
    // console.log(r);
    // console.log(others);

    //Object.keys関数
    //オブジェクトのキーを配列で取得できる
    //配列にはforEachが使えるから回す
    // const point = {
    //     x:100, 
    //     y:180,
    // };
    // const keys = Object.keys(point);
    // keys.forEach( key =>{
    //     console.log(`key; ${key} Value:${point[key]}`);
    // });

    // const points =[
    //     {x: 30, y:20},
    //     {x: 10, y:50},
    //     {x: 40, y:40}
    // ]
    //配列の中にオブジェクトが入っている場合の取得方法
    //インデックス番号でオブジェクト取得してから
    //キーを指定して値を取得する
    // console.log(points[1].y);

    // 変数の挙動について
    // let x = 1;
    // let y = x;
    // x = 5;
    // console.log(x); 5
    // console.log(y); 5

    // let x = [1,2];
    // let y = x;
    // x[0] = 5;
    // console.log(x); [5,2]
    // console.log(y); [5,2]
    // 配列、オブジェクトの場合はyにxを代入するとyはxを参照するので
    // xの値が変化すればyの値も変わる
    // 配列じゃない場合はそのまま代入となる

    // ただ、配列、オブジェクトを丸ごとコピーしたい時もあるから
    // その時はスプレッド構文を使用する
    // スプレッド構文を使用することで値がそのまま展開されるので
    // 配列がyに初めて代入されることになる

    // let x = [1,2];
    // let y = [...x];
    // x[0] = 5;
    // console.log(x); [5,2]
    // console.log(y); [5,2]

    // 文字列操作
    // const str = 'hello';
    // 文字数取得
    // console.log(str.length);

    // 部分文字列取得
    // str.substring(開始位置、終了位置);
    // console.log(str.substring(2,4));

    // console.log(str[1]);
    // 上記は値を取得できるだけで配列お同じように扱えるわけではない
    // strに対してforEachを使用できるわけではない

    // join(),split()
    // const d = [2019,11,14];
    // 間に/を入れたい時
    // console.log(d.join('/'));
    // 間に空白を入れたい時
    // console.log(d.join(' '));
    
    // joinとは逆に文字列を区切り文字のところで分割してそれを
    // 配列にしたい時はsplit()が使える
    // const t ='17:08:24';
    // console.log(t.split(':'));
    // 分割代入
    // const [hour,minute,second] = t.split(':');
    // console.log(hour);
    // console.log(minute);
    // console.log(second);

    // 数値操作
    // const scores = [10,3,9];
    // let sum = 0;
    // scores.forEach(score => {
    //     sum += score;
    // });

    // const avg = sum / scores.length;

    // console.log(sum);
    // console.log(avg);

    // // 小数点切り捨て
    // console.log(Math.floor(avg));
    // // 小数点切り上げ
    // console.log(Math.ceil(avg));
    // // 四捨五入
    // console.log(Math.round(avg));
    // // 指定した桁数になるようにする
    // console.log(avg.toFixed(3));

    // 乱数を扱う
    // console.log(Math.random());

    // 0,1,2
    // Math.floor(Math.random() * 3)

    // 0, ....,n
    // Math.floor(Math.random() * (n + 1))

    // min, ....,max
    // Math.floor(Math.random() * (max + 1 - min) + min
    
    // 0以上、6未満で6を含まないから1を足している
    // console.log(Math.floor(Math.random() * 6) + 1);

    // 現在日時を扱う
    // const d = new Date();
    // console.log(d);

    // 年を取得
    // d.getFullYear();

    // 月を取得(0,1で表現される0-11)
    // d.getMouth();

    // 日を取得
    // d.getDate(); (1-31)
    // d.getDay(); (0-6)sun,mon,thu

    // 時間
    // getHours() 0-23
    // getMinutes() 0-59
    // getSeconds() 0-59
    // getMilliseeconds() 0-999

    // console.log(`${d.getMonth() + 1} 月 ${d.getDate()} 日`);
    // console.log(`お腹すいた`);

    // 特定の日時を操作
    // const d = new Date(2019.10); 2019/11/01 00:00:00
    // d.setHours(10,20,30); 2019/11/01 10:20:30
    // d.setDate(31);  2019/12/01 10:20:30
    // d.setDte(d.getDate() + 3) 2019/12/04 10:20:30
    // console.log(d);

    // alert(),confirm()を使う
    // alert('hello');
    // const answer = confirm('削除しますか');
    // if (answer) {
    //     console.log('削除しました')
    // } else {
    //     console.log('キャンセルしました');
    // }
    //関数を引数に渡す際に関数自体の処理に返り値がなかったら
    //undefindを渡すことになるので()はいらない

    // let i = 0; 
    // function showTime(){
    //     console.log(new Date());
    //     i++;
    //     if (i > 3) {
    //         clearInterval(intervalId);
    //     }
    // }
    // const intervalId = setInterval(showTime,1000);
    // let i = 0;
    //    function showTime(){
    //     console.log(new Date());
    //     const timeoutId = setTimeout(showTime, 1000);
    //     i++;
    //     if (i > 2) {
    //         clearTimeout(timeoutId);
    //     }
    // }
    // showTime();

    //タイム処理の違い
    //setInterval ⇨ 一定時間　繰り返す
    //処理実行時間が一定時間を上回った場合は処理終了まで待たずに
    //次の処理に移るため負荷がかかる

    //setTimeout ⇨ 指定時間に一度だけ実行
    //setTimeoutで繰り返し処理をすると処理終了をまってから次の処理に移る
    //負荷が少ない


    //例外処理
    //toUppercase（文字列を大文字にする）は文字列しか使えない
    //trycatchは例外が起きそうな処理に使う、例外が起きても処理を止めたくない場合
    //catchの引数には例外処理が入る（よく使われるのはerrorのe）

    // const name = 'taguchi';
    // const name = 5;
    
    // try {
    //     console.log(name.toUpperCase());
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log('Finish!');

    // オブジェクトが複数ある場合を考えよう

    // const posts = [
    //     {
    //         text: 'javaScriptの勉強中・・・',
    //         likeCount: 0,
    //         // show: function () {
    //         //     console.log(`${this.text} - ${this.likeCount}いいね`);
    //         // },省略形が以下
    //         show() {
    //             console.log(`${this.text} - ${this.likeCount}いいね`);
    //         },
    //     },
    //     {
    //         text: 'プログラミング楽しい！',
    //         likeCount: 0,
    //         show() {
    //             console.log(`${this.text} - ${this.likeCount}いいね`);
    //         },
    //     },
    // ];


    // show(posts[0]);
    // posts[0].show();
    // posts[1].show();


    //クラスの概念
    //オブジェクトなどの使いまわしたい情報がクラス
    //実際に値を入れるオブジェクトのことをインスタンス
    // class Post{
    //     constructor(text) {
    //         this.text = text;
    //         this.likeCount = 0;
    //     }

    //     show() {
    //         console.log(`${this.text} - ${this.likeCount}いいね`);
    //     }
    // }
    // const posts = [
    //     new Post('javaScriptの勉強中・・・'),
    //     new Post('プログラミング楽しい！'),
    // ];


    // // show(posts[0]);
    // posts[0].show();
    // posts[1].show();






    //静的メソッド
    // class Post{
    //     constructor(text) {
    //         this.text = text;
    //         this.likeCount = 0;
    //     }

    //     show() {
    //         console.log(`${this.text} - ${this.likeCount} likes`);
    //     }

    //     like() {
    //         this.likeCount++;
    //         this.show();
    //     }
    //     // 静的メソッド
    //     // thisは使えない
    //     // thisはこのクラス内のインスタンスに使う
    //     // 静的メソッドはインスタン化せずに呼び出すためにthisは使えない
    //     static showInfo() {
    //         console.log('Post class version 1.0');
    //     }
    // }
    // const posts = [
    //     new Post('javaScriptの勉強中・・・'),
    //     new Post('プログラミング楽しい！'),
    // ];


    // posts[0].like();
    // Post.showInfo();


    //複数クラスの生成
    //クラスの継承



    // class Post{ //親クラス
    //     constructor(text) {
    //         this.text = text;
    //         this.likeCount = 0;
    //     }

    //     show() {
    //         console.log(`${this.text} - ${this.likeCount} likes`);
    //     }

    //     like() {
    //         this.likeCount++;
    //         this.show();
    //     }
    // }
    // class SponsoredPost extends Post{ //子クラス
    //     constructor(text , sponsor) {
    //         super(text); //親クラスのコンストラクタも呼び出せる
    //         this.sponsor = sponsor;
    //     }

    //     show() {
    //         super.show();
    //         console.log(`...sponsored by ${this.sponsor}`);
    //     }
    // }

    // const posts = [
    //     new Post('javaScriptの勉強中・・・'),
    //     new Post('プログラミング楽しい！'),
    //     new SponsoredPost('3分動画でマスターしよう','dotinstall'),
    // ];

    // posts[2].show();
    // posts[2].like();



    //DOMについて理解する
    //Document Object Model
    //html読み込み→データ構造作成(DOM)→ブラウザ表示
    //DOMのそれぞれのデータをNodeと呼ぶ
    //documentから始まって枝分かれしているこれをNodeツリーもしくはDOMツリーと呼ぶ
    //文書の字下げや空白もNodeになるが、先頭と末尾はNodeにはならない
    //例 Element Node,text Node,Parent Node,Child Node等
    //querySelectorは指定した値の最初だけを取得


    //要素を取得する方法
    // id属性がついていたら... getElementById()
    //一つの要素を取得するなら... querySelector()
    //複数の要素を取得するなら... querySelectorAll()
    //その他の方法... getElemetsByTagName(),getElementsByClassName()
    //ulの子Nodeを取得したいなら... 
    //ul.childNodes(入れ子全部) ul.children(liのNodeだけ)
    //ul.firstChild(最初の子要素) ul.lastchild(最後の子要素)
    //ul.firstElementChild(liのNodeの最初だけ)
    //ul.lastElementChild(liのNodeの最後だけ)

    //li.parentNode(親要素取得) 
    //li.previousSibling(ひとつ前の兄弟要素取得)
    //li.nextSibling(ひとつ後の兄弟要素取得)
    //li.previousElementSibling(ひとつ前の兄弟liのNode取得)
    //li.nextElementSibling(ひとつ後の兄弟liのNode取得)


    // function update(){
    //     // document.getElementById('target').textContent = 'Changed!';
    //     // document.querySelectorAll('p')[1].textContent = 'Changed!';
    //     document.querySelectorAll('p').forEach((p,index) => {
    //         p.textContent = `${index}番目のpです`;
    //     })
    // }

    // setTimeout(update,1000);

    //イベント処理
    //cssのプロパティで「-」が入っているものは2単語目1文字目を大文字にして1単語目と繋げる

    // document.querySelector('button').addEventListener('click', () => {
    //     const targetNode = document.getElementById('target');
    //     targetNode.textContent = 'Changed!';
    //     targetNode.title = 'This is title!';
    //     targetNode.style.color = 'red';
    //     targetNode.style.backgroundColor = 'skyblue';
    // });

    //classNameは既存のクラスを上書きしてしまう
    //classList.add()は既存のクラスはそのままで追加してくれる
    //containsはクラスが付いているか確認してくれる
    // document.querySelector('button').addEventListener('click', () => {
    //     const targetNode = document.getElementById('target');

        // targetNode.className = 'my-color my-border';
        // targetNode.classList.add('my-color');
        // if (targetNode.classList.contains('my-color') == true) {
        //     targetNode.classList.remove('my-color');
        // } else {
        //     targetNode.classList.add('my-color');
        // }
    //     target.classList.toggle('my-color');
    // });


    //カスタムデータ属性
    // document.querySelector('button').addEventListener('click', () => {
    //     const targetNode = document.getElementById('target');

    //     // targetNode.textContent ='Dotinstall!';
    //     targetNode.textContent = targetNode.dataset.translation;
    // });




    //li要素を作成、ulに追加
    // document.querySelector('button').addEventListener('click', () => {
    //     const item2 = document.createElement('li');
    //     item2.textContent = 'item 2';

    //     const ul = document.querySelector('ul');
    //     ul.appendChild(item2);
    // });


    //要素の複製、指定場所に追加
    // document.querySelector('button').addEventListener('click', () => {
    //     const item0 = document.querySelectorAll('li')[0];
    //     //cloneNodeの引数にfalseを渡すとliの中身を複製しない
    //     const copy = item0.cloneNode(true);

    //     const ul = document.querySelector('ul');
    //     const item2 = document.querySelectorAll('li')[2];
    //     ul.insertBefore(copy,item2);
    // });



    //要素削除
    // document.querySelector('button').addEventListener('click', () => {
    //     const item1 = document.querySelectorAll('li')[1];
    //     // item1.remove(); removeはブラウザによっては使えない場合もある
    //     //親Node.removeChild(削除するNode)
    //     document.querySelector('ul').removeChild(item1);
    // });


    //要素作成
    // document.querySelector('button').addEventListener('click', () => {
    //     const li = document.createElement('li');
    //     const text = document.querySelector('input');

    //     li.textContent = text.value;
    //     document.querySelector('ul').appendChild(li);

    //     text.value = '';
    //     text.focus();
    // });


    //セレクトボックスを扱う
    // document.querySelector('button').addEventListener('click', () => {
    //     const li = document.createElement('li');
    //     const color = document.querySelector('select');

    //     li.textContent = `${color.value} - ${color.selectedIndex}`;
    //     document.querySelector('ul').appendChild(li);
    // });



    //ラジオボタンを扱う
    // document.querySelector('button').addEventListener('click', () => {
    //     const colors = document.querySelectorAll('input');
    //     let selectedColor;//要素保持変数


    //     //全ての要素を回して、どの要素にチェックがついているか確認
    //     //確認後、チェックがついている要素をselectedColorに代入
    //     colors.forEach( color => {
    //         if (color.checked === true) {
    //             selectedColor = color.value;
    //         }
    //     });

    //     const li = document.createElement('li');
    //     li.textContent = selectedColor;
    //     document.querySelector('ul').appendChild(li);
    // });



    // //チェックボックスを操作してみよう
    // document.querySelector('button').addEventListener('click', () => {
    //     const colors = document.querySelectorAll('input');
    //     const selectedColor = [];

    //     colors.forEach(color => {
    //         if (color.checked === true) {
    //             selectedColor.push(color.value);
    //         }
    //     });
    //     const li = document.createElement('li');
    //     const ul = document.querySelector('ul');

    //     li.textContent = selectedColor;
    //     ul.appendChild(li);
    // });

    //色々なイベントを扱う
    // document.querySelector('button').addEventListener('dblclick', () => {
    //     console.log('Double Clicked!');
    // });
    // document.addEventListener('mousemove', () => {
    //     console.log('moved!');
    // });


    //イベントオブジェクトを扱ってみよう
    // document.querySelector('button').addEventListener('dblclick', () => {
    //     console.log('Double Clicked!');
    // });
    // document.addEventListener('mousemove', e => {
    //     console.log(e.clientX, e.clientY);
    // });
    // document.addEventListener('keydown', e => {
    //     console.log(e.key);
    // });

    //フォームで使われるイベントを扱う
    // const text = document.querySelector('textarea');


    // text.addEventListener('focus', () => {
    //     console.log('focus');
    // });
    // text.addEventListener('blur', () => {
    //     console.log('blur');
    // });

    // text.addEventListener('input', () => {
    //     console.log(text.value.length);
    // });
    // text.addEventListener('change', () => {
    //     console.log('change');
    // });

    //フォームを送信しよう
    //以下はsubmitを押下するとコンソールに一瞬表示されるがその後に画面が
    //リロードされてしまうためすぐ消えてしまう
    // document.querySelector('form').addEventListener('submit', () => {
    //     console.log('submit');
    // });

    //対策
    // document.querySelector('form').addEventListener('submit', e => {
    //     e.preventDefault();
    //     console.log('submit');
    // });

    //formタグを使うメリット
    //inputタグでも同様な処理ができるがformタグの方はenterキーでもボタンを
    //押したことになるので便利
    //enterキーで送信するにはformタグの中にbuttonタグが必要だが
    //formタグの中に<input type='text'>が一つだけの場合はbuttonを省略
    //してもenterキーだけで送信することができる


    //イベントの伝搬
    // document.querySelector('ul').addEventListener('click', e => {
    //     if (e.target.nodeName ==='LI') {
    //         e.target.classList.toggle('done');
    //     }
    // });
    // イベントオブジェクト(e)は、イベントハンドラーおよびイベントリスナーにおいて
    // 実行される関数の引数として受け取ることのできるオブジェクトです。
    // そのイベントオブジェクトから、発生したイベントに関わる様々な情報（プロパティ）
    // を知ることができ、またそのイベントを制御するメソッドを活用することができます。

    // document.addEventListener('DOMContentLoaded', function(){
 
    //     var test = document.getElementById('test');
        
    //     function fnc1(e){
    //         console.log(e.target); //イベントが発生した要素
    //         console.log(e.type); //イベントの名前：
    //         console.log(e.timeStamp); //イベントの発生時間
    //         console.log(e.pageX); //クリックされたX座標
    //     }
            


    //     test.addEventListener( 'click', fnc1, false );
        
    // },false);
}

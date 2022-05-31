'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const p = document.querySelector('#result > p');


    //クイズの出題される順番も変える為にはシャッフルする処理のshuffle()を宣言して
    //引数に大元の配列を渡すことで成り立つ
    const quizSet = shuffle([
        {q: '世界で一番大きな湖は?', c: ['カスピ海','カリブ海','琵琶湖'],},
        {q: '2の8乗は?', c: ['256','64','1024'],},
        {q: '次のうち、最初にリリースされた言語は?', c: ['Python','JavaScript','HTML'],},
    ]);

    let currentNum = 0;
    let isAnswered;
    let score = 0;


    function shuffle(arr){
        
        // 概念は※フィッシャー・イェーツのシャッフルと呼ばれるアルゴリズムを参照
        //ランダムに選ぶ範囲の終点のインデックスを i とする
        //その為、配列の個数-1となる
        // let i = arr.length - 1;
        //以下for文の初期化で使っている

        //ランダムに取得した値はjに格納
        //乱数(random())は何以上、何未満で取得されるからiだけだと取りたい要素が全て取れない(-1されているから)
        //乱数に個数分を掛けてインデックス番号で取得されるから全部取得できる
        // const j = Matu.floor(Math random() * (i + 1));

        //arr[i](最後)とarr[j]（乱数）を入れ替えてあげれば良い
        //分割代入を使うarr[i]とarr[j]をまとめて配列にしてひっくり返す
        //後ろからスタートして1ずつ減らしてループ処理をする
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j],arr[i]] = [arr[i],arr[j]];
        }
    
        return arr;
    }

    //正誤判定
    function checkAnswer(li){
        // if (isAnswered === true) {
        //上記の省略形
        //1回目のクリックはfalseだからするされ二回目以降を早期リターン
        if (isAnswered) {
            return;
        }
        isAnswered = true;
        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }

        btn.classList.remove('disabled');
    }


    function setQuiz(){
        isAnswered = false;
        //questionにquizSetの0番目のqを表示
        question.textContent = quizSet[currentNum].q;


        //choicesの子要素（li）の最初がある場合は消すループ
        //結果的にchoicesの中には何もなくなる
        // while ですが、このように () の中に単一のオブジェクトを入れる場合、それが falseや nullでない限り、こちらの {} （ブロック）の中の処理をくり返してくれる
        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        // 関数実行
        //引数に実際の問題を入れる
        //関数の実引数に配列を渡して関数の中で書きかわった内容が返ってくる
        //その為、大元の配列も書き変わってしまうがそれを防ぐために
        //スプレッド構文で配列を展開し、展開した配列を[]で囲うことで新しい配列を
        //引数に渡してくれて大元の配列は変わらない
        //なぜこのようにするかというと正誤判定で今回は全て0番目を正とするので
        //順番がランダムになってしまうと上手く正誤判定ができなくなるから
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        // console.log(quizSet[currentNum].c);
    
        //画面描画
        //quizSetの0番目のcをforEachで回して、それぞれにliを作る
        //作ったそれぞれのliに対してcを入れる
        //liの親要素ulにappendChildする
        // quizSet[currentNum].c.forEach(choice => {
        //     const li = document.createElement('li');
        //     li.textContent = choice;
        //     choices.appendChild(li);
        // });
    
        // 上記の画面描画はshuffle()でquizSet[currentNum]の中身がランダム選択されてからforEachで回して画面描画するのでforEachの対象としていたquizSet[currentNum]はshuffle()の引数に入れて
        // 実際に関数を実行した処理を変数にしたshuffledChoicesでforEachを回す
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        })
        //currentNUmがquizSet.length - 1だった場合(3-1=2だった場合)
        //インデックス番号だから最後の問題が2になる
        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'show Score'
        }
    }
    setQuiz();

    btn.addEventListener('click', () => {
        //containsは左記の条件の場合に使う
        //disabledが付いている場合は次の問題に行ってほしくないので早期リターン
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1) {
            p.textContent = `Score: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }
    });

}

// ※フィッシャー・イェーツのシャッフルと呼ばれるアルゴリズム
// 範囲を狭めながら最後の要素とランダムに選んだ要素を入れ替えていくという手法
// 1,2,3,4,5とあったら
// ランダムで2を選択したとすると
// 最後の要素と選択した要素を入れ替える
// この場合は2と5を入れ替える
// 1,5,3,4,2となって2は除外される
// 1,5,3,4になって再度選択をする
// 4を選択した場合、4は最後の要素なので変わらずに除外される
// これを繰り返し最後の一つになるまで入れ替えていく手法
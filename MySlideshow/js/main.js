'use strict';

{
    const images = [
        'img/pic00.png',
        'img/pic01.png',
        'img/pic02.png',
        'img/pic03.png',
        'img/pic04.png',
        'img/pic05.png',
        'img/pic06.png',
        'img/pic07.png',
    ]

    //imagesのindexが何番目を表示しているかをcurrentIndexで保持
    let currentIndex = 0;

    const mainImage = document.getElementById('main');
    mainImage.src = images[currentIndex];

    //アロー関数は引数が二つ以上あるときは()が省略できない
    //現在mainで表示されている0番目の要素をthumbnailsの方で色を濃くしたい
    // forEachのアロー関数に渡される第二引数はキー（インデックス番号）が渡されるのでindexという引数を用意する
    images.forEach((image,index) => {
        const img = document.createElement('img');
        img.src = image;

        const li = document.createElement('li');

        //最初にcurrentをつける判定
        if (index === currentIndex) {
            li.classList.add('current');
        }

        //クリックした対象の画像をまずmainのsrcに入れる
        //その後、li全取得して全取得下中のcurrentIndex番目（mainに表示されている画像）の画像からcurrentクラスを外す
        //この時、currentIndexにはクリックした対象のインデックス番号が入っていないといけない
        //その為、currentIndexにindexを代入する
        li.addEventListener('click', () => {
            mainImage.src = image;
            const thumbnailsLi = document.querySelectorAll('.thumbnails > li');
            thumbnailsLi[currentIndex].classList.remove('current');
            currentIndex = index;
            thumbnailsLi[currentIndex].classList.add('current');
        });

        li.appendChild(img);
        const thumbnails = document.querySelector('.thumbnails');
        thumbnails.appendChild(li);
    });

    //addEventListenerの第二引数で無名関数を渡している
    //これはaddEventListenerには自分で定義した関数を渡しますので、自分で実行する関数を作っているということになる
    //click()を実行するとaddEventListenerの無名関数（アロー関数）が実行される
    //複数ある場合は上から順に実行されるみたい（クリックイベントの中だった場合は自分以外）
    const next = document.getElementById('next');
    next.addEventListener('click', () => {
        let target = currentIndex + 1;
        if (target === images.length) {
            target = 0;
        }

        document.querySelectorAll('.thumbnails > li')[target].click();
    });

    const prev = document.getElementById('prev');
    prev.addEventListener('click', () => {
        let target = currentIndex - 1;
        if (target < 0) {
            target = images.length - 1;
        }

        document.querySelectorAll('.thumbnails > li')[target].click();
    });

    let timeoutId;

    function playSlideshow(){
        timeoutId = setTimeout(() => {
            next.click();
            // 下記の省略がnext.click();
            //下記の処理はsetTimeoutの中に書くことでplayボタンを押してから1秒後ごとになる
            //setTimeoutの外に書くとplayボタンを押してすぐ一回目が実行されて、二回目以降から1秒ずつになる
            // let target = currentIndex + 1;
            // if (target === images.length) {
            //     target = 0;
            // }

            // document.querySelectorAll('.thumbnails > li')[target].click();
            playSlideshow();
        },1000);
    }

    let isPlaying = false;

    const play = document.getElementById('play');
    play.addEventListener('click', () => {
        if (isPlaying === false) {
            playSlideshow();
            play.textContent = 'Pause';
        } else {
            clearTimeout(timeoutId);
            play.textContent = 'Play';
        }
        isPlaying = !isPlaying;
    });

    //clearTimeout()でsetTimeout()を止めたい場合はsetTimeout()の返り値が欲しいので
    //let timeoutIdをあらかじめ変数として宣言しといて、setTimeoutを代入してあげる
    //代入されたtimeoutIdは引数として渡す
    //clearTimeout(timeoutId)

}





// ※querySelctorとgetElemetsByClassNameの挙動の差
//→getElementByIdはいわずもがなIDをもとに取得する（idは1ページに1つしか定義できませんからね。）
//なのでclassを取得する際を見比べる


// <div id="title" class="title">緋色の研究</div>
// <div class="title">恐怖の谷</div>

// const title = document.getElementsByClassName('title');
// console.log(title);
// 結果
// "[object HTMLCollection]"

// titleのクラスを持つ2つのHTMLが出力されると思いきや、
// まさかの[object HTMLCollection]。

// そうなんです。
// getElementsByClassNameはそのままでは正しく出力できません。

// すべてを出力するためには以下のようにfor文で回して出力します。

// const title = document.getElementsByClassName('title');
// for ( let i = 0; i < title.length; i ++ ){
// 	console.log(title[i]);
// }
// // 結果
// "<div id='title' class='title'>緋色の研究</div>"
// "<div class='title'>恐怖の谷</div>"




// querySelector
// querySelectorは、クラスでもIDでも、要素そのものでも指定することができます。
// 結構万能。

// IDはgetElementById同様1つしか出力されない（というか、1つしかもともとIDは定義できない）ので、
// 複数のクラスを定義した場合を見てみましょう。

// ちなみにquerySelectorは先程言ったように、クラスもIDも指定できるので、
// 引数の指定は('title')ではなく、クラスの場合は('.title')、IDの場合は('#title')としましょう。

// <div id="title" class="title">緋色の研究</div>
// <div class="title">恐怖の谷</div>

// const title = document.querySelector('.title');
// console.log(title);
// // 結果
// "<div id='title' class='title'>緋色の研究</div>"

// そうです。
// querySelectorは1つ目の要素しか取得しません。
// また、getElementsByClassNameのようにfor文で回すこともできません。
// IDもクラスも指定できて便利なquerySelectorですが、
// いいことばかりではないのです。

// ちなみに、もしすべての要素を取得したいのなら、
// querySelectorAllを使いましょう。


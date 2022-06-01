'use strict';
{
    //スライドショー
    //setTimeoutで1秒後に実施する
    //最初に表示されているのはcurrentクラスが付いている0番目の画像を非表示にしてcurrentIndexに1足してcurrentクラスを1番目の画像に付けて表示を入れ替える
    //これを上限3まで行ったら0に戻る再起的な関数を用いて処理をする

    function play(){
        setTimeout(() => {
            images[currentIndex].classList.remove('current');
            currentIndex++;
            //imagesの枚数分のインデックス番号まで到達したら初期化する
            if (currentIndex > images.length - 1) {
                currentIndex = 0;
            }    
            images[currentIndex].classList.add('current');
            play();
        },5000);
    }

    const images = document.querySelectorAll('.hero img');//3枚の画像が配列で取得している
    let currentIndex = 0;//表示している画像をインデックス番号で管理する為の変数

    play();
}


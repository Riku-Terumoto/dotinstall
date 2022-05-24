'use strict'

{    //intersection Observer API
    //交差監視API
    //日本語では交差監視 API とよばれていて、ある要素を監視して、
    //その要素がスクロールして特定の領域に入ってきたときにどれだけ
    //その領域と交差したかを調べることができるという仕組みです。
    //なお、ここで監視する要素のことを target 、そして target 
    //が交差していくこの領域のことを root 、そして target がどのくらい
    //root と交差したかの割合を Intersection Ratio とよびます。




    //監視対象を取得
    //IntersectionObserverのインスタンスを書いて定数に代入
    //監視対象を監視する為にobserveメソッドの引数に入れる
    //監視できているかコンソールで確認したいのでインスタンスの引数にcallback関数を入れ
    //その上にcallback関数を実際に書く
    //挙動としてはリロードしてから一回'fired!'が出る、次に監視対象が0%交差した時に
    //2回目が出る
    //   const target = document.querySelector('img');

    //   function callback(){
    //       console.log('fired!');
    //   }

    //   const observer = new IntersectionObserver(callback);

    //   observer.observe(target);


    //thresholdオプション
    //任意の値で監視ができるオブジェクトで記載
    //   const target = document.querySelector('img');

    //インスタンス化した際のtargetの情報を引数にentriesを記載することで受け取れる
    //boundingClientRect: DOMRectReadOnly {x: 8, y: 658.875, width: 200, height: 200, top: 658.875, …}
    //intersectionRatio: 0　⇨　現在の交差率
    
    //intersectionRect: DOMRectReadOnly {x: 0, y: 0, width: 0, height: 0, top: 0, …}
    
    //isIntersecting: false　⇨ 交差しているかの真偽値
    
    //isVisible: false
    
    //rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 981, height: 648, top: 0, …}
    
    //target: img　⇨targetの要素を表している
    
    //time: 35.79999999888241
    //   function callback(entries){
    //       console.log(entries[0]);

        //targetが交差していなかったら処理を返して終了
        //   if (!entries[0].isIntersecting) {
        //       return;
        //   }
        //交差してたらappearクラスをつける
        //   entries[0].target.classList.add('appear');

        //交差しているかの判定isIntersectingオプション
        //   if (entries[0].isIntersecting) {
        //       entries[0].target.classList.add('appear');
        //   } else {
        //       entries[0].target.classList.remove('appear');
        //   }
    //   }
      //thresholdの他にroot,rootMarginというオプションもある
    //   const options = {
    //       threshold:0.2,
    //   };


    //   const observer = new IntersectionObserver(callback,options);

    //   observer.observe(target);

    //監視対象が複数の場合はAllで取得
    //   const targets = document.querySelectorAll('img');


    //   function callback(entries, obs){
        //監視対象が複数の場合は[]での指定はいらない
        // console.log(entries);
        //監視対象を全て指定したいのでforEachで回す
        // entries.forEach(entry => {
        //     if (!entry.isIntersecting) {
        //         return;
        //     }
        //     entry.target.classList.add('appear');
            //一回targetを出現させたら監視を止めて負荷を減らす↓
    //         obs.unobserve(entry.target);
    //     });
    // }

    // const options = {
    //     threshold: 0.2,
    // };


    // const observer = new IntersectionObserver(callback,options);
    //複数の監視対象を設定する為にforEachで回す
    // targets.forEach(target => {
    //     observer.observe(target);
    // });


      
}
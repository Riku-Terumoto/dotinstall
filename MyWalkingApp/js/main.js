'use strict';

{
    // Intersection Observer API
    // entriesは全てのtargetの情報が引数で渡される
    // obsはobserver自身を第二引数を渡せる
    function inViewCallback(entries,obs){
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('appear');
            obs.unobserve(entry.target);
        });
    }

    const inViewOptions = {
        threshold:0.7,
    }

    const inViewObserver = new IntersectionObserver(inViewCallback, inViewOptions);

    const targets = document.querySelectorAll('.animate'); 
    targets.forEach(target => {
        inViewObserver.observe(target);
    });

    //entriesは配列で渡させるのでforEachで処理する
    function onScrollCallback(entries){
        entries.forEach(entry => {
            //最初からtargetは交差しているから交差していない場合はheroクラスに突入した場合なので、scrolledクラスをつける対象となる。
            if (!entry.isIntersecting) {
                header.classList.add('scrolled');
                iconTarget.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
                iconTarget.classList.remove('scrolled');
            }
        });
    }

    //scrolledクラスはheaderにつけるので関数の外に書く
    const header = document.querySelector('header');
    const iconTarget = document.getElementById('to_top');
    const onScrollObserver = new IntersectionObserver(onScrollCallback);

    const nullTarget = document.getElementById('target'); 
    onScrollObserver.observe(nullTarget);
    

    //スクロールして出てくるこちらのアイコンですが、クリックするとこのようにトップに戻るのですが URL の末尾にパウンド記号が付きます。
    // この状態でブラウザの戻るボタンを押した場合、 URL からパウンド記号が消えて同じページで先ほどの位置まで戻ると言う挙動になります。
    // 要件によってはこれで良い場合もありますが、戻るボタンを押したときにこのページの前にいたページに戻ることが期待される場合もあるので、今回は上に戻ったときに URL 末尾にパウンド記号がつかないようにしてみましょう。

    // クリックイベントで起こる挙動をpreventDefaultで無効化
    iconTarget.addEventListener('click', e =>{
        e.preventDefault();
        //Window.scrollTo() は文書内の特定の組み合わせの座標までスクロールします。
        // options の使用例:
        // window.scrollTo({
        // top: 100,
        // left: 100,
        // behavior: 'smooth'
        // });
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        });
    });

}
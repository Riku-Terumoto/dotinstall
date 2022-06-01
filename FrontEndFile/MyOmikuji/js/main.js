'use strict';

// 変数や定数の有効範囲を限定したいので、全体を {} （ブロック）で囲んで置いている
//おみくじみたいな何が出るか分からないものはMath.random()使用する
//指定なしだと0 以上 1 未満でランダムな数値を生成してくれる。（1は未満なので含まない）
//指定する場合はMath.random()に任意の数を掛けてあげる。
//例）Math.random() * 3
//Math.floor()は小数点を切り捨てる
{
    const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
        //配列でおみくじを作る場合
        const results = ['大吉','中吉','凶','末吉'];
        // const results = ['大吉','大吉','大吉','末吉'];
        //上記だと確立は大吉80%,末吉20%
        const n = Math.floor(Math.random() * results.length);
        btn.textContent = results[n];

        //確立でおみくじを作る場合
        // const n = Math.random();
        // if (n < 0.05) {
        //     btn.textContent = '大吉';//5%
        // } else if (n < 0.2) {
        //     btn.textContent = '中吉';//15%
        // } else{
        //     btn.textContent = '末吉';//80%
        // }

        //switch文でのおみくじを作る場合
        // switch (n) {
        //     case 0:
        //         btn.textContent = '大吉';
        //         break;
        //     case 1:
        //         btn.textContent = '中吉';
        //         break;
        //     case 2:
        //         btn.textContent = '凶';
        //         break;
        //     default:
        //         break;
        // }



    });






}
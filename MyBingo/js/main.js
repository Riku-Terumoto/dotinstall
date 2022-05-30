'use strict';
//ビンゴシートは列ごとに数の範囲を指定してそこからランダムに表示する仕様
//B I N G Oという5つの列にそれぞれ範囲を指定する
//B 1~15,I 16~30,N 31~45,G 46~60,O 61~75
//それぞれに配列を用意して、その配列からランダムに数字を取り出す
//取り出す値が重複しないように取り出した値は配列から削除したい
//そのためにはarr.splice()を使用する
//インデックス番号と数を指定して取り出す
//arr.splice(9,1);インデック番号9を一つ取り出す
//splice() の返り値は複数になることもあるので、要素が 1 つでも配列になってしまう
//spliceの後に[0]を記述することで最初の要素が取り出されて一つにまとまる



{
    function createColumn(col) {
        const source = [];
        for (let i = 0; i < 15; i++) {
            source[i] = i + 1 + 15 * col;
        }
        const column = [];
        for (let i = 0; i < 5; i++) {
            column[i] = source.splice(Math.floor(Math.random() * source.length),1)[0];
        }
        return column;
    }

    function createColumns(){
        const columns = [];
        for (let i = 0; i < 5; i++) {
            columns[i] = createColumn(i);
        }
        columns[2][2] = 'FREE';
        return columns;
    }

    // function createBingo(columns){
    //     const bingo = [];
    //     for (let row = 0; row < 5; row++) {
    //         bingo[row] = [];
    //         for (let col = 0; col < 5; col++) {
    //             bingo[row][col] = columns[col][row];
    //         }
    //     }
    //     console.table(bingo);
    //     return bingo;
    // }
    //renderBingoでも同じようにループしているので下でbingoを反転させる為、createBingo削除！！！！！！！

    function renderBingo(columns){
        for (let row = 0; row < 5; row++) {        
            const tr = document.createElement('tr');
            for (let col = 0; col < 5; col++) {
                const td = document.createElement('td');
                td.textContent = columns[col][row];
                tr.appendChild(td);
            } 
            const tbody = document.querySelector('tbody');
            tbody.appendChild(tr);
        }
    }

    const columns = createColumns();
    renderBingo(columns);
}










// ⭐️以下は上記処理の経緯↓

// function createColumn(col) {

//     // const source = [1,2,3,4,5,6,7,8,9,10,12,13,14,15];
//     // ループでもっと短く書く
//     const source = [];
//     for (let i = 0; i < 15; i++) {
//         //1~15
//         // source[i] = i + 1;
//         // source[i] = i + 1 + 15 * 0;
//         //16~30
//         // source[i] = i + 1 + 15;
//         // source[i] = i + 1 + 15 * 1;
//         //31~45
//         // source[i] = i + 1 + 15 + 15;
//         // source[i] = i + 1 + 15 * 2;
//         //46~60
//         // source[i] = i + 1 + 15 + 15 + 15;
//         // source[i] = i + 1 + 15 * 3;
//         //61~75
//         // source[i] = i + 1 + 15 + 15 + 15 + 15;
//         // source[i] = i + 1 + 15 * 4;
//         //上記、結果より*の部分を変数にすれば良い
//         source[i] = i + 1 + 15 * col;
//     }
//     const column = [];
//     // b[0] = source.splice(Math.floor(Math.random() * source.length),1)[0]; 
//     // b[1] = source.splice(Math.floor(Math.random() * source.length),1)[0];
//     // b[2] = source.splice(Math.floor(Math.random() * source.length),1)[0];
//     // b[3] = source.splice(Math.floor(Math.random() * source.length),1)[0];
//     // b[4] = source.splice(Math.floor(Math.random() * source.length),1)[0];
//     // ループでもっと短く書く
//     for (let i = 0; i < 5; i++) {
//         column[i] = source.splice(Math.floor(Math.random() * source.length),1)[0];
//     }
//     return column;
// }

// //PHPの多次元配列みたいにしている
// const columns = [];
// columns[0] = createColumn(0);
// columns[1] = createColumn(1);
// columns[2] = createColumn(2);
// columns[3] = createColumn(3);
// columns[4] = createColumn(4);
// columns[2][2] = 'FREE';
// //多次元配列のようなデータ構造を見るときはconsole.tabelで見ると見やすい
// // console.table(columns);

// //console.table(columns);でみると行と列が想定とは逆になっているので直していく
// //再度配列を作って行の数だけループを回す
// //それぞれの行は配列になるのでbingo[row]を配列で宣言する
// //その上で、列分も配列を宣言して同じようにループを回す
// //columnsと同じ配列構造になったbingo[row][col]に反転させたcolumns[col][row]を代入する
// //2重ループは外側のループ一回につき、内側は全て回りきる。
// //以下だと、rowが0のループでcolが0~4まで回る
// //これが4回続く
// //row[0]⇨col[0,1,2,3,4]
// //row[1]⇨col[0,1,2,3,4]
// //row[2]⇨col[0,1,2,3,4]
// //row[3]⇨col[0,1,2,3,4]
// //row[4]⇨col[0,1,2,3,4]
// //rowが列、行がcolになっているがこれだとcolumnsと同じになるからそれを反転する
// const bingo = [];
// for (let row = 0; row < 5; row++) {
//     bingo[row] = [];
//     for (let col = 0; col < 5; col++) {
//         bingo[row][col] = columns[col][row];
//     }
// }
// console.table(bingo);


// for (let row = 0; row < 5; row++) {        
//     //ブラウザにbingoを表示する
//     const tr = document.createElement('tr');
//     for (let col = 0; col < 5; col++) {
//         const td = document.createElement('td');
//         //表示するのはbingoの0番目になる。
//         //0番目のランダム値を全て、キーで取り出すため今回回したcol(0~4)も記述
//         //bingo[row][col]となっているが入っている内容はbingo[col][row]になる
//         td.textContent = bingo[row][col];
//         //表示するものが作れたらtrに追加する
//         tr.appendChild(td);
//     } 
//     //trをtbodyに追加する
//     const tbody = document.querySelector('tbody');
//     tbody.appendChild(tr);
// }







// ⭐️以下は多次元配列の反転処理で見直した時に分からなくなったら確認する。



//          [0]   [1]   [2]   [3]   [4]
// [0]  [                                   ]
// [1]  [                                   ]
// [2]  [                                   ]
// [3]  [                                   ]
// [4]  [                                   ]
// まず、左側を外側のループ、上側を外側のループ内で回っている内側のループと整理して、上記のような構造を元に、これを基本としてループを回していくと、理解ができました。

// まず、bingo[row][col] = row;で考えると、ループを回していくと
//↓0番目のrowのループ

// bingo[0][0] = 0;
// bingo[0][1] = 0;
// bingo[0][2] = 0;
// bingo[0][3] = 0;
// bingo[0][4] = 0;
// となり、これを上の表に当てはめていくと

//          [0]   [1]   [2]   [3]   [4]
// [0]  [   0     0     0     0     0   ]
// [1]  [                                    ]
// [2]  [                                    ]
// [3]  [                                    ]
// [4]  [                                    ]
// となり、外側のループと内側のループを続けていくと、

//          [0]   [1]   [2]   [3]   [4]
// [0]  [   0     0     0     0     0   ]
// [1]  [   1     1     1     1     1   ]
// [2]  [   2     2     2     2     2   ]
// [3]  [   3     3     3     3     3   ]
// [4]  [   4     4     4     4     4   ]
// となりました。

// 一方、bingo[row][col] = col;で考えた場合、

//          [0]   [1]   [2]   [3]   [4]
// [0]  [                                   ]
// [1]  [                                   ]
// [2]  [                                   ]
// [3]  [                                   ]
// [4]  [                                   ]
// やはり、上記の基本の構造を元に、ループを回していくと
//↓0番目のcolのループ

// bingo[0][0] = 0;
// bingo[0][1] = 1;
// bingo[0][2] = 2;
// bingo[0][3] = 3;
// bingo[0][4] = 4;
// となり、上記の表に当てはめると

//          [0]   [1]   [2]   [3]   [4]
// [0]  [   0     1     2     3     4   ]
// [1]  [                                    ]
// [2]  [                                    ]
// [3]  [                                    ]
// [4]  [                                    ]
// となり、外側の2周目以降のループを続けていくと

//          [0]   [1]   [2]   [3]   [4]
// [0]  [   0     1     2     3     4   ]
// [1]  [   0     1     2     3     4   ]
// [2]  [   0     1     2     3     4   ]
// [3]  [   0     1     2     3     4   ]
// [4]  [   0     1     2     3     4   ]
// ということで理解ができました。
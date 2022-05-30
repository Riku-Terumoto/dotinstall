'use strict';
// コンソールこちらでクリアしてもいいのですが、 Chrome だとコードからクリアできるので、カレンダー本体のコードとは関係ないので、ブロックの外で console.clear() としておく
// 今回の例ですとブラウザの更新時にコンソールはクリアされているのでソース上でクリアしなくても問題ないですね。
// ソースからもクリアできるという例のために入れているのかと思います。

// 例えば、ボタンを押したときにそれまでにconsole.log()で表示したものを削除したいといったときなどにも使えるテクニックなので覚えておくと便利かと思います。
console.clear();

{
    //年と日付を現在で取得
    const today = new Date();
    let year = today.getFullYear();//現在の年を取得
    let month = today.getMonth();//現在の月を取得

    //最初の日付固定時点
    // let year = 2020;
    // let month = 4;//5月 ※jsでの月は0スタートな為 

    //前月分の日付取得
    //26,27,28,29,30,1,2
    // これは 2020 年 5 月の第 1 週ですが、今回欲しいのは 26 から 30 のここまでの数値
    // これを取得する方法ですが、前月の末日の日付とそこから何日分さかのぼるかの個数があれば良い
    //末日の30をb、30から26をnとする。まずbを取得するにはnew Date(year, monnth, 0).getDate();
    //今月の1日が週の何日目に当たるかを調べる(曜日を表す数値で調べる、0が日、1が月)new Date(year, month, 1).getDay();
    //調べたら数値はそのまま26~30までの個数になるからnとする
    function getCalendarHead(){
        const dates = [];
        const d = new Date(year, month, 0).getDate();//30
        const n = new Date(year, month, 1).getDay();//5
        //dから1日ずつ遡りつつn日分の日付がほしいのでループを回す(5回す)
        //ループ一回につき配列の先頭に30から遡った数値を入れる[...29,30]
        //unshift() メソッドは、配列の最初に 1 つ以上の要素を追加し、新しい配列の長さを返します。
        //datesはオブジェクトにしたから今回も同じように
        //5回している
        for (let i = 0; i < n; i++) {
            dates.unshift({
                date:d - i,
                isToday:false,//当日じゃ無いから
                isDisabled:true,//前月分だから
            });
        }
        // console.log(dates);
        return dates;
    }

    function getCalendarBody(){
        const dates = [];//jsではdate:日付,day:曜日
        // datesに1 日から末日までの日付を入れればいいが、末日は翌月 1 日の 1 日前という意味で、翌月の 0 日目を指定することで、今月の末日を取得することができる
        const lastDate = new Date(year, month + 1, 0).getDate();

        //日付は1から始まる為、iの初期化は1
        //lastDate数の数ちょうど回したいから未満(<)ではなく、以下にする(<=)
        //31回している
        for (let i = 1; i <= lastDate; i++) {
            // dates.push(i);
            //push(i)だと今日の日付がわからないので、オブジェクトの配列でプロパティを設定していく
            dates.push({
                //真偽値を保持するときはis...といった名前をつけることが多い
                date: i,//日付全部
                isToday: false,//todayクラスをつけるかどうか真偽値で保持、とりあえずfalseにしておく
                isDisabled: false,//disabledクラスも翌月と前月用なので、真偽値で保持、datesは今月分の日付なので当然false
            });
        }
        // console.log(dates);
        
        //今日の日付が他の月でも太文字になっているので年と月が現在になっているか確認してそうだった場合に今日の日付を太文字にする
        if (year === today.getFullYear() && month === today.getMonth()) {
            //今日の日付を取得して、その数字から-1をする（インデックス番号調整）
            //isTodayプロパティをtureに変更する
            dates[today.getDate() - 1].isToday = true;
        }


        return dates;
    }


        //翌月分の日付 1 日から 6 日までの配列を用意する
    //ただ、これは末日が日曜にだった場合なので、月曜日だったら1引いて、火曜日だったら2を引く必要がある
    //※末日が日曜だった場合は1日~6日は月曜日~土曜日(ループは6回=7)
    //※末日が月曜日だった場合は表示するのは1日~5日(ループは5回=6)
    //上記から徐々にデクリメントをする
    //以下のカレンダー
    // 日　月　火　水　木　金　土
    // 26	27  28  29  30  1   2
    // 3    4   5   6   7   8   9
    // 10	11	12	13	14  15  16
    // 17	18	19	20	21	22	23
    // 24	25	26	27	28	29	30
    // 31	1	2	3	4	5   6
    //汎用的にするには末日が週の何日目かを求めて引いてあげる
    //6回している
    function getCalendarTail(){
        const dates = [];
        const lastDay = new Date(year, month + 1, 0).getDay();
        for (let i = 1; i < 7 - lastDay; i++) {      
            dates.push({
                date:i,
                isToday:false,//今日の日付じゃ無いから
                isDisabled:true,//今月では無いから
            });      
        }
        // console.log(dates);
        return dates;
    }

    function clearCalendar(){
        const tbody = document.querySelector('tbody');
        //もしtbodyの中に子要素が入っていたら消す
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }

    function renderTitle(){
        //タイトルは可変的に表示（yearとmonthはクリックイベントで変化する）
        //month + 1はjsのカレンダーはインデックス番号で指定されているから調整の為
        //月が一桁の場合は0を足す padStart()を使う
        // padStart() メソッドは、結果の文字列が指定した長さになるように、現在の文字列を他の文字列で (必要に応じて繰り返して) 延長します。延長は、現在の文字列の先頭から適用されます。

        // 以下であれば2桁で表示してね、2桁に満たなかったら0の文字列で埋めてねとなる
        // padStart(2,'0')
        //patStartを使うためにはまず対象を文字列に変更しなければならない
        // String()メソッド
        const title = document.getElementById('title');
        title.textContent = `${year}/${String(month + 1).padStart(2,'0')}`;
    }

    function renderWeeks(){
    //多次元配列の形でdatesの配列の中に配列が入っているが、一つのカレンダーとして展開したいのでスプレッド構文で展開する
    //HTMLに描画するときに7日分ごとに分けて表示する
    //週の配列を作り何週分あるかは7で割る
        const dates = [
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarTail(),
        ];
        const weeks = [];
        const weeksCount = dates.length / 7;//6
        //splice()で一回のループで7日分取得してweeksに入れる
        //7回している
        for (let i = 0; i < weeksCount; i++) {
            weeks.push(dates.splice(0, 7));
        }
        // console.log(weeks);
        //HTMLに描画
        //週ごとに処理をしたい=weeks(7日分)を全て回す=forEach
        //forEachをforで6回して描画
        //forEach() メソッドは、与えられた関数を、配列の各要素に対して一度ずつ実行します。

        //外側は外側は週として6回す
        //外側一回のループに対して内側は6回す
        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td');
                //date変数の中のdateプロパティをtextContentに入れている
                td.textContent = date.date;
                if (date.isToday) {
                    td.classList.add('today');
                }

                if (date.isDisabled) {
                    td.classList.add('disabled');
                }
                tr.appendChild(td);
            });
            const tbody = document.querySelector('tbody');
            tbody.appendChild(tr);
        });
    }

    //全ての処理の統合＆描画
    function createCalendar(){
        clearCalendar();
        renderTitle();
        renderWeeks();
    }

    //prevクリックしたら月をデクリメントしてもし、1月でprevをクリックしたら年をデクリメント、月を12月にしてカレンダー再表示
    const prev = document.getElementById('prev');
    prev.addEventListener('click', () => {
        month--;
        if (month < 0) {
            year--;
            month = 11;
        }
        createCalendar();
    });
    //nextクリックしたら月をインクリメントしてもし、12月でnextをクリックしたら年をインクリメント、月を1月にしてカレンダー再表示
    const next = document.getElementById('next');
    next.addEventListener('click', () => {
        month++;
        if (month > 11) {
            year++;
            month = 0;
        }
        createCalendar();
    });

    const todayClick = document.getElementById('today');
    todayClick.addEventListener('click', () => {
        year = today.getFullYear();
        month = today.getMonth();

        createCalendar();
    });
    
    createCalendar();
}
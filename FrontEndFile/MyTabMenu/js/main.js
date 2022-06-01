'use strict';

{
    const menuItems = document.querySelectorAll('.menu li a');
    const contents = document.querySelectorAll('.content');

    menuItems.forEach(clickedItem => {
        clickedItem.addEventListener('click', e => {
            //イベントオブジェクトを渡してaタグのページ遷移を無効化する
            e.preventDefault();

            menuItems.forEach(item => {
                item.classList.remove('active');
            });
            clickedItem.classList.add('active');

            contents.forEach(content => {
                content.classList.remove('active');
            });
            const clickedData = document.getElementById(clickedItem.dataset.id);
            clickedData.classList.add('active');
        });
    });
}
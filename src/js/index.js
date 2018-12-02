$.ajax({
    url: "/api/list",
    dataType: "json",
    success: function(res) {
        console.log(res);

        if (res.code === 1) {
            render(res.data);
        }
    }
})

function render(data) {
    var str = '';
    data.list.forEach((item) => {
        str += ` <div class="swiper-slide">`
        str += renderList(item);
        str += `</div>`
    })
    $('.swiper-wrapper').html(str);
    new Swiper('.swiper-container');
}

function renderList(data) {

    return data.map((item) => {
        return `<dl>
                    <dt><img src="${item.img}" alt=""></dt>
                    <dd>${item.title}</dd>
                 </dl>`
    }).join('');

}
$post (`/user/ban`,{userID: $('#userID').val()}, function (data){},).fail(function (data){})
$('#btn-comment').on('click',function(event){
    $.post(`/api/course_details/${$('#courseID').val()}/comment`, 
    {content: $('#comment-content').val()}, 
    function(data){
        const comment= Handlebars.compile(document.getElementById('element-comment').innerHTML)
        const commentHTML=comment(data)
        $('#comment-content').val("")
        $('#comment-container').prepend(commentHTML) 
    }).fail(function(data){
        window.location.href=`/login?redirect=${window.location.href}`
    })
})


$('#btn-purchase').on('click', function(e){
    $.post(`/courses/class/payment/${$('#classID').val()}`,{},function(data){
        window.location.href='/courses'
    }).fail(function(data){
        alert("You registraterd this class before")
        window.location.href='/courses'
    })
})

function paginate(page){
    var currentURL=new URL(window.location.href)
    currentURL.searchParams.set('p',page)
    window.location.href=currentURL
}

$('#btn-filter').on('click', function(e){
    var currentURL=new URL(window.location.href)
    currentURL.searchParams.set('order',$('#order').val())
    currentURL.searchParams.set('orderBy',$('#orderBy').val())
    currentURL.searchParams.set('minPrice',$('#minPrice').val())
    currentURL.searchParams.set('maxPrice',$('#maxPrice').val())

    window.location.href=currentURL
})
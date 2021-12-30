
$('#btn-comment').on('click',function(event){
    $.post(`/api/course_details/${$('#courseID').val()}/comment`, 
    {content: $('#comment-content').val()}, 
    function(data){
        const comment= Handlebars.compile(document.getElementById('element-comment').innerHTML)
        const commentHTML=comment(data)
        console.log(data)
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
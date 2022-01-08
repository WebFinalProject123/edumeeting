
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



function check () {
    if (document.getElementById('password').value ==
      document.getElementById('confirm_password').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Password is matching';
      document.getElementById('submit').disabled = false;
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'Password is not matching';
      document.getElementById('submit').disabled = true;
    }
  }

  $('#btn-filter').on('click', function(e){
    var currentURL=new URL(window.location.href)
    const order=$('#order').val()
    const orderBy=$('#orderBy').val()
    const minPrice=$('#minPrice').val()
    const maxPrice=$('#maxPrice').val()

    if(order!="Order")
        currentURL.searchParams.set('order',order)
    if(orderBy!="Order by")
        currentURL.searchParams.set('orderBy',orderBy)
    if(minPrice!="")
        currentURL.searchParams.set('minPrice',minPrice)
    if(maxPrice!="")
        currentURL.searchParams.set('maxPrice',maxPrice)

    if (!((order!="Order" && orderBy=="Order by") || (order=="Order" && orderBy!="Order by") || (minPrice==""&&maxPrice!="") || (minPrice!=""&&maxPrice=="")))
    window.location.href=currentURL
})
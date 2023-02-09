const close = document.querySelector('#close')
close.addEventListener("click", function(){document.location.href = "index.html";})

const show = document.querySelector('#openchangebar')
show.addEventListener("click",function(){
	$('.check_box').toggle();
})
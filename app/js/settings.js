$('#adduse_time').hide();
$('#adduse_unit').hide();
const close = document.querySelector('#close')
close.addEventListener("click", function(){document.location.href = "index.html";})
$("#div_add_time").click(function() {
    $('#adduse_time').show();
})

$("#cancle").click(function() {
    $('#adduse_time').hide();

})
$("#save").click(function() {
    $('#adduse_time').hide();
})
$("#div_add_unit").click(function() {
    $('#adduse_unit').show();
})

$("#cancle2").click(function() {
    $('#adduse_unit').hide();

})
$("#save2").click(function() {
    $('#adduse_unit').hide();
})
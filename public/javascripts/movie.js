$.ajax({
url:'/readjson',
datatype:'json',
type:'get',
cache:false,
success:function(data){
var jsonData = $.parseJSON(data);
console.log(jsonData);
var count=0;
if(count==0){
  nextImg();
}
$("#next").click(function() {
  if(count < jsonData.length){
    count++;
      nextImg();
    }
});
$("#prev").click(function() {
  if(count>0){
    count--;
      nextImg();
    }
});
function nextImg()
{
  $('#img').attr("src", jsonData[count].File_name);
  $('#title').html('<p> Title: ' + jsonData[count].Title + '</p>');
  $('#year').html('<p> Year: ' + jsonData[count].Year + '</p>');
  $('#actors').html('<p> Actors: ' + jsonData[count].Actors + '</p>');
  $('#director').html('<p> Director: ' + jsonData[count].Director + '</p>');
  $('#desc').html('<p> Description: ' + jsonData[count].Plot + '</p>');
  $('#date').html('<p> Date Released: ' + jsonData[count].Released + '</p>');

  $("#frmCadastre").click(function(){
      $("#title1").val(data[count].Title);
      $('#img1').val(data[count].Poster);
      $('#year1').val(data[count].Year);
      $('#actors1').val(data[count].Actors);
      $('#director1').val(data[count].Director);
      $('#desc1').val(data[count].Plot);
      $('#date1').val(data[count].Released);
    });
}
}
});

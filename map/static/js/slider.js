

var cache = [];
var currFrom = 0;


function showPictures(){
  var element = document.getElementById('pictures');
  console.log(element.style.display)
  if(element.style.display == null 
    || element.style.display === 'none'){
      element.style.display = "inline";
      console.log("show!" + element.style.display)
  }else{
      element.style.display = 'none';
      console.log("not show!" )
  }
  render();
    console.log(element.style.display)
}


function inc(){
  if(cache){
    if(cache.length > currFrom + 5){
      currFrom = currFrom + 5;
    }else{
      currFrom = cache.length - 5;
    }
  }else{
    currFrom = 0;
  }
  render();
}

function dec(){
    if(currFrom -5 >=0){
      currFrom = currFrom-5;
    }else{
      currFrom = 0;
    }
    render();
}


function render(){
  var ul = document.getElementById("list");
  ul.innerHTML = "";
  for(var i = 0; i < 5 ; i ++){
    var marker = cache[currFrom + i];
    var picture = marker.assetInfo.img_url;
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = '<a href="'+ marker.assetInfo.lister_url+'"> <img src="'+ picture +'" /> </a>';
  }
}


function addSliderElement(marker){
  if(contains(cache,marker)){
    return;
  }
  var picture = marker.assetInfo.img_url;
  if(picture === "http://resources.nestimg.com/nestoria/img/cs4.2_v1.png"){
    return;
  }
  cache.push(marker);
}


function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}






var cache = [];
var link_marker = {}; 
var currFrom = 0;
var pointer = 0;
var appendTrack = [];

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
  pointer = pointer + 1;
  if(pointer > 4){
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
}

function dec(){
  pointer = pointer -1;
  if(pointer < -4){
    if(currFrom -5 >=0){
      currFrom = currFrom-5;
    }else{
      currFrom = 0;
    }
    render();
  }
}


function render(){
  var ul = document.getElementById("list");
  var childs = ul.children;
  pointer = 0;
  for(var i = 0; i < childs.length ; i ++){

    var marker = cache[currFrom + i];
    var picture = marker.assetInfo.img_url;
    var urlClick = childs[i].children[0].children[0];
    var img = urlClick.children[0];
    img.src = picture;
    img.title = marker.assetInfo.datasource_name  +'" 1&#013;Price: "'+ marker.assetInfo.price;
    urlClick.href = marker.assetInfo.lister_url;

    /*var element = document.createElement("div");
    var marker = cache[currFrom + i];
    var picture = marker.assetInfo.img_url;
    var start = "";
    if(i == 0){
      start = '<div class="item active"> <div class="col-md-3 col-sm-4 col-xs-12"> '
    }else{
      start = '<div class="item"> <div class="col-md-3 col-sm-4 col-xs-12"> '
    }

    var end = ' class="img-responsive"></a></div></div>'
    var image = '<a href="'+ marker.assetInfo.lister_url+'"> <img data-toggle="tooltip" title=Name:'+ marker.assetInfo.datasource_name  +" 1&#013;Price: "+ marker.assetInfo.price + ' src="'+ picture +'" style="width:128px;height:128px;" onmouseover="hoverPic(this)';
    element.innerHTML = start + image + end;

    ul.appendChild(element);*/
  }
  boundStuff();
}

  

 function boundStuff(){
   console.log("hehe!")
   appendTrack.forEach(function(t){
      t.remove();
   });
   jQuery('.carousel[data-type="multi"] .item').each(function(){
      var next = jQuery(this).next();

      if (!next.length) {
        next = jQuery(this).siblings(':first');
      }
      appendTrack.push(next.children(':first-child').clone().appendTo(jQuery(this)));
      
      for (var i=0;i<2;i++) {
        next=next.next();
        if (!next.length) {
          next = jQuery(this).siblings(':first');
        }
        appendTrack.push(next.children(':first-child').clone().appendTo($(this)));
      }
    });

  }

function hoverPic(pic){
  if(link_marker[pic.src]){
    var marker = link_marker[pic.src];


  } 

}

function addSliderElement(marker){
  if(contains(cache,marker)){
    return;
  }
  var picture = marker.assetInfo.img_url;
  if(picture === "http://resources.nestimg.com/nestoria/img/cs4.2_v1.png" 
      && marker.shouldShow()){
    return;
  }
  link_marker[picture] = marker;
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




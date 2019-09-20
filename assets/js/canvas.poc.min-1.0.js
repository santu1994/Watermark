/*
* CANVAS POC JS
* VERSION: 1.0
*
*/
var canvasObj = new fabric.Canvas(
	'canvas_page01',
	{
	backgroundColor: 'rgb(100,100,200)',
	selectionColor: 'blue',
	selectionLineWidth: 2
	}
); 
canvasObj.on( 'selection:cleared', clearPanel );
canvasObj.on( 'object:selected', editObject );
$(document).ready(function(){
	$(document).on('click', '.tab-content-close', function(e){
		alert("This function does not work in demo version!!!");
	});
	$(document).on('click', '.canvas-items', function(e){
		//console.log($(this).data('item'));
		var item = $(this).data('item');
		if(item == 'text') {
			add_text('Sample Text');
		}
		if(item == 'shape') {
			add_shape($(this).data('type'));
		}
		if(item == 'bgimg') {
			load_bg_image($(this).find('img').attr('src'));
			//scaleAndPositionImage($(this).find('img').attr('src'));
		}
	});
    $(document).on('keyup', function(e){
		//console.log(e.which)
		if(e.which == 46) {
			deleteObject();
		}
	});	
});
function deleteObject() {
    var getActiveObj =canvasObj.getActiveObject();
    if( getActiveObj ) {
        canvasObj.remove( getActiveObj );
        canvasObj.renderAll();
	}
}
function clearPanel() {
	
}
function editObject() {
	var getActiveObj =canvasObj.getActiveObject();
	console.log(getActiveObj);
    if( getActiveObj && getActiveObj.itemName === 'text' ){
		console.log("text");
	}
}
function add_text(str) { 
	var strObj = new fabric.IText( str ,{
      fontSize:40,
	  fill:'#000',
	  top:150,
	  left:300,
	  itemName:"text"
    });
    canvasObj.add( strObj );  
    canvasObj.renderAll();
}
function add_shape(shape) {
	//console.log(shape);
	if(shape=='line') {
		var lineObj = new fabric.Line( 
			[50, 300, 500, 300], 
			{
				left: 200,
				top: 300,
				stroke: '#000',
				strokeWidth:2,
				itemName:"line"
			}
		);
		canvasObj.add( lineObj );
	}
	if(shape=='circle') {
		var circleObj = new fabric.Circle(
			{
				radius: 80,
				fill: '#000',
				stroke: '#000',
				strokeWidth: 2,
				originX: 'center', 
				originY: 'center',
				left: 280, 
				top: 200,
				itemName:"circle"
			}
		);
		canvasObj.add( circleObj );
	}
	if(shape=='rect') {
		var rectObj = new fabric.Rect(
			{
				height: 80,
				width: 100,
				left: canvasObj.width/2, 
				top: 200,
				itemName:"rect"
			}
		);
		canvasObj.add( rectObj );
	}
	if(shape=='triangle') {
		var triangleObj = new fabric.Triangle(
			{
				width: 100, 
				height: 80, 
				fill: '#000', 
				left: 100, 
				top: 200,
				itemName:"triangle"
			}
		);
		canvasObj.add( triangleObj );
	}
	canvasObj.renderAll();
}
function setCanvasZoom() {
    var width = canvasOriginalWidth;
    var height = canvasOriginalHeight;
    var tempWidth = width * canvasScale;
    var tempHeight = height * canvasScale;

    canvasObj.setWidth(tempWidth);
    canvasObj.setHeight(tempHeight);
}
function scaleAndPositionImage(bgImage) {
	//setCanvasZoom();
	var canvasWidth = 800;
	var canvasHeight = 1000;
	var canvasAspect = canvasWidth / canvasHeight;
	var imgAspect = bgImage.width / bgImage.height;
	var left, top, scaleFactor;

	if (canvasAspect >= imgAspect) {
		var scaleFactor = canvasWidth / bgImage.width;
		left = 0;
		top = -((bgImage.height * scaleFactor) - canvasHeight) / 2;
	} else {
		var scaleFactor = canvasHeight / bgImage.height;
		top = 0;
		left = -((bgImage.width * scaleFactor) - canvasWidth) / 2;

	}

	canvasObj.setBackgroundImage(bgImage, canvasObj.renderAll.bind(canvasObj), {
		top: top,
		left: left,
		originX: 'left',
		originY: 'top',
		scaleX: scaleFactor,
		scaleY: scaleFactor
	});
	canvasObj.renderAll();

}
function load_bg_image( img_url ) {
    if( img_url )
    {
      var bg_img = new Image();
      bg_img.onload = function()
      {
        canvasObj.setBackgroundImage(bg_img.src, canvasObj.renderAll.bind(canvasObj), {
          scaleX: 1,
		  scaleY: 1,
          left: 0,
          top: 0,
		  originX: 'left',
          originY: 'top'
        });
      };
      bg_img.src = img_url;
    }
}
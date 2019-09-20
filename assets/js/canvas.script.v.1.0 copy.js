/**
 * FILE: CANVAS SCRIPT
 * Description: Dragable image set to canvas.
 * version: 1.0.0
 * Author: SGDEV
 */


// Add image from local
var canvas = new fabric.Canvas('c');
// display/hide text controls
canvas.on('object:selected', function(e) {
   if (e.target.type === 'i-text') {
      $('#textControls').removeClass('hidden');
   }
});
canvas.on('before:selection:cleared', function(e) {
   if (e.target.type === 'i-text') {
        $('#textControls').addClass('hidden');
   }
});
document.getElementById('file').addEventListener("change", function(e) {
   var file = e.target.files[0];
   var reader = new FileReader();
   reader.onload = function(f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function(img) {
         var oImg = img.set({
            left: 0,
            top: 0,
            angle: 0,
            border: '#000',
            stroke: '#F0F0F0', //<-- set this
            strokeWidth: 0 //<-- set this
         }).scale(0.2);
         canvas.add(oImg).renderAll();
         //var a = canvas.setActiveObject(oImg);
         var dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1
         });
      });
   };
   reader.readAsDataURL(file);
});


document.getElementById('uploadfilebtn').addEventListener("change", function(e) {
    $('.fileuploader').addClass('hidden');
    $('.editor').removeClass('hidden');
   var file = e.target.files[0];
   var reader = new FileReader();
   reader.onload = function(f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function(img) {
         // add background image
         canvas.setDimensions({width:img.width, height:img.height});
         canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height
         });
      });
   };
   reader.readAsDataURL(file);
});

// Delete selected object
window.deleteObject = function() {
      var activeGroup = canvas.getActiveGroup();
      if (activeGroup) {
         var activeObjects = activeGroup.getObjects();
         for (let i in activeObjects) {
            canvas.remove(activeObjects[i]);
         }
         canvas.discardActiveGroup();
         canvas.renderAll();
      } else canvas.getActiveObject().remove();
   }
   // Refresh page
function refresh() {
   setTimeout(function() {
      location.reload()
   }, 100);
}
// Add text
function Addtext() {
   canvas.add(new fabric.IText('Tap and Type', {
      left: 50,
      top: 100,
      fontFamily: 'roboto',
      fill: '#000',
      stroke: '#fff',
      strokeWidth: 0,
      fontSize: 30
   }));
}
// Edit Text
document.getElementById('text-color').onchange = function() {
   canvas.getActiveObject().setFill(this.value);
   canvas.renderAll();
};
document.getElementById('text-color').onchange = function() {
   canvas.getActiveObject().setFill(this.value);
   canvas.renderAll();
};
document.getElementById('text-bg-color').onchange = function() {
   canvas.getActiveObject().setBackgroundColor(this.value);
   canvas.renderAll();
};
document.getElementById('text-lines-bg-color').onchange = function() {
   canvas.getActiveObject().setTextBackgroundColor(this.value);
   canvas.renderAll();
};
document.getElementById('text-stroke-color').onchange = function() {
   canvas.getActiveObject().setStroke(this.value);
   canvas.renderAll();
};
document.getElementById('text-stroke-width').onchange = function() {
   canvas.getActiveObject().setStrokeWidth(this.value);
   canvas.renderAll();
};
document.getElementById('font-family').onchange = function() {
   canvas.getActiveObject().setFontFamily(this.value);
   canvas.renderAll();
};
document.getElementById('text-font-size').onchange = function() {
   canvas.getActiveObject().setFontSize(this.value);
   canvas.renderAll();
};
document.getElementById('text-line-height').onchange = function() {
   canvas.getActiveObject().setLineHeight(this.value);
   canvas.renderAll();
};
document.getElementById('text-align').onchange = function() {
   canvas.getActiveObject().setTextAlign(this.value);
   canvas.renderAll();
};
radios5 = document.getElementsByName("fonttype"); // wijzig naar button
for (var i = 0, max = radios5.length; i < max; i++) {
   radios5[i].onclick = function() {
      if (document.getElementById(this.id).checked == true) {
         if (this.id == "text-cmd-bold") {
            canvas.getActiveObject().set("fontWeight", "bold");
         }
         if (this.id == "text-cmd-italic") {
            canvas.getActiveObject().set("fontStyle", "italic");
         }
         if (this.id == "text-cmd-underline") {
            canvas.getActiveObject().set("textDecoration", "underline");
         }
         if (this.id == "text-cmd-linethrough") {
            canvas.getActiveObject().set("textDecoration", "line-through");
         }
         if (this.id == "text-cmd-overline") {
            canvas.getActiveObject().set("textDecoration", "overline");
         }
      } else {
         if (this.id == "text-cmd-bold") {
            canvas.getActiveObject().set("fontWeight", "");
         }
         if (this.id == "text-cmd-italic") {
            canvas.getActiveObject().set("fontStyle", "");
         }
         if (this.id == "text-cmd-underline") {
            canvas.getActiveObject().set("textDecoration", "");
         }
         if (this.id == "text-cmd-linethrough") {
            canvas.getActiveObject().set("textDecoration", "");
         }
         if (this.id == "text-cmd-overline") {
            canvas.getActiveObject().set("textDecoration", "");
         }
      }
      canvas.renderAll();
   }
}
// Send selected object to front or back
var selectedObject;
canvas.on('object:selected', function(event) {
   selectedObject = event.target;
});
var sendSelectedObjectBack = function() {
   canvas.sendToBack(selectedObject);
}
var sendSelectedObjectToFront = function() {
      canvas.bringToFront(selectedObject);
   }
   // Download
var imageSaver = document.getElementById('lnkDownload');
imageSaver.addEventListener('click', saveImage, false);

function saveImage(e) {
   this.href = canvas.toDataURL({
      format: 'png',
      quality: 0.8
   });
   this.download = 'custom.png'
}
// Do some initializing stuff
fabric.Object.prototype.set({
   transparentCorners: true,
   cornerColor: '#22A7F0',
   borderColor: '#22A7F0',
   cornerSize: 12,
   padding: 5
});
 /*
function initCanvas() {
    $('.canvas-container').each(function(index) {

        var canvasContainer = $(this)[0];
        var canvasObject = $("canvas", this)[0];
        var canvas = window._canvas = new fabric.Canvas(canvasObject);

        canvas.setHeight(400);
		canvas.setWidth(380);
		canvas.setBackgroundColor('rgb(255,255,255)');
        //canvas.setBackgroundImage(url, canvas.renderAll.bind(canvas));
        
        var imageOffsetX, imageOffsetY;

        function handleDragStart(e) {
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
            this.classList.add('img_dragging');
          
          
            var imageOffset = $(this).offset();
            imageOffsetX = e.clientX - imageOffset.left;
            imageOffsetY = e.clientY - imageOffset.top;
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'copy';
            return false;
        }

        function handleDragEnter(e) {
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            this.classList.remove('over');
        }

        function handleDrop(e) {
            e = e || window.event;
            if (e.preventDefault) {
              e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            var img = document.querySelector('.canvas-items img.img_dragging');
            console.log('event: ', e);
          
            var offset = $(canvasObject).offset();
            var y = e.clientY - (offset.top + imageOffsetY);
            var x = e.clientX - (offset.left + imageOffsetX);
          
            var newImage = new fabric.Image(img, {
                width: img.width,
                height: img.height,
                left: x,
                top: y
            });
            canvas.add(newImage);
            return false;
        }

        function handleDragEnd(e) {
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
        }
      
      var images = document.querySelectorAll('.canvas-items img');
      [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
      });
      canvasContainer.addEventListener('dragenter', handleDragEnter, false);
      canvasContainer.addEventListener('dragover', handleDragOver, false);
      canvasContainer.addEventListener('dragleave', handleDragLeave, false);
      canvasContainer.addEventListener('drop', handleDrop, false);
	});
	
	$(document).on('keyup', function(e){
		if(e.which == 46) {
			var getActiveObj =_canvas.getActiveObject();
			if( getActiveObj ) {
				_canvas.remove( getActiveObj );
				_canvas.renderAll();
			}
		}
	});	
}
initCanvas();*/

/**
 * FILE: WATERMARK SCRIPT
 * Description: Watermark on any image
 * version: 1.0.0
 * Author: SGDEV
 */


var canvas = new fabric.Canvas('c');
var fileName = "", scaleWidth = 600, scaleHeight = 460;
canvas.on('object:selected', function (e) {
    document.getElementById('generalControls').hidden = false;
    if (e.target.type === 'i-text') {
        document.getElementById('textControls').hidden = false;
    }
});
canvas.on('before:selection:cleared', function (e) {
    document.getElementById('generalControls').hidden = true;
    if (e.target.type === 'i-text') {
        document.getElementById('textControls').hidden = true;
    }
});
document.getElementById('file').addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
        var data = f.target.result;
        fabric.Image.fromURL(data, function (img) {
            var oImg = img.set({
                left: 0,
                top: 0,
                angle: 0,
                originX: 'left',
                originY: 'top',
                border: '#000',
                stroke: '#F0F0F0', //<-- set this
                strokeWidth: 0 //<-- set this
            }).scale(0.2);
            canvas.add(oImg).renderAll();
            //canvas.setScaleX('0.2');
            //canvas.setScaleY('0.2');
            //var a = canvas.setActiveObject(oImg);
            var dataURL = canvas.toDataURL({
                format: 'png',
                quality: 1
            });
        });
    };
    reader.readAsDataURL(file);
});


document.getElementById('uploadfilebtn').addEventListener("change", function (e) {
    $('.fileuploader').addClass('hidden');
    $('.editor').removeClass('hidden');
    setBackground(e);
});
document.getElementById('uploadfilebtn2').addEventListener("change", function (e) {
    setBackground(e);
});
// preventing page from redirecting
$("html").on("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Drag here");
});

$("html").on("drop", function (e) { e.preventDefault(); e.stopPropagation(); });

// Drag enter
$('.fileuploader').on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("dragenter");
});

// Drag over
$('.fileuploader').on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("dragover");
});

// Drop
$('.fileuploader').on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('.fileuploader').addClass('hidden');
    $('.editor').removeClass('hidden');
    console.log(e);
    //setBackground(e);
    var file = e.originalEvent.dataTransfer.files;
    file = file[0];
    filename = file.name;
    console.log(file.name);
    //$('.wm-canvas');
    var reader = new FileReader();
    reader.onload = function (f) {
        var data = f.target.result;

        fabric.Image.fromURL(data, function (img) {
            // add background image         
            //canvas.setDimensions({width:img.width, height:img.height});
            //canvas.setScale('0.2', '0.2');
            //canvas.setScaleY('0.2');
            //var wid = (img.width > 600) ? '600' : img.width,
            //hit =  (img.height > 460) ? '460' : img.width;
            var maxHeight = 460;
            var maxWidth = 600;
            var imageWidth = img.width;
            var imageHeight = img.height;
            var scale = 1;
            var xScale = (yScale = 1);
            if (imageWidth > maxWidth) {
                xScale = 1 - (imageWidth - maxWidth) / imageWidth;
            }
            if (imageHeight > maxHeight) {
                yScale = 1 - (imageHeight - maxHeight) / imageHeight;
            }
            scale = Math.min(xScale, yScale);
            var scaleHeight = imageHeight * scale;
            var scaleWidth = imageWidth * scale;

            canvas.setDimensions({ width: img.width * scale, height: img.height * scale });
            //canvas.setDimensions({width:img.width , height:img.height });

            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
                originX: 'left',
                originY: 'top',
                left: 0,
                top: 0,
            });
            //canvas.setZoom('0.5');
            //var wid = (img.width > 600) ? '600' : img.width,
            //hit =  (img.height > 460) ? '460' : img.width;
            $('.wm-canvas').width(scaleWidth).height(scaleHeight);
            $('.canvas-container').width(scaleWidth).height(scaleHeight).css('overflow', 'hidden');
            //console.log(scale);
            //canvas.setZoom(scale)
            $('#c').css('transform', scale);
            //$('.lower-canvas').css('transform', scale);
        });
    };
    reader.readAsDataURL(file);
});

function setBackground(e) {
    var scale = 1;
    var file = e.target.files[0];
    filename = file.name;
    // console.log(file.name);
    //$('.wm-canvas');
    var reader = new FileReader();
    reader.onload = function (f) {
        var data = f.target.result;

        fabric.Image.fromURL(data, function (img) {
            // add background image         
            //canvas.setDimensions({width:img.width, height:img.height});
            //canvas.setScale('0.2', '0.2');
            //canvas.setScaleY('0.2');
            //var wid = (img.width > 600) ? '600' : img.width,
            //hit =  (img.height > 460) ? '460' : img.width;
            var maxHeight = 460;
            var maxWidth = 600;
            var imageWidth = img.width;
            var imageHeight = img.height;

            var xScale = (yScale = 1);
            if (imageWidth > maxWidth) {
                xScale = 1 - (imageWidth - maxWidth) / imageWidth;
            }
            if (imageHeight > maxHeight) {
                yScale = 1 - (imageHeight - maxHeight) / imageHeight;
            }
            scale = Math.min(xScale, yScale);
            var scaleHeight = imageHeight * scale;
            var scaleWidth = imageWidth * scale;

            //canvas.setDimensions({width:img.width * scale, height:img.height * scale});
            canvas.setDimensions({ width: img.width, height: img.height });

            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
                originX: 'left',
                originY: 'top',
                left: 0,
                top: 0,
            });
            //canvas.setZoom(scale);
            $('.wm-canvas').width(scaleWidth).height(scaleHeight);
            $('.canvas-container').width(scaleWidth).height(scaleHeight).css('overflow', 'hidden');
            $('.upper-canvas').css('transform', 'scale(' + scale + ')');
            $('#c').css('transform', 'scale(' + scale + ')');

        });
        //canvasSetScale(scale);
    };
    reader.readAsDataURL(file);

}
function canvasSetScale(scale) {
    console.log(scale);
    canvas.transformS(scale);
    canvas.setScaleY(scale);
    canvas.renderAll();
}
// Delete selected object
window.deleteObject = function () {
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
    /*canvas.clear();*/
    setTimeout(function () {
        location.reload()
    }, 100);
}
$(document).on('click', '.template', function (e) {

    $('.alltemplates').addClass('hidden');
    var template = $(this).data('template');
    //Template 1
    if (template == 'T01') {
        canvas.add(new fabric.IText('Family Photos', {
            left: 50,
            top: 50,
            fontFamily: 'arial',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 0,
            fontSize: 40,
            opacity: 1
        }));
        canvas.add(new fabric.IText('Kolkata, India', {
            left: 50,
            top: 90,
            fontFamily: 'verdana',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 0,
            fontSize: 20,
            opacity: 1
        }));
    }
    //Template 2
    if (template == 'T02') {
        canvas.add(new fabric.IText('J', {
            left: 50,
            top: 50,
            fontFamily: 'arial',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 0,
            fontSize: 60,
            opacity: 1
        }));
        canvas.add(new fabric.IText('OHN', {
            left: 80,
            top: 54,
            fontFamily: 'arial',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 0,
            fontSize: 40,
            opacity: 1
        }));
        canvas.add(new fabric.IText('D', {
            left: 180,
            top: 50,
            fontFamily: 'arial',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 0,
            fontSize: 60,
            opacity: 1
        }));
        canvas.add(new fabric.IText('OE', {
            left: 224,
            top: 54,
            fontFamily: 'arial',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 0,
            fontSize: 40,
            opacity: 1
        }));
    }
    //Template 1
    if (template == 'T03') {
        canvas.add(new fabric.IText('My', {
            left: 50,
            top: 50,
            fontFamily: 'arial',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 0,
            fontSize: 30,
            opacity: 1
        }));
        canvas.add(new fabric.IText('Watermark', {
            left: 50,
            top: 85,
            fontFamily: 'arial',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 0,
            fontSize: 30,
            opacity: 1
        }));
        canvas.add(new fabric.IText('Studio', {
            left: 50,
            top: 115,
            fontFamily: 'arial',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 0,
            fontSize: 30,
            opacity: 1
        }));
    }
});
// Add text
function Addtext() {
    var fontSize = ($('#text-font-size').val()) ? $('#text-font-size').val() : '50';
    var opacity = ($('#opacity').val()) ? $('#opacity').val() : '1';
    canvas.add(new fabric.IText('Tap and Type', {
        left: 50,
        top: 50,
        fontFamily: 'arial',
        fill: '#000',
        stroke: '#fff',
        strokeWidth: 0,
        fontSize: fontSize,
        opacity: opacity
    }));
}
// Edit Text
$(document).on('click', '.wm-mainbody', function (e) {
    e.stopPropagation();
    $('.alltemplates').addClass('hidden')
});
document.getElementById('text-color').onchange = function () {
    canvas.getActiveObject().setFill('#' + this.value);
    canvas.renderAll();
};
document.getElementById('text-bg-color').onchange = function () {
    canvas.getActiveObject().setBackgroundColor('#' + this.value);
    canvas.renderAll();
};
/*document.getElementById('text-lines-bg-color').onchange = function() {
   canvas.getActiveObject().setTextBackgroundColor('#' + this.value);
   canvas.renderAll();
};*/
document.getElementById('text-stroke-color').onchange = function () {
    canvas.getActiveObject().setStroke('#' + this.value);
    canvas.renderAll();
};
document.getElementById('text-stroke-width').onchange = function () {
    canvas.getActiveObject().setStrokeWidth(this.value);
    canvas.renderAll();
};
document.getElementById('font-family').onchange = function () {
    canvas.getActiveObject().setFontFamily(this.value);
    canvas.renderAll();
};
document.getElementById('text-font-size').onchange = function () {
    //$('#text-font-size-val').val( this.value );
    canvas.getActiveObject().setFontSize(this.value);
    canvas.renderAll();
};
document.getElementById('text-line-height').onchange = function () {
    canvas.getActiveObject().setLineHeight(this.value);
    canvas.renderAll();
};
document.getElementById('text-align').onchange = function () {
    canvas.getActiveObject().setTextAlign(this.value);
    canvas.renderAll();
};

document.getElementById('opacity').onchange = function () {
    canvas.getActiveObject().setOpacity(this.value);
    canvas.renderAll();
};
radios5 = document.getElementsByName("fonttype"); // wijzig naar button
for (var i = 0, max = radios5.length; i < max; i++) {
    radios5[i].onclick = function () {
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
canvas.on('object:selected', function (event) {
    selectedObject = event.target;
});
var sendSelectedObjectBack = function () {
    canvas.sendToBack(selectedObject);
}
var sendSelectedObjectToFront = function () {
    canvas.bringToFront(selectedObject);
}

// Download

var imageSaver = document.getElementById('lnkDownload');
imageSaver.addEventListener('click', saveImage, false);
function saveImage(e) {
    this.href = canvas.toDataURL({
        format: "jpeg",
        quality: 0.95
    });
    this.download = filename;
    $('.canvas-container').width(scaleWidth).height(scaleHeight).css('overflow', 'hidden');
}
// Do some initializing stuff
fabric.Object.prototype.set({
    transparentCorners: true,
    cornerColor: '#22A7F0',
    borderColor: '#22A7F0',
    cornerSize: 12,
    padding: 5
});

$(document).on('click', '.show-templates', function (e) {
    e.stopPropagation();
    $('.alltemplates').toggleClass('hidden');
});
/*
canvas.loadFromJSON(myJson, function () {
    //render the canvas
    canvas.renderAll();
});
*/
$(document).on('click', '.user_template', function (e) {
    $.ajax({
        type: "POST",
        url: actionurl,
        data: { 'action': 'getTemplate', 'template_id': $(this).data('template') },
        dataType: "json",
        success: function (response) {
            if (response.success) {
                canvas.loadFromJSON(response.template, function () {
                    canvas.renderAll();
                });
            } else {
                alert(response.msg);
            }
        }
    });
});

$(document).on('click', '.savemytemplate', function (e) {
    if ($("#checklogin").val() == 1) {
        $('.no_back_strict').css({ 'visibility': 'visible', 'display': 'block' });
        $(this).css({ 'background': '#ccc', 'pointer-events': 'none', 'cursor': 'no-drop' });
        var template_data = JSON.stringify(canvas.toJSON(['left', 'top', 'lockMovementX', 'lockMovementY']));
        $.ajax({
            type: "POST",
            url: actionurl,
            data: { 'action': 'saveTemplate', 'template_file': canvas.toDataURL("image/png"), 'template_data': template_data },
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    $('.no_back_strict').css({ 'visibility': 'hidden', 'display': 'none' });
                    //alert(response.msg);
                    var t = '<div class="template-item"><a href="javascript:void(0);" class="user_template" data-template="' + response.template_id + '" title="Custom Template"><img src="' + response.template_file + '" alt="User Template"/></a><span class="delete_custom_template" data-template="' + response.template_id + '" title="Delete this template"><i class="fa fa-trash"></i></span></div>';
                    $('.user_templates').append(t);
                } else {
                    alert(response.msg);
                }
                $('.savemytemplate').css({ 'background': '#1c4fdb', 'pointer-events': 'inherit', 'cursor': 'pointer' });
            }
        });
    } else {
        $('.signin-container').removeClass('hidden');
    }
});

$(document).on('click', '.signin-container-close', function (e) {
    $('.signin-container').addClass('hidden');
});
$(document).on('click', '#show-signin', function (e) {
    $('.sign-up-block').hide();
    $('.sign-in-block').fadeIn();
    $('.success-sec').hide();
    $('#successmsg').html('');
});
$(document).on('click', '#show-signup', function (e) {
    $('.sign-in-block').hide();
    $('.sign-up-block').fadeIn();
    $('.success-sec').hide();
    $('#successmsg').html('');
});

$(document).on('click', '#dologout', function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: actionurl,
        data: { 'action': 'dologout' },
        dataType: "json",
        success: function (response) {
            if (response.success) {
                $('#checklogin').val(0);
                window.location.reload();
            }
        }
    });
});

$(document).on('submit', '#signin-form', function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: actionurl,
        data: $(this).serialize(),
        dataType: "json",
        success: function (response) {
            if (response.success) {
                $('.signin-container').addClass('hidden');
                $('#dologout').removeClass('hidden').attr('title', 'Logout(' + response.email + ')');
                $('#checklogin').val(1);
                //location.reload(true);
                $('.savemytemplate').trigger('click');
            } else {
                $('#lerrmsg').html(response.msg);
            }
        }
    });
});
$(document).on('submit', '#signup-form', function (e) {
    e.preventDefault();
    $('#rerrmsg').html('');
    if ($('#rpassword').val() == $('#cpassword').val()) {
        if ($('#rpassword').val().length > 7) {
            $.ajax({
                type: "POST",
                url: actionurl,
                data: $(this).serialize(),
                dataType: "json",
                success: function (response) {
                    if (response.success) {
                        $('.sign-in-block').hide();
                        $('.sign-up-block').hide();
                        $('.success-sec').show();
                        $('#successmsg').html('Registration Successful! Please login and enjoy watermarking.');
                    } else {
                        $('#rerrmsg').html(response.msg);
                    }
                }
            });
        } else {
            $('#rerrmsg').html('Too short password (Use atleast 8 characters).');
        }
    } else {
        $('#rerrmsg').html('Password and Confirm password does not match.');
    }
});


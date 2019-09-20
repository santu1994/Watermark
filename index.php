<?php
/**
 * Watermark index file
 * @SGDEV
 * v1.0
 */
require_once('controller.php');
?><!DOCTYPE html><!--WATERMARK @SGDEV-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Watermark</title>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">
    <link href="assets/css/styles.css" rel="stylesheet">
    <link href="assets/js/sweetalert2/dist/sweetalert2.css" rel="stylesheet">
    <script type="text/javascript">var actionurl = "http://localhost/watermark/controller.php";</script>
  </head>
  <body>
    <div id="page_loader"></div>
    <div class="wm-header">
      <div class="wm-title">
        <h1 class="heading">Watermark</h1>
      </div>
    </div>
    <div class="wm-mainbody">
      <div class="container">
        <div class="col-md-12">
            <section class="fileuploader " id="uploadfile">
              <div ><i class="fa fa-picture-o fa-5x"></i></div>
              <span>Drag and drop photo here</span>
              <label class="upload-button">
                  <i class="fa fa-upload"></i> Click to select file
                <input type="file" name="file" id="uploadfilebtn" >
              </label>
            </section>
            <section class="editor hidden">
              <div class="editor-controls">
                <div class="templates-block">
                  <a title="Add Template" class="wm-btn show-templates"><i class="fa fa-anchor"></i> Templates</a>
                  <div class="alltemplates hidden">
                    <div class="template-item">
                      <a href="javascript:void(0);" class="template" data-template="T01" title="Add this template."><img src="assets/templates/arial-times-two-lines.jpg" alt="Template 1"/></a>
                    </div>
                    <div class="template-item">
                      <a href="javascript:void(0);" class="template" data-template="T02" title="Add this template."><img src="assets/templates/montserrat-two-size-black.jpg" alt="Template 1"/></a>
                    </div>
                    <div class="template-item">
                      <a href="javascript:void(0);" class="template" data-template="T03" title="Add this template."><img src="assets/templates/italiana-three-lines.jpg" alt="Template 1"/></a>
                    </div>
                    <div class="user_templates">
                      <?php 
                      if($userTemplates) {
                        foreach($userTemplates as $usertemplate) {
                          ?>
                          <div class="template-item"><a href="javascript:void(0);" class="user_template" data-template="<?php echo $usertemplate['id']; ?>" title="Custom Template"><img src="<?php echo 'uploads/user_templates/' . $usertemplate['template_preview_file']; ?>" alt="User Template"/></a><span class="delete_custom_template" data-template="<?php echo $usertemplate['id']; ?>" title="Delete this template"><i class="fa fa-trash"></i></span></div>
                          <?php
                        }
                      }
                      ?>
                    </div>
                    <div class="template-save">
                      <input id="checklogin" value="<?php echo $checklogin; ?>" type="hidden"/>
                      <a href="javascript:void(0);" class="savemytemplate" title="Save Current Template"><i class="fa fa-floppy-o"></i> Save Current Template</a>
                    </div>
                  </div>
                </div>
                <label title="Add a background" class="myFile"><span> Change Image</span>
                  <input type="file" id="uploadfilebtn2" />
                </label>   
                <label title="Add an image" class="myFile"><span><i class="fa fa-plus"></i> Add Logo</span>
                    <input type="file" id="file" />
                </label>
                <a onclick="Addtext()" title="Add text" class="wm-btn add-text"><i class="fa fa-plus"></i> Add Text</a>
                <!--<a onclick="sendSelectedObjectToFront()" title="Bring selected to front" class="wm-btn to-front"><i class="fa fa-refresh"></i> To Front</span></a>
                <a onclick="sendSelectedObjectBack()" title="Send selected to back" class="wm-btn to-back"><i class="fa fa-refresh"></i> To Back</span></a>-->
                <a onClick="deleteObject()" title="Delete Selected" class="wm-btn delete"><i class="fa fa-trash-o"></i> Delete</span></a>
                <!--<a onClick="refresh()" title="Refresh" class="wm-btn delete-all"><i class="fa fa-trash-o"></i> Clear All</span></a>-->
                
                <a  title="Logout <?php echo (isset($_SESSION['loggedin_email']) && $_SESSION['loggedin_email']) ? '('.$_SESSION['loggedin_email'].')' : ''; ?>" class="wm-btn logout <?php echo ($checklogin) ? '' : 'hidden'; ?>" id="dologout"><i class="fa fa-sign-out"></i> Logout</span></a>
              </div>
              <div id="generalControls" hidden>
                <div class="control-full">
                  <span>Opacity</span>
                  <input type="range" min="0" max="1" step="0.1" value="0.9" id="opacity" class="slider">
                </div>
              </div>
              <div id="textControls" hidden>
                  <div id="text-wrapper" data-ng-show="getText()">
                    <div id="text-controls">
                      <div class="control-full">
                        <div>Font Size(<!--<span id="text-font-size-val">50</span>-->px)</div>
                        <input type="range" min="8" max="200" step="1" value="50" id="text-font-size" class="slider" oninput="fontSize(this.value)" onchange="fontSize(this.value)">
                      </div>
                      <div class="control-full">
                        <span>Change Font</span>
                        <select id="font-family">
                          <option value="arial" selected style="font-family:'Arial';">Arial</option>
                          <option value="HelveticaNeue" style="font-family:'Helvetica Neue';">Helvetica Neue</option>
                          <option value="myriad pro" style="font-family:'myriad pro';">Myriad Pro</option>
                          <option value="delicious" style="font-family:'delicious';">Delicious</option>
                          <option value="verdana" style="font-family:'verdana';">Verdana</option>
                          <option value="georgia" style="font-family:'georgia';">Georgia</option>
                          <option value="courier" style="font-family:'courier';">Courier</option>
                          <option value="comic sans ms" style="font-family:'comic sans ms';">Comic Sans MS</option>
                          <option value="impact" style="font-family:'impact';">Impact</option>
                          <option value="monaco" style="font-family:'monaco';">Monaco</option>
                          <option value="optima" style="font-family:'optima';">Optima</option>
                          <option value="hoefler text" style="font-family:'hoefler text';">Hoefler Text</option>
                          <option value="plaster" style="font-family:'plaster';">Plaster</option>
                          <option value="engagement" style="font-family:'engagement';">Engagement</option>
                        </select>
                      </div>
                      <div class="control-full">
                        <span>Text Color</span> #
                          <input type="text" id="text-color" class="jscolor" value="010101">
                      </div>
                      <div class="control-full">
                        <span>Line Height(px)</span>
                        <input type="range" min="0" max="10" step="0.1" id="text-line-height" class="slider">
                      </div>
                      <div class="control-full">
                        <span>Align</span>
                        <select id="text-align">
                          <option value="left">Align Left</option>
                          <option value="center">Align Center</option>
                          <option value="right">Align Right</option>
                          <option value="justify">Align Justify</option>
                        </select>
                      </div>
                      <div class="control-full">
                        <span>Stroke Width(px)</span>
                        <input type="range" value="0" min="0" max="10" id="text-stroke-width" class="slider">
                      </div>
                      <div class="control-full">
                        <span>Stroke </span> #
                        <input type="text" id="text-stroke-color" class="jscolor" value="010101">
                      </div>
                     <div class="control-full">
                          <span>Background </span> #
                        <input type="text" id="text-bg-color"class="jscolor" value="010101">
                      </div>
                      <!-- <div class="control-full">
                        <span>Background Color</span> #
                        <input type="text" id="text-lines-bg-color" class="jscolor" value="010101">
                      </div>-->
                      <div class="control-full">
                        <div class="chkt">
                          <label><input type='checkbox' name='fonttype' id="text-cmd-bold"> <b>Bold</b></label>
                          <label><input type='checkbox' name='fonttype' id="text-cmd-italic"> <em>Italic</em></label>
                          <label><input type='checkbox' name='fonttype' id="text-cmd-linethrough"> Linethrough</label>
                        </div>
                        <div class="chkt">
                          <label><input type='checkbox' name='fonttype' id="text-cmd-underline"> Underline</label>
                          <label><input type='checkbox' name='fonttype' id="text-cmd-overline"> Overline</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="wm-canvas">
                    <canvas id="c" width="600" height="460"></canvas>
                </div>                
                <a id="lnkDownload" title="Save" class="wm-btn save"><i class="fa fa-floppy-o"></i> Save</a>
            </section>
          </div>            
      </div>
    </div>    
    <div class="wm-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <span>©️ 2019 all rights reserved.</span>
          </div>
        </div>
      </div>     
    </div>
    <div class="signin-container hidden">
      <div class="sg-block">
        <span class="signin-container-close" title="Close"><i class="fa fa-times" aria-hidden="true"></i></span>
        <div class="sg-block-left">
          <span>Watermark</span>
        </div>
        <div class="sg-block-right">
          <div class="success-sec">
            <p id="successmsg"></p>
            <a href="javascript:void(0);" id="show-signin" class="btn btn-primary">Sign In <i class="fa fa-long-arrow-right"></i></a>
          </div>
          <div class="sign-in-block">
            <h2>Sign In</h2>
            <form action="" id="signin-form" method="post">
              <div class="form-group">
                <label for="lemail">Email address</label>
                <input type="email" class="form-control" id="lemail" name="email" placeholder="Enter email" required>
              </div>
              <div class="form-group">
                <label for="lpassword">Password</label>
                <input type="password" class="form-control" id="lpassword" name="password" placeholder="Password" required>
              </div>
              <div class="form-group">
                <input type="checkbox" class="form-check-input" id="remeberme">
                <label class="form-check-label" for="remeberme">Remember me</label>
              </div>
              <input type="hidden" value="dologin" name="action">
              <span id="lerrmsg"></span>
              <button type="submit" class="btn btn-primary">Submit</button>
              <span class="spaceor"> - or - </span>
              <a href="javascript:void(0);" id="show-signup" class="othlink">Sign Up <i class="fa fa-long-arrow-right"></i></a>
            </form>
          </div>
          <div class="sign-up-block">
            <h2>Sign Up</h2>
            <form action="" id="signup-form" method="post">
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="remail" class="form-control" id="remail" name="email" aria-describedby="emailHelp" placeholder="Enter email" required>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="rpassword">Password</label>
                <input type="password" class="form-control" id="rpassword" name="password" placeholder="Password" required>
              </div>              
              <div class="form-group">
                <label for="cpassword">Confirm Password</label>
                <input type="password" class="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" required>
              </div>
              <input type="hidden" value="doregister" name="action">
              <span id="rerrmsg"></span>
              <button type="submit" class="btn btn-primary">Submit</button>
              <span class="spaceor"> - or - </span>
              <a href="javascript:void(0);" id="show-signin" class="othlink">Sign In <i class="fa fa-long-arrow-right"></i></a>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="no_back_strict">
      <div class="strict-message">
        <h4 class="loader-msg">Saving template, please wait...</h4>
        <div class="processing-request"></div>
      </div>
    </div>
    <script type="text/javascript">
    window.onload = function(e){ 
      document.getElementById("page_loader").style.display = "none";
    };
    </script>
    <script src="assets/js/jquery-1.12.0.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/fabric.js-1.7.19/dist/fabric.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js"></script>
    <script src="assets/js/jscolor.js"></script>
    <script src="assets/js/sweetalert2/dist/sweetalert2.all.min.js"></script>
    <script src="assets/js/canvas.script.v.1.0.js"></script>
  </body>
</html>

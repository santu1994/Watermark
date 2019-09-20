<?php
require 'vendor/autoload.php';
/**
 * Controller file
 */
session_start();
$checklogin = 0;

// Creating Connection  
$client = new MongoDB\Client();
// Creating Database  
$db = $client->watermark;
// Creating Document  
$userCollection = $db->users;
$templatesCollection = $db->templates;

// $templates = $templatesCollection->findOne(['_id' =>  new MongoDB\BSON\ObjectID('5d837bb1ab63000024000186')]);
// $templatesInfo =  iterator_to_array($templates);
// print_r($templatesInfo['template_data']);

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
    $checklogin = 1;
    $userTemplates = array();
    if ($_SESSION['loggedin_userid']) {
        $templates = $templatesCollection->find(['user_id' => $_SESSION['loggedin_userid']]);
        if ($templates) {
            $templatesInfo = (array) iterator_to_array($templates);
            foreach ($templatesInfo as $key => $info) {
                $arrayVal = (array) $info;
                $userTemplates[$key]['id'] =  (string) $arrayVal['_id'];
                $userTemplates[$key]['user_id'] =  (string) $arrayVal['user_id'];
                $userTemplates[$key]['template_name'] =  $arrayVal['template_name'];
                $userTemplates[$key]['template_preview_file'] = $arrayVal['template_preview_file'];
                $userTemplates[$key]['template_data'] = $arrayVal['template_data'];
            }
        }
    }
} else {
    $userTemplates = array();
}


if (isset($_POST['action'])) {
    $action = $_POST['action'];
    if ($action == 'dologin') {
        $user = $userCollection->findOne(['email' => trim($_POST['email'])]);
        if ($user) {
            $userInfo = iterator_to_array($user);
            if ($userInfo["password"] == md5($_POST['password'])) {
                $userTemplates = [];
                $_SESSION['loggedin'] = TRUE;
                $_SESSION['loggedin_userid'] = $userInfo["_id"];
                $_SESSION['loggedin_email'] = $userInfo["email"];

                $templates = $templatesCollection->find(['user_id' => $_SESSION['loggedin_userid']]);
                if ($templates) {
                    $templatesInfo = (array) iterator_to_array($templates);
                    foreach ($templatesInfo as $key => $info) {
                        $arrayVal = (array) $info;
                        $userTemplates[$key]['id'] =  (string) $arrayVal['_id'];
                        $userTemplates[$key]['user_id'] =  (string) $arrayVal['user_id'];
                        $userTemplates[$key]['template_name'] =  $arrayVal['template_name'];
                        $userTemplates[$key]['template_preview_file'] = $arrayVal['template_preview_file'];
                        $userTemplates[$key]['template_data'] = $arrayVal['template_data'];
                    }
                }
                echo json_encode(array('success' => TRUE, 'email' => $userInfo["email"], 'userTemplates' => $userTemplates));
            } else {
                echo json_encode(array('success' => FALSE, 'msg' => 'Email or password not match'));
            }
        } else {
            echo json_encode(array('success' => FALSE, 'msg' => 'Email or password not match'));
        }
    }
    if ($action == 'doregister') {
        $user = $userCollection->count(['email' => trim($_POST['email'])]);
        // Already Exit
        if ($user > 0) {
            echo json_encode(array('success' => FALSE, 'msg' => 'Email already exists!'));
        } else {
            // User Insert
            try {
                $userInsert = $userCollection->insertOne(['email' => $_POST['email'], 'password' => md5($_POST['password'])]);
                echo json_encode(array('success' => TRUE));
            } catch (MongoCursorException $e) {
                echo json_encode(array('success' => FALSE, 'msg' => 'Registration error! Please try again later.'));
            }
        }
    }
    if ($action == 'dologout') {
        unset($_SESSION['loggedin']);
        unset($_SESSION['loggedin_email']);
        unset($_SESSION['loggedin_userid']);
        echo json_encode(array('success' => TRUE));
    }
    if ($action == 'saveTemplate') {
        $template_data = $_POST['template_data'];
        $template_file = $_POST['template_file'];
        $d = explode(",", $template_file);
        $path = 'uploads/user_templates/';
        $file_name = 'user_template_' . $_SESSION['loggedin_userid'] . '_' . time();
        $file = $file_name . '.png';
        $template_data_file = $file_name . '.txt';
        file_put_contents($path . $file, base64_decode($d[1]));
        file_put_contents($path . $template_data_file, $template_data);

        try {
            $templatesInsert = $templatesCollection->insertOne(['user_id' => $_SESSION['loggedin_userid'], 'template_name' => $file_name, 'template_preview_file' => $file, 'template_data' => $template_data_file]);
            echo json_encode(array('success' => TRUE, 'msg' => 'Template save successfully!', 'template_file' => $path . $file, 'template_id' => (string) $templatesInsert->getInsertedId()));
        } catch (MongoCursorException $e) {
            echo json_encode(array('success' => FALSE, 'msg' => 'Error occurred! Please try again later.'));
        }
    }
    if ($action == 'deleteTemplate') {
        $templates = $templatesCollection->findOne(['_id' => new MongoDB\BSON\ObjectID($_POST['tid'])]);

        if ($templates) {
            $templatesInfo = (array) iterator_to_array($templates);
            if (file_exists('uploads/user_templates/' . $templatesInfo['template_preview_file'])) {
                unlink('uploads/user_templates/' . $templatesInfo['template_preview_file']);
            }
            if (file_exists('uploads/user_templates/' . $templatesInfo['template_data'])) {
                unlink('uploads/user_templates/' . $templatesInfo['template_data']);
            }
            $templatesCollection->deleteOne(['_id' => new MongoDB\BSON\ObjectID($_POST['tid'])]);
            echo json_encode(array('success' => TRUE));
        } else {
            echo json_encode(array('success' => FALSE, 'msg' => 'Error occurred! Please try again later.'));
        }
    }
    if ($action == 'getTemplate') {
        $templates = $templatesCollection->findOne(['_id' => new MongoDB\BSON\ObjectID($_POST['template_id'])]);
        if ($templates) {
            $templatesInfo = (array) iterator_to_array($templates);
            $template_data = file_get_contents('uploads/user_templates/' . $templatesInfo['template_data']);
            echo json_encode(array('success' => TRUE, 'template' => $template_data));
        } else {
            echo json_encode(array('success' => FALSE, 'msg' => 'Error occurred! Please try again later.'));
        }
    }
}

var editor;

var IDE_RECEIVER = null;
var IDE_POP_OPEN = false;
var IDE_REMOTE = '';
var IDE_SRC = '';
var IDE_EXAMPLES = '';
var IDE_BLANK = '';
var IDE_NULL = '';
var IDE_DIMENSIONS = 'width=800,height=600,scrollbars=no';
var IDE_SAVE_URL = '';
var IDE_SAVE_SANDBOX_URL = '';

var sideWidth = '100%';

var initEditorContent = '';

$(document).ready(function() {

    function editorCallback(event)
    {
        if (event.origin === IDE_REMOTE)
        {
            console.clear();

            // console.log(event.data, IDE_REMOTE);
            // console.log(editor.getValue());

            if (event.data === 'getCode')
            {
                event.source.postMessage(editor.getValue(), IDE_REMOTE);
            }
            else if (event.data === 'shutdown')
            {
                // console.log('editorCallback shutdown?!');

                //  Put iframe back in place
                $('#phaser-example-area').css('display', 'block');

                //  Here we need to set the iframe to a blank page
                $('#demo').attr('src', IDE_EXAMPLES);

                $('#ide-pop span').removeClass('octicon-screen-normal').addClass('octicon-screen-full');

                IDE_POP_OPEN = false;
            }
        }
    }

    if (window.addEventListener)
    {
        addEventListener("message", editorCallback, false);
    }
    else
    {
        attachEvent("onmessage", editorCallback);
    }

    $('#ide-phaser-version').change(function(){

        $('#demo').attr('src', IDE_SRC + '&v=' + this.value);

    });

    $('#ide-run').click(function(){
        if (IDE_POP_OPEN)
        {
            IDE_RECEIVER.postMessage('reload2', IDE_REMOTE);
        }
        else
        {
            IDE_RECEIVER.contentWindow.postMessage('reload2', IDE_REMOTE);
        }
    });

    $('#ide-grab').click(function(){
        if (IDE_POP_OPEN)
        {
            IDE_RECEIVER.postMessage('grab', IDE_REMOTE);
        }
        else
        {
            IDE_RECEIVER.contentWindow.postMessage('grab', IDE_REMOTE);
        }
    });

    $('#ide-pause').click(function(){
        if (IDE_POP_OPEN)
        {
            IDE_RECEIVER.postMessage('pause', IDE_REMOTE);
        }
        else
        {
            IDE_RECEIVER.contentWindow.postMessage('pause', IDE_REMOTE);
        }
    });

    $('#ide-mute').click(function(){
        if (IDE_POP_OPEN)
        {
            IDE_RECEIVER.postMessage('mute', IDE_REMOTE);
        }
        else
        {
            IDE_RECEIVER.contentWindow.postMessage('mute', IDE_REMOTE);
        }
    });

    $('#ide-theme').change(function(){
        editor.setTheme("ace/theme/" + this.value);
    });

    $('#ide-font-inc').click(function(){
        var size = parseInt(document.getElementById('editor').style.fontSize, 10) + 1;
        document.getElementById('editor').style.fontSize = size.toString() + "px";
    });

    $('#ide-font-dec').click(function(){
        var size = parseInt(document.getElementById('editor').style.fontSize, 10) - 1;
        document.getElementById('editor').style.fontSize = size.toString() + "px";
    });

    $('#ide-pop').click(function(event) {

        if (IDE_POP_OPEN)
        {
            //  Put iframe back in place
            $('#phaser-example-area').css('display', 'block');

            //  Here we need to set the iframe to a load the code
            $('#demo').attr('src', IDE_REMOTE);

            $('#ide-pop span').removeClass('octicon-screen-normal').addClass('octicon-screen-full');

            IDE_POP_OPEN = false;
            IDE_RECEIVER.close();
        }
        else
        {
            //  Close it all down
            $('#phaser-example-area').css('display', 'none');

            //  Here we need to set the iframe to a blank page
            $('#demo').attr('src', IDE_NULL);

            $('#ide-pop span').removeClass('octicon-screen-full').addClass('octicon-screen-normal');

            //  And now pop-up
            event.preventDefault();

            IDE_POP_OPEN = true;
            IDE_RECEIVER = window.open(IDE_EXAMPLES, "phaserExample", IDE_DIMENSIONS);
        }

    });

    $('#ide-expand').click(function(){

        if ($('#sidebar').css('display') === 'none')
        {
            //  Already closed, so re-open
            $('#sidebar').css('display', 'block');
            $('#content').css('width', sideWidth);
        }
        else
        {
            sideWidth = $('#content').css('width');
            $('#sidebar').css('display', 'none');
            $('#content').css('width', '96%');
        }

        //  Hide the side-bar
        editor.resize(true);

    });

    $('#ide-save').click(function(){

        if(!isEditorContentChanged()){
            return false;
        }

        if(typeof isSandbox !== 'undefined'){
            $('#modelSandboxTitle').modal();
        }
        else{
            //check if user is logged in
            if(isLoggedIn == false){
                alert('Please login to save this example');
                return false;
            }

            saveEditorContent();
        }
    });

    IDE_RECEIVER = document.getElementById('demo');
    // $('#demo').attr('src', IDE_EXAMPLES);

});

function saveEditorContent()
{
    var bundle = IDE_SAVE_DATA;
    bundle.phaser = $('#ide-phaser-version').val();
    bundle.code = editor.getValue();
    bundle.userId = userId;
    if(typeof isSandbox !== 'undefined'){
        bundle.title = $('#example_title').val();
        bundle.is_sandbox = 1;
    }

    $.ajax({
        type: "POST",
        url: IDE_SAVE_URL,
        data: bundle,
        success: function(data){
            console.log('success', data);
            initEditorContent = editor.getValue();
            alert('Save Successfully');
        },
        error: function(data){
            console.log('error', data);
        },
        complete: function(data){
            console.log('complete', data);
        }
    }, "text");

    if(typeof isSandbox !== 'undefined'){
        $('#modelSandboxTitle').modal('hide');
    }
}

function isEditorContentChanged()
{
    //check IDENTICAL
    var curEditorContent = editor.getValue();
    if(curEditorContent == ''){
        return false;
    }
    if(curEditorContent == initEditorContent){
        alert('The current game version has no changes');
        return false;
    }
    return true;
}
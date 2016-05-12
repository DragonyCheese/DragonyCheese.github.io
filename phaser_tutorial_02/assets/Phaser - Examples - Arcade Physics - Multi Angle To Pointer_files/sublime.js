$(document).ready(function() {

    var Range = ace.require("ace/range").Range;
    editor = ace.edit("editor");

    editor.setFontSize(16);
    editor.setShowPrintMargin(false);

    editor.setTheme("ace/theme/monokai");
    editor.renderer.setShowGutter(true);

    editor.setAutoScrollEditorIntoView(true);
    editor.setOption("minLines", 10);
    editor.setOption("maxLines", 50);
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setUseWrapMode(true);

    editor.commands.addCommand({
        name: 'runCode',
        bindKey: { win: 'Ctrl-Enter',  mac: 'Command-Enter' },
        exec: function(editor) {
            if (IDE_POP_OPEN)
            {
                IDE_RECEIVER.postMessage('reload', IDE_REMOTE);
            }
            else
            {
                IDE_RECEIVER.contentWindow.postMessage('reload', IDE_REMOTE);
            }
        },
        readOnly: true
    });

    /*
    @if (Phaser::Examples()->optionHighlight)
    editor.session.addMarker(new Range({{{ Phaser::Examples()->optionStart }}}, 0, {{{ Phaser::Examples()->optionEnd }}}, 100), "hl", "fullLine", false);
    editor.gotoLine({{{ Phaser::Examples()->optionStart + 1 }}});
    @endif
    */

});

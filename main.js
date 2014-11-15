define(function(require, exports, module) {
    'use strict';

    var CommandManager    = brackets.getModule("command/CommandManager");
    var Menus             = brackets.getModule("command/Menus");
    var Commands          = brackets.getModule("command/Commands");
    var KeyBindingManager = brackets.getModule("command/KeyBindingManager");
    var DocumentManager   = brackets.getModule("document/DocumentManager");
    var EditorManager     = brackets.getModule("editor/EditorManager");
    var MENU_NAME      = "Doxygen";
    var MENU_ID        = "doxygen-menu";
    var FDOXY_ID       = "fdoxy";
    var FDOXY_COMMENT  = "/** Comment...";
    var VDOXY_ID       = "vdoxy";
    var VDOXY_COMMENT  = "//*< A brief description.";
    var SLDOXY_ID      = "sldoxy";
    var SLDOXY_COMMENT = "// A brief description.";
    var SMDOXY_ID      = "smdoxy";
    var SMDOXY_COMMENT = "/* Comment";

    CommandManager.register(FDOXY_COMMENT, FDOXY_ID, functionDocumentation);
    CommandManager.register(VDOXY_COMMENT, VDOXY_ID, variableDocumentation);
    CommandManager.register(SLDOXY_COMMENT, SLDOXY_ID, simpleLineDocumentation);
    CommandManager.register(SMDOXY_COMMENT, SMDOXY_ID, simpleMultiLineDocumentation);

    // Menu Creation.
    var menu = Menus.addMenu(MENU_NAME, MENU_ID, Menus.AFTER, 0);
    menu.addMenuItem(FDOXY_COMMENT, [], Menus.AFTER, MENU_ID);
    menu.addMenuItem(FDOXY_ID);
    menu.addMenuItem(VDOXY_COMMENT, [], Menus.AFTER, MENU_ID);
    menu.addMenuItem(VDOXY_ID);
    menu.addMenuItem(SLDOXY_COMMENT, [], Menus.AFTER, MENU_ID);
    menu.addMenuItem(SLDOXY_ID);
    menu.addMenuItem(SMDOXY_COMMENT, [], Menus.AFTER, MENU_ID);
    menu.addMenuItem(SMDOXY_ID);
    menu.addMenuDivider();
    
    KeyBindingManager.addBinding(FDOXY_ID, "Alt-D", 0);
    KeyBindingManager.addBinding(VDOXY_ID, "Alt-V", 0);
    KeyBindingManager.addBinding(SLDOXY_ID, "Alt-S", 0);
    KeyBindingManager.addBinding(SMDOXY_ID, "Alt-M", 0);
    
    function strRepeat (str, i){
        var newStr = "";
        while(i != 0){
            newStr += str;
            --i;
        }
        return newStr;
    }
    /**
     * @brief This function writes a doxygen comment for document a function.
     * @return Nothing.
     */
    function functionDocumentation() {
        
        var documentation = "/**\r";
        
        // Document objects represent file contents
        var currentDoc = DocumentManager.getCurrentDocument();

        // Editor objects let us modify selections
        var editor = EditorManager.getCurrentFullEditor();
        
        // Get the position of our cursor in the document.
        var pos = editor.getCursorPos();
        var line = currentDoc.getLine(pos.line);
        var spaces = 0;
        
        for (var i = 0; i != line.length; ++i)
        {   
            if(line.charAt(i) == ' ')
                ++spaces;
        }
        pos.ch += spaces;
        // Get the position of our cursor in the document
        var spToAdd = strRepeat(' ', spaces);
        
        documentation += spToAdd + " * @brief Some brief description.\r";
        documentation += spToAdd + " * @param [in|out] type parameter_name Parameter description.\r";
        documentation += spToAdd + " * @param [in|out] type parameter_name Parameter description.\r";
        documentation += spToAdd + " * @return Description of returned value.\r";
        documentation += spToAdd + " *\/";

        // Add our document string to the document.
        currentDoc.replaceRange(documentation, pos);
    }
    /**
     * @brief This function writes a doxygen comment for document a variable.
     * @return Nothing.
     */
    function variableDocumentation() {
        
        var documentation = " //*< A brief description.";
        // Document objects represent file contents
        var currentDoc = DocumentManager.getCurrentDocument();

        // Editor objects let us modify selections
        var editor = EditorManager.getCurrentFullEditor();

        // Get the position of our cursor in the document
        var pos = editor.getCursorPos();

        // Add our document string to the document.
        currentDoc.replaceRange(documentation, pos);
    }
    /**
     * @brief This function writes a simple line comment.
     * @return Nothing.
     */
    function simpleLineDocumentation() {
        
        var documentation = "// ";
        
        // Document objects represent file contents
        var currentDoc = DocumentManager.getCurrentDocument();
        
        // Editor objects let us modify selections
        var editor = EditorManager.getCurrentFullEditor();
        if(editor.getSelectedText() == "")
        {
            var pos = editor.getCursorPos();
            var line = currentDoc.getLine(pos.line);
            var spaces = 0;
        
            for (var i = 0; i != line.length; ++i)
            {   
                if(line.charAt(i) == ' ')
                    ++spaces;
            }
            
            // Get the position of our cursor in the document
            pos.ch += spaces;
            
            // Add our document string to the document.
            currentDoc.replaceRange(documentation, pos);}
    }
    /**
     * @brief This function writes a simple multiline comment.
     * @return Nothing.
     */
    function simpleMultiLineDocumentation() {
        
        var documentation = "/*\r";
        
        // Document objects represent file contents
        var currentDoc = DocumentManager.getCurrentDocument();

        // Editor objects let us modify selections
        var editor = EditorManager.getCurrentFullEditor();

        // Get the position of our cursor in the document
        var pos = editor.getCursorPos();
        var line = currentDoc.getLine(pos.line);
        var spaces = 0;
        
        for (var i = 0; i != line.length; ++i)
        {   
            if(line.charAt(i) == ' ')
                ++spaces;
        }
        // Get the position of our cursor in the document
        var spToAdd = strRepeat(" ", spaces);
        
        for(var i = 4; i != 0; --i)
        {
            documentation += spToAdd + " *\r";
        }
        documentation += spToAdd + " */";
        // Add our document string to the document.
        currentDoc.replaceRange(documentation, pos);
    }
    
});
    


















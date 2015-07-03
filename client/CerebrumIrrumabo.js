//==============CerebrumIrrumabo Engine v0.1=================
// 2015 Joe Pfeiffer
var version = 0.1;

var TIMER = false;

var CerebrumIrrumabo = function(input, code) {
    var that = this;
    
    
    var debug = false;
    var pointerLength = 30;
    var debugValues = {
        pointer: [],
        pointerPos: 0,
        inputPos: 0,
        codePos: 0,
        codeChar: '',
    };
    
    
    var pointerPos = 0,
    		inputPointer = 0,
    		inputPointerIn = 0,
    		pointer = initializePointer(pointerLength),
    		outputString = '';
    function step() {
    	// var input = this.input, code = this.code;
        if (inputPointer <= code.length - 1) {
            var ch = code.charAt(inputPointer);
            if (ch == "+") {
                pointer[pointerPos] = pointer[pointerPos] + 1;
            }
            if (ch == "-") {
                pointer[pointerPos] = pointer[pointerPos] - 1;
                if (pointer[pointerPos] < 0) {
                    pointer[pointerPos] = 0;
                }
            }
            if ( ch == "<") {
                pointerPos--;
                if (pointerPos < 0) {
                    // pointerPos = 0;
                    throw 'Out of bounds';
                }
            }
            if (ch == ">") {
                pointerPos++;
                if (pointerPos > pointerLength) {
                    throw 'Out of bounds';
                }
            }
            if (ch == ",") {
    			var r; //TODO fix this
                if (inputPointerIn < input.length) {
                    r = input.charCodeAt(inputPointerIn);
                    pointer[pointerPos] = r;
                } else {
                    pointer[pointerPos] = 0;
                }
                inputPointerIn = inputPointerIn + 1;
            }
            if (ch == ".") {
                outputString = outputString + String.fromCharCode(pointer[pointerPos]);
            }
            if (ch == "[") {
                if (pointer[pointerPos] == 0) {
                    var a = "";
                    while (a != "]") {
                        inputPointer = inputPointer + 1;
                        a = code.charAt(inputPointer);
                    }
                }
            }
            if (ch == "]") {
                if(pointer[pointerPos] != 0) {
                    var a = "";
                    while(a != "[") {
                        inputPointer = inputPointer - 1;
                        a = code.charAt(inputPointer);
                    }
                }
            }
            inputPointer++;
            if (this.debug) {
                return {
                    pointer: pointer,
                    pointerPos: pointerPos,
                    inputPos: inputPointerIn,
                    codePos: inputPointer - 1,
                    output: outputString
                };
            } else {
                return false;
            }
        } else {
            return true;
        }
        
        
    	// return outputString;
    }
    
    
    
    
    
    
    
    
	var run = function() {
        if (!this.debug) {
            pointerPos = 0,
    		inputPointer = 0,
    		inputPointerIn = 0,
    		pointer = initializePointer(pointerLength),
    		outputString = '';
            var endOfCode = false;
            while (!endOfCode) {
                endOfCode = step();
            }
            return outputString;
        } else {
            return null;
        }
    };
    
    var reset = function () {
        pointerPos = 0,
		inputPointer = 0,
		inputPointerIn = 0,
		pointer = initializePointer(pointerLength),
		outputString = '';
    };
    
    return {
        input: input,
        code: code,
        debug: debug,
        pointerLength: pointerLength,
        debugValues: debugValues,
        run: run,
        step: step,
        reset: reset
    };
};


function initializePointer(plen) {
	var pointerArray = new Array(plen);
    for( var i = 0; i<plen; i = i + 1){
        pointerArray[i] = 0;
    }
	return pointerArray;
}





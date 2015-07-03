//==============CerebrumIrrumabo Engine v0.1=================
// 2015 Joe Pfeiffer
var version = 0.1;

var TIMER = false;

var CerebrumIrrumabo = function(input, code) {
    
    this.pointerLength = 30;
    
    var that = this;
    
    
	this.run = function() {
        return interpret(input, code, that.pointerLength);
        setTimeout(function() {
            TIMER = true;
        }, 50000);
    };
};





function interpret(input, code, pointerLength) {
	var pointerPos = 0,
		inputPointer = 0,
		inputPointerIn = 0,
		pointer = initializePointer(pointerLength),
		outputString = '';
	
	
    while(inputPointer <= code.length - 1 && !TIMER) {
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
    }
	return outputString;
}

function initializePointer(plen) {
	var pointerArray = new Array(plen);
    for( var i = 0; i<plen; i = i + 1){
        pointerArray[i] = 0;
    }
	return pointerArray;
}
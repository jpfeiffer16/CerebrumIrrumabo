//==============CerebrumIrrumabo Engine v0.1=================
// 2015 Joe Pfeiffer
var version = 0.1;

var CerebrumIrrumabo = function(input, code) {

	this.run = function() {
        return interpret(input, code);
    };
};





function interpret(input, code) {
	
	var pointerPos = 0,
		inputPointer = 0,
		inputPointerIn = 0,
		pointer = initializePointer(3000),
		outputString = '';
	
	
    while(inputPointer <= code.length - 1) {
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
            pointerPos = pointerPos - 1;
            if (pointerPos<0) {
                pointerPos = 0;
            }
        }
        if (ch == ">") {
            pointerPos = pointerPos + 1;
            if (pointerPos > 3000) {
                pointerPos = 3000;
            }
        }
        if (ch == ",") {
			var r; //TODO fix this
            if (inputPointerIn < code.length) {
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
                a = "";
                while (a !== "]") {
                    inputPointer = inputPointer + 1;
                    a = code.charAt(inputPointer)
                }
            }
        }
        if (ch == "]") {
			var a; //TODO Fix this
            if(pointer[pointerPos] !== 0) {
                a = "";
                while(a !== "[") {
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
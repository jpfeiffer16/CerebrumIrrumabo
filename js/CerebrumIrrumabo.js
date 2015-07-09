//==============CerebrumIrrumabo Engine v0.1=================
// 2015 Joe Pfeiffer
var version = 0.1;

var TIMER = false;

var CerebrumIrrumabo = function(input, code, pointerLength) {
    var that = this;
    
    this.input = input;
    this.code = code;
    if (pointerLength) {
        this.pointerLength = pointerLength;
    } else {
        this.pointerLength = 200;
    }
    
    
    this.debug = true;
    
    var breakPoints = [];
    this.addBreakpoint = function(index) {
        if (!that.debug) {
            that.debug = true;
        }
        breakPoints.push(parseInt(index));
        console.log(breakPoints);
    }
    
    
    var pointerPos = 0,
		inputPointer = 0,
		inputPointerIn = 0,
		pointer = initializePointer(pointerLength),
		outputString = '';
    this.step = function () {
        if (inputPointer <= that.code.length - 1) {
            var ch = that.code.charAt(inputPointer);
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
                if (inputPointerIn < that.input.length) {
                    r = that.input.charCodeAt(inputPointerIn);
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
                        a = that.code.charAt(inputPointer);
                    }
                }
            }
            if (ch == "]") {
                if(pointer[pointerPos] != 0) {
                    var a = "";
                    while(a != "[") {
                        inputPointer = inputPointer - 1;
                        a = that.code.charAt(inputPointer);
                    }
                }
            }
            inputPointer++;
            return {
                pointer: pointer,
                pointerPos: pointerPos,
                inputPos: inputPointerIn - 1,
                codePos: inputPointer - 1 == -1 ? 0 : inputPointer - 1,
                output: outputString
            };
        } else {
            return true;
        }
        
        
    	// return outputString;
    }
    
    
    
    
    
    
    
    
	this.run = function() {
        if (!this.debug) {
             that.reset();
        }
        var endOfCode = false;
        while (endOfCode != true && breakPoints.indexOf(endOfCode.codePos) == -1) {
            endOfCode = that.step();
        }
        // console.log(endOfCode);
        if (endOfCode == true){
            return {
                endOfCode: true,
                output: outputString
            };
        } else {
            return endOfCode;
        }
 
    };
    
    this.reset = function () {
        pointerPos = 0,
		inputPointer = 0,
		inputPointerIn = 0,
		pointer = initializePointer(pointerLength),
		outputString = '';
    };
    
    // return {
    //     input: input,
    //     code: code,
    //     debug: debug,
    //     addBreakpoint: addBreakpoint,
    //     pointerLength: pointerLength,
    //     run: run,
    //     step: step,
    //     reset: reset
    // };
};


function initializePointer(plen) {
	var pointerArray = new Array(plen);
    for( var i = 0; i < plen; i = i + 1){
        pointerArray[i] = 0;
    }
	return pointerArray;
}





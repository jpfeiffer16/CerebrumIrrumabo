/* global CodeMirror */
CodeMirror.defineSimpleMode('bfmode', {
	start: [
		{regex: /[+-]/, token: 'pointer-operator'},
		{regex: /[\[]/, token: 'loop-operator', indent: true},
		{regex: /[\]]/, token: 'loop-operator', dedent: true},
		{regex: /[<>]/, token: 'pointer-mover'},
		{regex: /[,.]/, token: 'io-operator'},
		// {regex: /[\[]/, indent: true}
	]
});
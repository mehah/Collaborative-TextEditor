var EditorColaborativo = function(inputText) {
	if (inputText === null) {
		alert("Por favor, envie um input!");
		return;
	}

	var editor = this;

	var idEvent = null;

	var $inputText = $(inputText);

	var messages = new Array();

	var isCtrl = false;
	var isAlt = false;
	var useCtrlAndKey = false;

	var timeToSend = 250;

	this.adicionarMessages = function(list) {
		for (i in list) adicionarMessage(list[i]);
	}

	var adicionarMessage = function(m) {
		var text = $inputText.val();

		if (text.length === 0) {
			$inputText.val(m.txt);
		} else {
			var textBuilder = new StringBuilder(text);

			if (m.posRemove != null) {
				if (m.posRemove.length == 1)
					textBuilder.removeCharAt(m.posRemove[0]);
				else
					textBuilder.replace(m.posRemove[0], m.posRemove[1], m.txt == null ? "" : m.txt);
			} else {
				textBuilder.insert(m.pos, m.txt);
			}
			
			var focus = inputText.selectionStart;
			var scroll = inputText.scrollTop;

			$inputText.val(textBuilder.toString());
			/* inputText.textContent = textBuilder.toString(); */

			/*
			 * if(m.pos < focus) { focus +=
			 * string.length-(string.charAt(string.length-1) === '\r' ? 1 : 0); }
			 */

			if (m.scroll < scroll)
				scroll += 16 * (m.txt.substr_count('\r') - 1);

			inputText.selectionStart = focus + 1;
			inputText.selectionEnd = focus;

			inputText.scrollTop = scroll;
		}
	};

	var addMessage = function(msg) {
		if(!msg || msg.length === 0)
			return;
		
		messages.push(eval('(' + JSON.stringify(msg) + ')'));
	};

	var sendServer = function() {
		if(!messages.length)
			return;
		
		$.post('EditorColaborativoAction@enviarMessage', {
			viewId : viewId,
			msgs : JSON.stringify(messages)
		});
		messages.length = 0;
	};

	var getSelectionStart = function() {
		return inputText.selectionStart == null ? window.getSelection().getRangeAt(0).startOffset : inputText.selectionStart;
	};

	var getSelectionEnd = function() {
		return inputText.selectionEnd == null ? window.getSelection().getRangeAt(0).endOffset : inputText.selectionEnd;
	};

	var keypressEvent = function(e, isKeydown) {
		if (isAlt) return false;

		if (isCtrl) {
			if (e.which === 118 || e.which === 86) {
				var msg = {};
				
				var selectionStart = getSelectionStart();
				
				if(getSelectionStart() !== getSelectionEnd())
					msg.posRemove = [ getSelectionStart(), getSelectionEnd() ];
				else
					msg.pos = selectionStart;
					
				setTimeout(function() {
					msg.txt = $inputText.val().substring(selectionStart, getSelectionStart());

					addMessage(msg);

					editor.stopEventMessage();
					idEvent = setTimeout(function() {
						sendServer();
					}, timeToSend);
				}, 5);
			}

			return true;
		}
	
		if(!isKeydown && (e.which === 8 || e.which === 46))
			return false;
		
		if(!(e.which === 8 || e.which >= 32 && e.which <= 126 || e.which >= 161 || e.which === 13))
			return false;
		
		/*if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode >= 34 && e.keyCode <= 45 || (isInternetExplorer === false && e.keyCode >= 112 && e.keyCode <= 123))
		return true;*/		
	
		var msg = { pos: getSelectionStart() };
		
		var value = $inputText.val();
		
		if(msg.pos === 0 && e.keyCode === 8 || msg.pos === value.length && e.keyCode === 46)
			return false;
			
		if(getSelectionStart() !== getSelectionEnd())
			msg.posRemove = [ getSelectionStart(), getSelectionEnd() ];
			
		if (e.keyCode !== 46 && e.keyCode !== 8) {			
			msg.txt = String.fromCharCode((e.keyCode === 0 ? e.which : e.keyCode));
			
			addMessage(msg);
	
			editor.stopEventMessage();
			idEvent = setTimeout(function() {
				sendServer();
			}, timeToSend);
		} else {
			delete msg.pos;
			if (!msg.posRemove)
				msg.posRemove = [e.keyCode === 8 ? getSelectionStart() - 1 : getSelectionStart()];
			
			addMessage(msg);
			sendServer();
		}
	};

	Greencode.crossbrowser.registerEvent.call(inputText, 'keyup', function(e) {
		if (e.which === 17) {
			isCtrl = false;
			useCtrlAndKey = false;
		} else if (e.which === 18)
			isAlt = false;
	});
	
	Greencode.crossbrowser.registerEvent.call(inputText, 'keydown', function(e) {
		if(e.which >= 37 && e.which <= 40) {
			sendServer();
			return true;
		}
		
		if (e.which === 17)
			isCtrl = true;
		else if (e.which === 18)
			isAlt = true;

		if (isCtrl === true && (e.keyCode === 67 || e.keyCode === 65 || e.keyCode === 86))
			useCtrlAndKey = true;
				
		if(e.which === 46 || e.which === 8)
			keypressEvent(e, true);
	});
	
	Greencode.crossbrowser.registerEvent.call(inputText, 'keypress', keypressEvent);
	
	$(window).on('mousedown mouseleave', function(e) {
		sendServer();
	});

	this.stopEventMessage = function() {
		clearTimeout(idEvent);
	};

	return this;
};
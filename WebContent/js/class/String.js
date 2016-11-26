	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g,"");
	};
 
	/*left trim*/
	String.prototype.ltrim = function () {
		return this.replace(/^\s+/,"");
	};
 
	/*right trim*/
	String.prototype.rtrim = function () {
		return this.replace(/\s+$/,"");
	};
	
	String.prototype.substr_count = function (needle, offset, length)
	{
		if(offset == null && length == null)
			return this.split(needle).length-1; /*performance quando so quer a quantidade*/

	    var cnt = 0;
	    needle += '';
	    if (isNaN(offset)) {offset = 0;}
	    if (isNaN(length)) {length = 0;}
	    offset--; 
	    while ((offset = this.indexOf(needle, offset+1)) != -1){
	        if (length > 0 && (offset+needle.length) > length){
	            return false;
	        } else{            cnt++;
	        }
	    }
	 
	    return cnt;
	};	
		
	String.prototype.replaceAll = function(de, para){
	    var str = this;
	    var pos = str.indexOf(de);
	    while (pos > -1){
			str = str.replace(de, para);
			pos = str.indexOf(de);
		}
	    return str;
	};
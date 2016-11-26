/* StringBuilder por Renato Machado dos Santos */

var StringBuilder = function(s)
{
	var string = s == null ? '' : s;
	
	this.append = function(v) { string += v; return this; };
	this.remove = function(start, end)
	{
		if(start === end)
			return this.removeCharAt(start);
		
		string = string.substring(0, start)+string.substring(end, string.length);
				
		return this;
	};
	
	this.removeCharAt = function(index)
	{
		if(index === 0)
			string = string.substring(1, string.length);
		else
		{
			var realCnt = string.length-1;
			if(index === realCnt)
				string = string.substring(0, realCnt);
			else
				string = string.substring(0, index)+string.substring(index+1, string.length); return this;
		}
		
		return this;
		
	};
	
	this.indexOf = function(searchString, startPosition)
	{
		return string.indexOf(searchString, startPosition);
	};
	
	this.lastIndexOf = function(searchString, startPosition)
	{
		return string.lastIndexOf(searchString, startPosition);
	};
	
	this.insert = function(offset, str)
	{
		string = string.substring(0, offset)+str+string.substring(offset, string.length);
		return this;
	};
	
	this.length = function(offset, str)
	{
		return string.length;
	};
	
	this.replace = function(start, end, str)
	{
		string = string.substring(0, start)+str+string.substring(end, string.length); return this;
	};
	
	this.toString = function() { return string; };
	
	this.substring = function(start, end) { return string.substring(start, end); };
	
	this.equals = function(str) { return string === str; };
};
package form;

import greencode.jscript.Form;
import greencode.jscript.form.annotation.ElementValue;
import greencode.jscript.form.annotation.Name;

@Name("homeForm")
public class HomeForm extends Form {
	
	@ElementValue
	private String editor;

	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}
}

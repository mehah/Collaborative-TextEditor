package controller;

import form.HomeForm;
import greencode.http.HttpRequest;
import greencode.jscript.DOMHandle;
import greencode.jscript.Window;
import greencode.jscript.function.implementation.SimpleFunction;
import greencode.jscript.window.annotation.Page;
import greencode.jscript.window.listener.WindowDestroyListener;
import greencode.kernel.GreenContext;

import java.util.ArrayList;
import java.util.Arrays;

import util.Editor;
import GsonModel.GMessage;

import com.google.gson.Gson;

@Page(name="index", path = "index.html")
public class EditorColaborativoAction extends Window implements WindowDestroyListener {

	private final HomeForm form = document.forms(HomeForm.class);
	private ArrayList<GMessage> textos;
	private String sessionId;
	private boolean started = true;
	
	public void init() {
		form.setEditor(Editor.texto.toString());
		form.fill();
		
		HttpRequest request = GreenContext.getInstance().getRequest();
		this.sessionId = request.getSession().getId()+"_"+request.getViewSession().getId();
		this.textos = Editor.adicionarUsuario(sessionId);
		
		receberMessage();
	}
	
	public void enviarMessage() {
		try {
			GreenContext context = GreenContext.getInstance();
			Gson gson = GreenContext.getInstance().gsonInstance;
			
			GMessage[] msgsRequest = gson.fromJson(context.getRequest().getParameter("msgs"), GMessage[].class);
			
			for (GMessage gMessage : msgsRequest) {
				Editor.adicionarTexto(gMessage);
			}					
						
			for (String codUsu : Editor.usuariosIds) {
				if(sessionId.equals(codUsu))
					continue;

				Editor.adquirirTxtsDoUsuario(codUsu).addAll(Arrays.asList(msgsRequest));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}	
	}
	
	public void receberMessage() {
		setTimeout(new SimpleFunction() {			
			public void init() {
				try {
					while(started) {						
						if(!textos.isEmpty()) {
							DOMHandle.execCommand(window, "editor.adicionarMessages", textos);
							System.out.println("hehe");
							flush();
							textos.clear();
						}else
							flush();
						
						Thread.sleep(500);
					}
				}catch (Exception e) {
					onDestroy();
				}
			}
		}, 0);
	}

	public void onDestroy() {
		started = false;
		Editor.removerUsuario(sessionId);
	}
}

package util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import GsonModel.GMessage;

public final class Editor {
	public final static StringBuilder texto = new StringBuilder();
	private static final HashMap<String, ArrayList<GMessage>> usuarios = new HashMap<String, ArrayList<GMessage>>();
	public static final List<String> usuariosIds = new ArrayList<String>();
	public static String idUltimoUsuario = null;

	private Editor() {}

	public static boolean contemUsuario(String id) {
		return usuarios.containsKey(id);
	}

	public static ArrayList<GMessage> adicionarUsuario(String idUsu) {
		usuariosIds.add(idUsu);

		ArrayList<GMessage> list = new ArrayList<GMessage>();
		usuarios.put(idUsu, list);

		return list;
	}

	public static void adicionarTxtParaUsuario(String idUsu, GMessage ob) {
		usuarios.get(idUsu).add(ob);
	}

	public static ArrayList<GMessage> adquirirTxtsDoUsuario(String idUsu) {
		return usuarios.get(idUsu);
	}

	public static void removerUsuario(String id) {
		usuariosIds.remove(id);
		usuarios.remove(id);
	}

	public static void adicionarTexto(GMessage m) {
		if (texto.length() == 0) {
			texto.append(m.getTxt());
		} else {
			if (m.getPosRemove() != null) {
				if (m.getPosRemove().length == 1)
					texto.deleteCharAt(m.getPosRemove()[0]);
				else
					texto.replace(m.getPosRemove()[0], m.getPosRemove()[1], m.getTxt() == null ? "" : m.getTxt());
			} else
				texto.insert(m.getPos(), m.getTxt());
		}
	}
}

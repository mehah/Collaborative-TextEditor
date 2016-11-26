package GsonModel;

public class GMessage {
	private int pos;
	private String txt;
	private int[] posRemove;
	
	public int getPos(){return pos;}
	public void setPos(int pos){this.pos = pos;}
	
	public String getTxt(){return txt;}
	public void setTxt(String msg) {this.txt = msg;}
	
	public int[] getPosRemove() {return posRemove;}
	public void setPosRemove(int[] posRemove) {this.posRemove = posRemove;}
}

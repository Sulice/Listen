export class Track {
	public artist: String;
	public album: String;
	public title: String;
	public src: String;
	
	constructor(str: String) {
		this.artist = str.replace(/.*\/([^\/]*)\/([^\/]*)\/.*$/,"$1");
		this.album = str.replace(/.*\/([^\/]*)\/.*$/,"$1");
		this.title = str.replace(/.*\/(.*)$/,"$1").replace(/\.\w+$/,'');
		this.src = str;
	}
}

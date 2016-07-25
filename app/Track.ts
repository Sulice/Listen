export class Track {
	artist: string;
	album: string;
	title: string;
	src: string;
	
	constructor(str: string) {
		this.artist = str.replace(/.*\/([^\/]*)\/([^\/]*)\/.*$/,"$1");
		this.album = str.replace(/.*\/([^\/]*)\/.*$/,"$1");
		this.title = str.replace(/.*\/(.*)$/,"$1").replace(/\.\w+$/,'');
		this.src = str;
	}
}

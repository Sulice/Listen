import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

// Operators
import "rxjs/add/operator/map";

import { Observable } from "rxjs/Observable";

import { File } from "./File";

@Injectable()
export class PlaylistService {

    playlists: any;

    constructor(
        private http: Http
    ) {
        this.restore();
    }

    save(): boolean {
        window.localStorage["playlists"] = JSON.stringify(this.playlists);
        return true;
    }

    restore(): boolean {
        this.playlists = JSON.parse(window.localStorage.getItem("playlists"));
        if (this.playlists == null) {
            this.playlists = {};
        }
        console.log(this.playlists);
        return true;
    }

    addPlaylist(playlistName: string): boolean {
        if (!this.playlists.hasOwnProperty(playlistName)) {
            this.playlists[playlistName] = [];
            return true;
        }
        return false;
    }

    removePlaylist(playlistName: string): boolean {
        delete this.playlists[playlistName];
        return true;
    }

    addFileToPlaylist(playlistName: string, fileURL: string): boolean {
        if (this.playlists.hasOwnProperty(playlistName)) {
            this.playlists[playlistName].push(fileURL);
            return true;
        }
        return false;
    }

    removeFileFromPlaylist(playlistName: string, index: number): boolean {
        if (this.playlists.hasOwnProperty(playlistName)) {
            this.playlists[playlistName].splice(index, 0);
            return true;
        }
        return false;
    }

    genFileListFromPlaylist(playlistName: string) {
        if (!this.playlists.hasOwnProperty(playlistName)) {
            return false;
        }

        let fileList: File[] = [];
        return this.http.post("php/playlist.php", JSON.stringify(this.playlists[playlistName]));
    }

    private extractSearchData(res: Response): File[] {
        let body = res.json() || {};
        let tl: File[] = [];
        for (let i = 0; i < body.data.length; i++) {
            // if the file has a length of 0, skip it.
            if (body.data[i][0] !== "" && body.data[i][1] !== 0) {
                tl.push(new File(body.data[i][0], body.data[i][1]));
            }
        }
        return tl || [];
    }

    private extractBrowseData(res: Response): File[] {
        let body = res.json() || {};
        let tl: File[] = [];
        let p = body["parent"];
        if (p === "") {
            p = "/";
        }
        for (let i = 0; i < body.data.length; i++ ) {
            // if the file has a length of 0, skip it.
            if (body.data[i][0] !== "" && body.data[i][1] !== 0) {
                tl.push(new File(body.data[i][0], body.data[i][1], p));
            }
        }
        return tl || [];
    }
}

import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class CustomTitleStrategy extends TitleStrategy {

    override updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot);
        console.log('Title: ', title);
        if(title) {
            this.title.setTitle(`Client-App - ${title}`);
        }
    }

    constructor(private title: Title) {
        super();
    }
}
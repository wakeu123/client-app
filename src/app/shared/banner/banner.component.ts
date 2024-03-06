import { Component } from "@angular/core";

@Component({
    selector: 'banner',
    standalone: true,
    template: `
        <section>
            <div class="banner-info">

            </div>
            @if(expand) {
                <div class="more-info">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, dolorum ad architecto omnis, inventore cumque ex qui reprehenderit rem eveniet impedit consectetur tempora velit id magni obcaecati reiciendis quod animi!
                </div>
            }
        </section>
    `
})
export class BannerComponent {
    expand = false;
}
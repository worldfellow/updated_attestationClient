import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <p>
      loader works!
    </p>
    <div class="wrapper">
    <div class="box-wrap">
        <div class="box one"></div>
        <div class="box two"></div>
        <div class="box three"></div>
        <div class="box four"></div>
        <div class="box five"></div>
        <div class="box six"></div>
    </div>
</div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

}

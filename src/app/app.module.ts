import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient  } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { PagesModule } from './pages/pages.module';
import { OneColumnModule } from './one-column/one-column.module';
import { MatMenuModule } from '@angular/material/menu'; 
import { AuthInterceptor } from './auth-interceptor';
import { BnNgIdleModule } from 'bn-ng-idle';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatMenuModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    MatDividerModule,
    BrowserAnimationsModule,
    PagesModule,
    OneColumnModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // HttpClientModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },BnNgIdleModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { PagesModule } from './pages/pages.module';
import { OneColumnModule } from './one-column/one-column.module';
import { MatMenuModule } from '@angular/material/menu'; 
import { AuthInterceptor } from './auth-interceptor';

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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

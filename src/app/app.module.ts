import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { PagesModule } from './pages/pages.module';
import { OneColumnModule } from './one-column/one-column.module';
import { MatMenuModule } from '@angular/material/menu'; 
// import { SidenavComponent } from './pages/sidenav/sidenav.component';
// import { BodyComponent } from './pages/body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    // SidenavComponent,
    // BodyComponent,
  ],
  imports: [
    MatMenuModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    MatDividerModule,
    BrowserAnimationsModule,
    PagesModule,
    OneColumnModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { NgFlashMessagesModule } from 'ng-flash-messages';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    NgFlashMessagesModule.forRoot()
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

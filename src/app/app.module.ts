import { BrowserModule  } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';

import { AppComponent } from "./app.component";
import { components } from "./components/index";
import { directives } from './directives/index';
import { pipes } from './pipes/index';
import { services } from "./services/index";

import { messages } from "./stores/messages.store";


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        StoreModule.provideStore({messages}),
    ],
    declarations: [
        AppComponent,
        ...components,
        ...directives,
        ...pipes
    ],
    providers: [
        ...services
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}

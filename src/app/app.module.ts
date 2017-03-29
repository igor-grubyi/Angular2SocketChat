import { BrowserModule  } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// App component
import { AppComponent } from "./app.component";

// Shared module
import { SharedModule } from "./shared/shared.module";

// Other components
import { ControlComponent } from "./control";
import { NicknameComponent } from "./nickname";
import { RoomComponent } from "./room";
import { RoomsComponent } from "./rooms";

// Pipes
import { CapitalizeFirstPipe } from './pipes/first-letter-pipe';

// Directives
import { ColorHashDirective } from './directives/color-hash.directive';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        ControlComponent,
        NicknameComponent,
        RoomComponent,
        RoomsComponent,
        CapitalizeFirstPipe,
        ColorHashDirective
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}

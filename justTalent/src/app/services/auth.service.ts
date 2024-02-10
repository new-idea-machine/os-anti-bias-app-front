import { Injectable, signal } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //signal is used as a state management?
  currentUserSignal = signal<User | undefined | null>(undefined)
}

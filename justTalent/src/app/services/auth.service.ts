import { Injectable, signal } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSignal = signal<User | undefined | null>(undefined)
}

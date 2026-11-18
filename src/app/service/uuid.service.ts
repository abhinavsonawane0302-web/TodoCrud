import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuidService {



  getuuid(): string {
    return crypto.randomUUID()
  }


  


  constructor() { }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-attestation',
  templateUrl: './new-attestation.component.html',
  styleUrls: ['./new-attestation.component.css']
})
export class NewAttestationComponent implements OnInit {
  constructor(
    private router: Router,
  ) { 
    console.log('NewAttestationComponent')
  }

  ngOnInit(): void {
  }

}

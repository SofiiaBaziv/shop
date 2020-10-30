import { Component, OnInit } from '@angular/core';
import { HealthProgram } from 'src/app/shared/models/health.program.model';
import { HealthProgramService } from '../../shared/services/health.program.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  healthProgram: HealthProgram = new HealthProgram();
  healthPrograms: Array<HealthProgram> = [];

  constructor(
    private healthProgramService: HealthProgramService) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms(): void {
    this.healthProgramService.getPrograms().subscribe(
      collection => {
        this.healthPrograms = collection.map(program => {
          const data = program.payload.doc.data() as HealthProgram;
          data.id = program.payload.doc.id;
          return data;
        });
      }
    );
  }
}


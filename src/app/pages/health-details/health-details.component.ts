import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HealthProgramService } from 'src/app/shared/services/health.program.service';
import { HealthProgram } from '../../shared/models/health.program.model';

@Component({
  selector: 'app-health-details',
  templateUrl: './health-details.component.html',
  styleUrls: ['./health-details.component.scss']
})
export class HealthDetailsComponent implements OnInit {

  programId: string;
  healthProgram: HealthProgram;

  constructor(
    private route: ActivatedRoute,
    private healthProgramService: HealthProgramService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.programId = params.id;
      }
    );
    this.healthProgramService.getById(this.programId).subscribe(data => {
      this.healthProgram = data;
      this.healthProgram.id = this.programId;
    });
  }

}

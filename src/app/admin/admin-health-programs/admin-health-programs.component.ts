import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { HealthProgram } from 'src/app/shared/models/health.program.model';
import { HealthProgramService } from '../../shared/services/health.program.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-health-programs',
  templateUrl: './admin-health-programs.component.html',
  styleUrls: ['./admin-health-programs.component.scss']
})
export class AdminHealthProgramsComponent implements OnInit {
  modalRef: BsModalRef;

  healthProgram: HealthProgram = new HealthProgram();
  healthPrograms: Array<HealthProgram> = [];

  imageStatus: boolean;
  uploadProgress: Observable<number>;

  programForEdit: HealthProgram;
  programIdForDelete: string;


  constructor(
    private modalService: BsModalService,
    private healthProgramService: HealthProgramService,
    private afStorage: AngularFireStorage) { }

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

  addProgram() {
    this.modalRef.hide();
    this.healthProgramService.createPrograms(this.healthProgram);
    this.healthProgram = new HealthProgram();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.healthProgram = new HealthProgram();
    this.imageStatus = false;
  }

  uploadFile(event, healthProgram): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        healthProgram.image = url;
        this.imageStatus = true;
      });
    });
  }

  deleteImage(healthProgram) {
    this.afStorage.storage.refFromURL(healthProgram.image).delete();
    this.imageStatus = false;
    healthProgram.image = null;
  }

  editProgramModal(template: TemplateRef<any>, program: HealthProgram): void {
    this.modalRef = this.modalService.show(template);
    this.programForEdit = JSON.parse(JSON.stringify(program));
  }

  editProgram(): void {
    this.healthProgramService.updatePrograms(this.programForEdit.id, this.programForEdit);
    this.modalRef.hide();
  }

  deleteProgramModal(template: TemplateRef<any>, product: HealthProgram) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
    this.programIdForDelete = product.id;
  }

  deleteProgram() {
    this.healthProgramService.deleteProgram(this.programIdForDelete);
    this.modalRef.hide();
  }
}

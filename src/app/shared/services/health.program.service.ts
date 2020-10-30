import { HealthProgram } from '../models/health.program.model';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HealthProgramService {

  constructor(private firestore: AngularFirestore) { }

  getPrograms(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('healthPrograms').snapshotChanges();
  }

  createPrograms(program: HealthProgram) {
    return this.firestore.collection('healthPrograms').add({ ...program });
  }

  deleteProgram(programId: string) {
    return this.firestore.doc('healthPrograms/' + programId).delete();
  }

  updatePrograms(id: string, program: HealthProgram) {
    return this.firestore.collection('healthPrograms').doc(id).update(program);
  }

  getById(id): any {
    return this.firestore.collection('healthPrograms').doc(id).valueChanges();
  }
}


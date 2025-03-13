import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class ResumeDataService {
  firestore = inject(Firestore);

  async loadResume() {
    const resumeCollection = collection(this.firestore, 'resume');
    const snapshot = await getDocs(resumeCollection);
    const result: any = {};

    for (const doc of snapshot.docs) {
      const data = doc.data();
      result[doc.id] = data['collection-name']
        ? await this.loadSubCollection(doc.id, data['collection-name'])
        : data;
    }

    return result as ResumeData;
  }

  private async loadSubCollection(docId: string, collectionName: string) {
    const subCollection = collection(this.firestore, `/resume/${docId}/${collectionName}`);
    const subSnapshot = await getDocs(subCollection);
    return subSnapshot.docs.map(d => d.data());
  }

}
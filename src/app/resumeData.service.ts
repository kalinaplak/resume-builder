import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';



@Injectable({ providedIn: 'root' })
export class ResumeDataService {
  firestore = inject(Firestore);

  async loadResume() {
    const resumeCollection = collection(this.firestore, 'resume');
    const snapshot = await getDocs(resumeCollection);
    const result: any = this.getEmptyResume();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const key = doc.id as keyof ResumeData;
      result[key] = data['collection-name']
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

  private getEmptyResume(): ResumeData {
    return {
      education:[],
      employment: [],
      hobbies: {description:''},
      languages:[],
      skills: [],
      websites:{github:'', linkedin:''},
      personalDetails: {
        city:'',
        country:'',
        email:'',
        name:'',
        phone:'',
        position:'',
        summary:'',
        surname:''
      }
    }
  }

}
import { computed, inject, Injectable, signal } from '@angular/core';
import { Firestore, setDoc, doc, getDocs, collection, getDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AsyncHandler } from './shared/asyncHandler/asyncHandler.decorator';

@Injectable({ providedIn: 'root' })
export class ResumeDataService {
  private firestore = inject(Firestore);
  private auth = inject(AuthService);

  private _resumeData = signal<ResumeData | null>(null);
  resumeData = computed(() => this._resumeData());
  loading = false;

  async loadResumes() {
    const resumesCollection = collection(this.firestore, 'resumes');
    const snapshot = await getDocs(resumesCollection);
    const resumes: any[] = [];
    snapshot.forEach(doc => {
      const data = { id: doc.id, ...doc.data() };
      resumes.push(data);
    });
    return resumes;
  }

  async loadResume(id: string) {
    const resumeCollection = collection(this.firestore, `/resumes/${id}/resume`);
    const snapshot = await getDocs(resumeCollection);
    const result: any = this.getEmptyResume();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const key = doc.id as keyof ResumeData;
      console.log(key, result);
      result[key] = Array.isArray(result[key])
        ? await this.loadSubCollection(id, doc.id, `${doc.id}List`)
        : data;
    }
    this._resumeData.set(result);
    return result as ResumeData;
  }

  @AsyncHandler({
    errorMessage: 'Failed to create resume',
    successMessage: 'Resume created successfully',
    loadingProperty: 'loading',
  })
  async createResume(): Promise<string | undefined>{
    const resumesCollection = collection(this.firestore, 'resumes');
    const docRef = await addDoc(resumesCollection, {
      title: this.auth.user ? `${this.auth.user()?.displayName}` : 'Unknown Author',
      lastModificationDate: new Date(),
      createdDate: new Date(),
    });
    return docRef.id;
  }

  async editResume(id: string, resume: ResumeData){
    const keys = Object.keys(resume) as (keyof typeof resume)[];
    const resumeRef = doc(this.firestore, 'resumes', id);
    const resumeData = (await getDoc(resumeRef)).data();


    await setDoc(resumeRef, {
      title: `${resume.personalDetails.name} ${resume.personalDetails.surname}`,
      lastModificationDate: new Date(),
      createdDate: resumeData?.['createdDate'] || new Date(),
    });

    for(const key of keys){
      if(resume[key]){
        if(Array.isArray(resume[key])){
          this.updateSubCollection(id, key, resume);
        } else {
          const subResumeRef = doc(this.firestore, 'resumes', id, 'resume', key);
          await setDoc(subResumeRef, resume[key]);
        }
      }
    }
  }

  @AsyncHandler({
    errorMessage: 'Failed to delete resume',
    successMessage: 'Resume deleted successfully',
    loadingProperty: 'loading',
  })
  async deleteResume(id: string) {
    const resumeRef = doc(this.firestore, 'resumes', id);
    const resumeCollection = collection(this.firestore, 'resumes', id, 'resume');
    const resumeSnapshot = await getDocs(resumeCollection);
    await Promise.all(resumeSnapshot.docs.map(doc => deleteDoc(doc.ref)));
    await deleteDoc(resumeRef);
    return;
  }

  private async loadSubCollection(id: string, docId: string, collectionName: string) {
    const subCollectionRef = collection(this.firestore,'resumes', id, 'resume', docId, collectionName);
    const subCollectionSnapshot = await getDocs(subCollectionRef);
    return subCollectionSnapshot.docs.map(doc => doc.data());
  }

  private async updateSubCollection(id: string, key: keyof typeof resume, resume: ResumeData) {
    if(Array.isArray(resume[key])){
      const listRef = collection(this.firestore, 'resumes', id, 'resume', key, `${key}List`);
      const existing = await getDocs(listRef);
      await Promise.all(existing.docs.map(docSnap => deleteDoc(docSnap.ref)));
      await Promise.all( resume[key].map(el => setDoc(doc(listRef), el)));
      const parentDocRef = doc(this.firestore, 'resumes', id, 'resume', key);
      await setDoc(parentDocRef, { lastModificationDate: new Date() }, { merge: true });
    }
  }

  private getEmptyResume(): ResumeData {
    return {
      education: [],
      employment: [],
      hobbies: { description: '' },
      languages: [],
      skills: [],
      websites: { github: '', linkedin: '' },
      personalDetails: {
        city: '',
        country: '',
        email: '',
        name: '',
        phone: '',
        position: '',
        summary: '',
        surname: ''
      }
    }
  }
}
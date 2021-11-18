import {
    Project,
    Specification,
    SpecificationState,
    Counts,
    SpecificationResult
} from "./Specifications";
import exp from "constants";
import {ProjectReducer} from "./ProjectReducer";

const initialData = {
    type: 'initial',
    name: 'My Testing Project',
    specs: [
        {title: 'The first spec', id: '1', suite: 'Folder 1'},
        {title: 'The second spec', id: '2', suite: 'Folder 1'},
        {title: 'The third spec', id: '3', suite: 'Folder 2'},
        {title: 'The fourth spec', id: '4', suite: 'Folder 3'},
        {title: 'The fifth spec', id: '5', suite: 'Folder 3'},
        {title: 'The sixth spec', id: '6', suite: 'Folder 3'}
    ]
}

describe('Counts', () => {
    it('has no results', () => {
        expect(new Counts().result()).toBe(SpecificationResult.None);
    });

    it('has a failure', () => {
        const counts = new Counts();
        counts.wrongs = 1;
        
        expect(counts.result()).toBe(SpecificationResult.Failed);
    });

    it('has only rights', () => {
        const counts = new Counts();
        counts.rights = 5;

        expect(counts.result()).toBe(SpecificationResult.Success);
    });

    it('has only exceptions', () => {
        const counts = new Counts();
        counts.exceptions = 1;

        expect(counts.result()).toBe(SpecificationResult.Failed);
    });

    it('has wrongs and exceptions', () => {
        const counts = new Counts();
        counts.exceptions = 1;
        counts.wrongs = 1;

        expect(counts.result()).toBe(SpecificationResult.Failed);
    });
});

describe('Specification', () => {
   let spec: Specification;
   
   beforeEach(() => {
       spec = new Specification('Good one', 'one');
   });
   
   it('has initial state of None', () => {
       expect(spec.state).toBe(SpecificationState.None);
   });
    
    
});

describe('ProjectReducer', () => {
   
    describe('When setting up the initial state', () => {
       const project = ProjectReducer(new Project(), initialData);
       
       it('has the project name', () => {
           expect(project.name).toBe(initialData.name);
       });
       
       it('has the expected number of suites', () => {
          expect(project.suites.size).toBe(3); 
       });
       
       it('has the right number of specifications', () => {
          expect(project.specs.size).toBe(6); 
       });
       
    });
});

test('And we are working', () => {
   expect(true).toBe(true); 
});

test('Specification state', () => {
    
});


export enum SpecificationState {
    None,
    Running,
    Queued
}

export enum SpecificationResult{
    None,
    Success,
    Failed
}

export class Counts {
    rights: number;
    wrongs: number;
    exceptions: number;
}

export class Specification {
    title: string;
    id: string;
    progress: number;
    total: number;
    state: SpecificationState;
    
    constructor(title: string, id: string){
        this.title = title;
        this.id = id;
        this.state = SpecificationState.None;
    }
    
    // TODO -- figure out state!
}

export class Project {
    specs: Map<string, Specification>;
    suites: Map<string, Suite>;
    name: string;
    
    constructor(name: string) {
        this.name = name;
        this.specs = new Map<string, Specification>();
        this.suites = new Map<string, Suite>();
    }

    add(spec: Specification, suite: string) {
        this.specs.set(spec.id, spec);
        this.suites[suite].add(spec);
    }
    
    changeState(id: string, state: SpecificationState){
        this.specs[id].state = state;
    }
    
    recordCompletion(id: string, counts: Counts){
        this.specs[id].counts = counts;
        this.specs[id].state = SpecificationState.None;
    }

    recordProgress(id: string, counts: Counts, progress: number, total: number) {
        var spec = this.specs[id];
        spec.counts = counts;
        spec.progress = progress;
        spec.total = total;
    }
}

export class Suite {
    specs: Specification[];
    children: Map<string, Suite>;

    constructor() {
        this.specs = [];
        this.children = new Map<string, Suite>();
    }
    
    add(spec: Specification){
        this.specs.push(spec);
    }
}

const initialData = {
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

function buildProject(data: any) : Project{
    const project = new Project(data.name);

    for (let i = 0; i < data.specs.length; i++) {
        const element = data.specs[i];
        const spec = new Specification(element.title, element.id);
        project.add(spec, element.suite);
    }

    
    return project;
}
 
type Action =
    | {type: "initial", data: any}
    | {type: "spec-queued", id: string}
    | {type: "spec-started", id: string, steps: number}
    | {type: "spec-finished", id: string, counts: Counts}
    | {type: "spec-progress", id: string, counts: Counts, progress: number, total: number}

export function ProjectReducer(state: Project, action: Action) : Project {
    switch (action.type){
        case 'initial':
            return buildProject(action);
            
        case 'spec-queued':
            state.changeState(action.id, SpecificationState.Queued);
            return state;
            
        case 'spec-started':
            state.changeState(action.id, SpecificationState.Running);
            return state;
            
        case 'spec-finished': 
            state.recordCompletion(action.id, action.counts);
            return state;
            
        case 'spec-progress':
            state.recordProgress(action.id, action.counts, action.progress, action.total);
            return state;
    }
    
    return state;
}


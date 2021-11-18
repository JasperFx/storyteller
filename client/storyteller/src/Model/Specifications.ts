
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
    rights: number = 0;
    wrongs: number = 0;
    exceptions: number = 0;
    
    constructor(rights: number, wrongs: number, exceptions: number){
        this.rights = rights;
        this.wrongs = wrongs;
        this.exceptions = exceptions;
    }

    result() : SpecificationResult {
        if (this.wrongs > 0 || this.exceptions > 0) return SpecificationResult.Failed;
        
        if (this.rights > 0) return SpecificationResult.Success;
        
        return SpecificationResult.None;
    }
}

export class Specification {
    title: string;
    id: string;
    progress: number = 0;
    total: number = 0;
    state: SpecificationState;
    counts: Counts = new Counts(0, 0, 0);
    
    constructor(title: string, id: string){
        this.title = title;
        this.id = id;
        this.state = SpecificationState.None;
    }
    
    // TODO -- figure out state!


    result() : SpecificationResult{
        return this.counts.result();
    }

    changeState(state: SpecificationState, counts: Counts){
        this.state = state;
        this.counts = counts;
    }

    recordProgress(counts: Counts, progress: number, total: number){
        this.counts = counts;
        this.progress = progress;
        this.total = total;
    }
}

export class Project {
    specs = new Map<string, Specification>();
    suites = new Map<string, Suite>();
    name: string;
    
    constructor(name: string) {
        this.name = name;
        this.suites = new Map<string, Suite>();
        this.specs = new Map<string, Specification>();
    }


    add(spec: Specification, suite: string) {
        this.specs.set(spec.id, spec);
        if (!this.suites.has(suite)){
            const container = new Suite(suite);
            this.suites.set(suite, container);
            container.add(spec);
        }
        else{
            this.suites.get(suite)?.add(spec);
        }
    }
    
    changeState(id: string, state: SpecificationState){
        const spec = this.specs.get(id);
        spec?.changeState(state, new Counts(0, 0, 0));
    }
    
    recordCompletion(id: string, counts: Counts){
        const spec = this.specs.get(id);
        spec?.changeState(SpecificationState.None, counts);
    }

    recordProgress(id: string, counts: Counts, progress: number, total: number) {
        const spec = this.specs.get(id);
        spec?.recordProgress(counts, progress, total);
    }
}

export class Suite {
    specs: Specification[];
    children: Map<string, Suite>;
    path: string;

    constructor(path: string) {
        this.path = path;
        this.specs = [];
        this.children = new Map<string, Suite>();
    }
    
    add(spec: Specification){
        this.specs.push(spec);
    }
}





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

    result() : SpecificationResult {
        if (this.wrongs > 0 || this.exceptions > 0) return SpecificationResult.Failed;
        
        if (this.rights > 0) return SpecificationResult.Success;
        
        return SpecificationResult.None;
    }
}

export class Specification {
    title: string;
    id: string;
    progress: number;
    total: number;
    state: SpecificationState;
    counts: Counts;
    
    constructor(title: string, id: string){
        this.title = title;
        this.id = id;
        this.state = SpecificationState.None;
    }
    
    // TODO -- figure out state!
}

export class Project {
    specs = new Map<string, Specification>();
    suites = new Map<string, Suite>();
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    result() : SpecificationResult{
        if (!this.counts) return SpecificationResult.None;
        
        return this.counts.result();
    }

    add(spec: Specification, suite: string) {
        this.specs.set(spec.id, spec);
        if (!this.suites.has(suite)){
            this.suites.set(suite, new Suite(suite));
        }
        
        this.suites.get(suite).add(spec);
    }
    
    changeState(id: string, state: SpecificationState){
        const spec = this.specs.get(id);
        spec.counts = new Counts();
        spec.state = state;
    }
    
    recordCompletion(id: string, counts: Counts){
        const spec = this.specs.get(id);
        spec.counts = counts;
        spec.state = SpecificationState.None;
    }

    recordProgress(id: string, counts: Counts, progress: number, total: number) {
        const spec = this.specs.get(id);
        spec.counts = counts;
        spec.progress = progress;
        spec.total = total;
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




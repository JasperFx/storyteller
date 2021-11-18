import {Counts, Project, Specification, SpecificationState} from "./Specifications";

function buildProject(data: any): Project {
    const project = new Project(data.name);

    console.log(data.name);
    console.log(project.name);

    for (let i = 0; i < data.specs.length; i++) {
        const element = data.specs[i];
        const spec = new Specification(element.title, element.id);
        project.add(spec, element.suite);
    }


    return project;
}

type Action =
    | { type: "initial", name: string, specs: [{ title: string, id: string, suite: string }] }
    | { type: "spec-queued", id: string }
    | { type: "spec-started", id: string, steps: number }
    | { type: "spec-finished", id: string, counts: Counts }
    | { type: "spec-progress", id: string, counts: Counts, progress: number, total: number }

export function ProjectReducer(state: Project, action: Action): Project {
    switch (action.type) {
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
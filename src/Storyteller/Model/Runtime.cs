using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Storyteller.Model
{
    public interface IExecutionContext
    {
        string SpecPath { get; }
        string FilePath { get; }
        
        // Timings?
        // Record outputs?
        // Expose a service locator?
        
        // Track counts and results
        
        // Expose extended logging
        
        IReadOnlyList<IExecutionStep> Steps { get; }

        TimeSpan Timeout { get; } 
    }
    
    // What used to be IExecutionContext Before/AfterSpecification() should just be additional IExecutionSteps
    public interface IExecutionStep
    {
        Task Execute(IExecutionContext context, CancellationToken token);
        string NodePath { get; }
    }

    public interface IContinuationRule
    {
        bool ShouldStop(IExecutionContext context, IExecutionStep lastStep);
    }

    public class Executor
    {
        private readonly IContinuationRule[] _rules;

        public Executor(IContinuationRule[] rules)
        {
            _rules = rules;
        }

        public async Task Execute(IExecutionContext context)
        {
            var cancellation = new CancellationTokenSource();
            cancellation.CancelAfter(context.Timeout);

            foreach (var step in context.Steps)
            {
                if (cancellation.IsCancellationRequested) break;

                try
                {
                    // TODO -- do the timings here. Put the timing on the step result here. No special timings?
                    await step.Execute(context, cancellation.Token);
                }
                catch (Exception e)
                {
                    // TODO -- log exception
                    // add a result for the execution step
                }
            }
        }

        public bool ShouldStop(IExecutionContext context, IExecutionStep lastStep)
        {
            return _rules.Any(x => x.ShouldStop(context, lastStep));
        }

    }
}
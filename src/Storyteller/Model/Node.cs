using System.Collections.Generic;
using Baseline;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Storyteller.Model
{
    public enum NodeType
    {
        step,
        section,
        comment
    }
    
    public enum Lifecycle
    {
        Acceptance,
        Regression,
        Any
    }
    
    
    
    public static class SpecConstants
    {
        public const string MaxRetries = "max-retries";
        public const string LastUpdated = "last-updated";
        public const string Lifecycle = "lifecycle";
        public const string Tags = "tags";
        public const string Id = "id";
    }

    public class Specification
    {
        [JsonProperty("title")] public string name;
        
        // This should be derived
        [JsonProperty("path")]
        public string Path { get; internal set; }
        
        [JsonConverter(typeof (StringEnumConverter))] [JsonProperty(SpecConstants.Lifecycle)] public Lifecycle Lifecycle =
            Lifecycle.Acceptance;
        
        private string _fileName;

        [JsonIgnore]
        public string Filename
        {
            get => _fileName;
            set => _fileName = value.ToFullPath();
        }
        
        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("nodes")]
        public IList<Node> Nodes { get; set; } = new List<Node>();
    }
    
    
    /*
     * TODO -- derive paths
     *
     * 
     */
    public class Node
    {
        [JsonProperty("type")]
        public NodeType Type { get; set; }
        
        [JsonProperty("path")]
        public string Path { get; private set; }
        
        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("children")] 
        public IList<Node> Children { get; set; } = new List<Node>();
        
        [JsonProperty("cells")] 
        public readonly IDictionary<string, string> Values = new Dictionary<string, string>();
    }
}
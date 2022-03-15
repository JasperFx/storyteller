# storyteller
Automated Testing and BDD Tooling for .Net

## This will *maybe* be the Storyteller v6 code, and an effective rewrite of https://storyteller.github.io




## Possible Syntax

### Retries

On just about any kind of grammar:

```
[Step("text", retries = 3]
```

Finer grained retries might be valuable


### Facts

```csharp
[Fact("some descriptive text")]
public bool SomeMethod(){}

// or

[Fact("some descriptive text")]
public Task<bool> SomeMethod(){}

```

### Waiters

ST would call this method at intervals until it's true, or times out

```csharp
[Wait("descriptive text", interval=250, timeout = 3]
public bool SomeMethod(){}

// or

[Wait("some descriptive text")]
public Task<bool> SomeMethod(){}

// and also

[Wait("After the measure reaches {measure}")]
public Task<int> WaitUntilThisValue(){

}

```

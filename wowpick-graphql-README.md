# RF2

This project was generated using [Nx](https://nx.dev).

<details>
  <summary>NestJs Dev Reference!</summary>  
</details>
<details>
  <summary>How configuration for different environments setup</summary>
  <h5> config value order of precedence is as follows </h5>
  <ol>
    <li>node process environment variable</li>
    <li>environment specific config file environment.{env}.ts</li>
    <li>base config file environment.base.ts</li>
  </ol>
  <h5> config files will be located under src/app/environments/</h5>  
  <ol>  
  <li>environment.base.ts</li><label>can have configuration entry that common for all environments or configuration with default value. values within this file can be overwritten in environment specific file environment.{env}.ts  </label>
  <li>environment.ts</li><label>configuration specific to local development</label>
  <li>environment.devaas.ts</li>
  <li>environment.uataae.ts</li>
  <li>environment.uataas.ts</li>  
  <li>environment.ptaae.ts</li>
  <li>environment.ptaas.ts</li>  
  <li>environment.prodaae.ts</li>
  <li>environment.prodaas.ts</li>
</ol>   
</details>
<details>
  <summary>Sample graphql queries</summary>
  <h5>For Cache operations</h5>  
```python
  mutation resetCacheItem($userName: String, $branchNo: String){
  resetCacheItem(userName: $userName,branchNo: $branchNo){
    success
  }
 }
``` 
```python
  {
  "userName": "1759.12",
  "branchNo": "1759"
}
```
 <h5>For Mutation operations</h5>
</details>

## Application Documentation

# shorty
Open source URL shortener service.  Includes a resolver service that will translate a shortened URL to the expanded version, as well as an administrative API for management of URLs

This repository is broken into three parts:
|Directory|Description|
|--|--|
|shorty_ui|A Svelte application that serves as the front-end management application|
|shorty_resolver|Redirection service that translates a shortened URL to the long-form URL|
|shorty_api|RESTful API leveraged by shorty_ui to transact with the backend storage system|
|shorty_helm|A Helm chart for deploying the service to a Kubernetes cluster|

## Helm deployment:
```bash

helm command tbd

```
## the end
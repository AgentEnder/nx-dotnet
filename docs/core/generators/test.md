---
title: '@nx-dotnet/core:test'
---

# @nx-dotnet/core:test

## NxDotnet Test Generator

Generate a .NET test project for an existing application or library

## Options

### <span className="required">targetProject</span>

- (string): The existing project to generate tests for

### <span className="required">testTemplate</span>

- (string): Which template should be used for creating the tests project?

Default: `"nunit"`

### language

- (string): Which language should the project use?

### namespaceName

- (string): The namespace for the project. If not provided, will be generated based on test project name / suffix.

### pathScheme

- (string): Determines if the project should follow NX or dotnet path naming conventions

Default: `"nx"`

### solutionFile

- (string): The name of the solution file to add the project to

- (boolean): Should the project be added to the default solution file?

### suffix

- (string): What suffix should be used for the tests project name?

### testProjectName

- (string): What name should be used for the tests project?

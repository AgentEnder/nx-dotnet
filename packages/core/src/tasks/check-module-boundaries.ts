import {
  createProjectGraphAsync,
  ProjectConfiguration,
  ProjectsConfigurations,
  readProjectsConfigurationFromProjectGraph,
  Tree,
  workspaceRoot,
} from '@nx/devkit';

import { relative } from 'path';

import {
  getDependantProjectsForNxProject,
  ModuleBoundaries,
  readConfig,
} from '@nx-dotnet/utils';

export async function checkModuleBoundariesForProject(
  project: string,
  projects: Record<string, ProjectConfiguration>,
): Promise<string[]> {
  const projectRoot = projects[project].root;
  const tags = projects[project].tags ?? [];
  if (!tags.length) {
    return [];
  }
  const configuredConstraints = await loadModuleBoundaries(projectRoot);
  const relevantConstraints = configuredConstraints.filter(
    (x) =>
      ((x.sourceTag && tags.includesWithWildcards(x.sourceTag)) ||
        (x.allSourceTags &&
          x.allSourceTags.every((tag) => tags.includesWithWildcards(tag)))) &&
      (!x.onlyDependOnLibsWithTags?.includes('*') ||
        x.notDependOnLibsWithTags?.length),
  );
  if (!relevantConstraints.length) {
    return [];
  }

  const violations: string[] = [];
  getDependantProjectsForNxProject(
    project,
    { version: 2, projects },
    (configuration, name, implicit) => {
      if (implicit) return;
      const dependencyTags = configuration?.tags ?? [];
      for (const constraint of relevantConstraints) {
        if (
          !dependencyTags.some((x) =>
            constraint.onlyDependOnLibsWithTags?.includesWithWildcards(x),
          ) ||
          dependencyTags.some((x) =>
            constraint.notDependOnLibsWithTags?.includesWithWildcards(x),
          )
        ) {
          violations.push(
            `${project} cannot depend on ${name}. Project tag ${JSON.stringify(
              constraint,
            )} is not satisfied.`,
          );
        }
      }
    },
  );
  return violations;
}

/**
 * Loads module boundaries from eslintrc or .nx-dotnet.rc.json
 * @param root Which file should be used when pulling from eslint
 * @returns List of module boundaries
 */
export async function loadModuleBoundaries(
  root: string,
  host?: Tree,
): Promise<ModuleBoundaries> {
  const configured = readConfig(host).moduleBoundaries;
  if (!configured) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ESLint }: typeof import('eslint') = require('eslint');
      const result = await new ESLint()
        .calculateConfigForFile(`${root}/non-existant.ts`)
        .catch(() =>
          Promise.resolve({
            rules: { '@nx/enforce-module-boundaries': [] },
          }),
        );
      const [, moduleBoundaryConfig] =
        result.rules['@nx/enforce-module-boundaries'] ||
        result.rules['@nrwl/nx/enforce-module-boundaries'] ||
        [];
      return moduleBoundaryConfig?.depConstraints ?? [];
    } catch {
      return [];
    }
  } else {
    return configured;
  }
}

function findProjectGivenRoot(
  root: string,
  projects: ProjectsConfigurations['projects'],
): string {
  // Note that this returns the first matching project and would succeed for multiple (cs|fs...)proj under an nx project path,
  // but getProjectFileForNxProject explicitly throws if it's not exactly one.
  const normalizedRoot = root.replace(/^["'](.+(?=["']$))["']$/, '$1');
  const [projectName] =
    Object.entries(projects).find(([, projectConfig]) => {
      const relativePath = relative(projectConfig.root, normalizedRoot);
      return relativePath?.startsWith('..') === false;
    }) ?? [];

  if (projectName) {
    return projectName;
  } else {
    console.error(
      `Failed to find nx workspace project associated with dotnet project directory: ${root}`,
    );
    process.exit(1);
  }
}

function includesWithWildcards(input: string, pattern: string): boolean {
  if (pattern.includes('*')) {
    const searchParts = pattern.split('*');
    let lastIndex = 0;
    for (const part of searchParts) {
      const index = input.indexOf(part, lastIndex);
      if (index === -1) {
        return false;
      }
      lastIndex = index + part.length;
    }
    return true;
  } else {
    return input.includes(pattern);
  }
}

declare global {
  interface String {
    includesWithWildcards(pattern: string): boolean;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    includesWithWildcards(pattern: string): boolean;
  }
}
String.prototype.includesWithWildcards = function (
  this: string,
  pattern: string,
): boolean {
  return includesWithWildcards(this, pattern);
};

Array.prototype.includesWithWildcards = function (
  this: string[],
  pattern: string,
): boolean {
  return this.some((x) => includesWithWildcards(x, pattern));
};

async function main() {
  const parser = await import('yargs-parser');
  const { project, projectRoot } = parser(process.argv.slice(2), {
    alias: {
      project: 'p',
    },
    string: ['project', 'projectRoot'],
  }) as { project?: string; projectRoot?: string };
  const graph = await createProjectGraphAsync();
  const { projects }: ProjectsConfigurations =
    readProjectsConfigurationFromProjectGraph(graph);

  // Find the associated nx project for the msbuild project directory.
  const nxProject: string =
    project ?? findProjectGivenRoot(projectRoot as string, projects);

  console.log(`Checking module boundaries for ${nxProject}`);
  const violations = await checkModuleBoundariesForProject(nxProject, projects);
  if (violations.length) {
    violations.forEach((error) => {
      console.error(error);
    });
    process.exit(1);
  }
  process.exit(0);
}

if (require.main === module) {
  process.chdir(workspaceRoot);
  main();
}

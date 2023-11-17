import { ExecutorContext } from '@nx/devkit';

import * as semver from 'semver';

import { DotNetClient, dotnetFactory } from '@nx-dotnet/dotnet';
import {
  getExecutedProjectConfiguration,
  getProjectFileForNxProject,
  readInstalledDotnetToolVersion,
} from '@nx-dotnet/utils';

import { FormatExecutorSchema } from './schema';

function normalizeOptions(
  options: FormatExecutorSchema,
  isNet6OrHigher: boolean,
): Record<string, string | boolean | undefined> {
  const { diagnostics, include, exclude, check, fix, ...flags } = options;

  const result = {
    ...flags,
    diagnostics: Array.isArray(diagnostics)
      ? diagnostics.join(' ')
      : diagnostics,
    include: Array.isArray(include) ? include.join(' ') : include,
    exclude: Array.isArray(exclude) ? exclude.join(' ') : exclude,
  };

  // Specifying --verify-no-changes false does not work, so we only add the switch when we want to run the check only
  if (!fix && check) {
    if (isNet6OrHigher) {
      return { ...result, verifyNoChanges: true };
    }
    return { ...result, check: true }; // The --check flag is for .NET 5 and older
  }

  return result;
}

export default async function runExecutor(
  options: FormatExecutorSchema,
  context: ExecutorContext,
  dotnetClient: DotNetClient = new DotNetClient(dotnetFactory()),
) {
  const sdkVersion = dotnetClient.getSdkVersion();
  const forceToolUsage = semver.satisfies(sdkVersion, '6.0.0 - 6.0.203');
  const majorVersion = semver.major(sdkVersion);

  const nxProjectConfiguration = getExecutedProjectConfiguration(context);
  const projectFilePath = await getProjectFileForNxProject(
    nxProjectConfiguration,
  );

  const normalized = normalizeOptions(options, majorVersion >= 6);

  if (forceToolUsage || majorVersion < 6) {
    ensureFormatToolInstalled(context, dotnetClient, majorVersion);
  }
  dotnetClient.format(projectFilePath, normalized, forceToolUsage);

  return {
    success: true,
  };
}

function ensureFormatToolInstalled(
  context: ExecutorContext,
  dotnetClient: DotNetClient,
  majorVersion: number,
) {
  if (readInstalledDotnetToolVersion('dotnet-format')) {
    // dotnet-format is already installed.
    return;
  }

  if (majorVersion === 6) {
    dotnetClient.installTool(
      'dotnet-format',
      '6.*',
      'https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet6/nuget/v3/index.json',
    );
  } else if (majorVersion === 7) {
    dotnetClient.installTool(
      'dotnet-format',
      '7.*',
      'https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet7/nuget/v3/index.json',
    );
  } else {
    dotnetClient.installTool('dotnet-format');
  }
}

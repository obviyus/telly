import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";

async function bytesInPath(
  target: string,
  visited: Set<string>,
  exclude: (value: string) => boolean = () => false,
): Promise<number> {
  const resolved = await realpath(target);
  if (visited.has(resolved) || exclude(resolved)) return 0;
  visited.add(resolved);
  const stat = await lstat(resolved);
  if (stat.isFile()) return stat.size;
  if (!stat.isDirectory()) return 0;
  const entries = await readdir(resolved);
  let total = 0;
  for (const entry of entries) {
    total += await bytesInPath(path.join(resolved, entry), visited, exclude);
  }
  return total;
}

async function packageClosureBytes(
  root: string,
  names: ReadonlyArray<string>,
): Promise<number> {
  const queue = [...names];
  const packages = new Set<string>();
  const visited = new Set<string>();
  let total = 0;
  while (queue.length > 0) {
    const name = queue.shift();
    if (name === undefined || packages.has(name)) continue;
    packages.add(name);
    const directory = path.join(root, "node_modules", name);
    const packageRoot = await realpath(directory);
    const manifest = JSON.parse(await readFile(path.join(directory, "package.json"), "utf8"));
    queue.push(...Object.keys(manifest.dependencies ?? {}));
    total += await bytesInPath(
      packageRoot,
      visited,
      (value) => value !== packageRoot && path.basename(value) === "node_modules",
    );
  }
  return total;
}

export async function measurePackageBytes(repoRoot: string) {
  const rootManifest = JSON.parse(await readFile(path.join(repoRoot, "package.json"), "utf8"));
  const tellyOwn = await bytesInPath(path.join(repoRoot, "dist"), new Set());
  const tellyDependencies = await packageClosureBytes(
    repoRoot,
    Object.keys(rootManifest.dependencies ?? {}),
  );
  const grammyRoot = path.join(repoRoot, "benchmarks/runners/grammy");
  const grammyDependencies = await packageClosureBytes(grammyRoot, ["grammy"]);
  const puregramRoot = path.join(repoRoot, "benchmarks/runners/puregram");
  const puregramDependencies = await packageClosureBytes(puregramRoot, ["puregram"]);
  const pythonRoot = path.join(repoRoot, "benchmarks/runners/ptb/.venv/lib");
  const pythonVersions = await readdir(pythonRoot);
  const sitePackages = path.join(
    pythonRoot,
    pythonVersions.find((entry) => entry.startsWith("python")) ?? "missing",
    "site-packages",
  );
  const pythonBytes = await bytesInPath(
    sitePackages,
    new Set(),
    (value) => value.includes("/__pycache__/") || value.endsWith(".pyc"),
  );
  return {
    grammy: grammyDependencies,
    puregram: puregramDependencies,
    "python-telegram-bot": pythonBytes,
    telly: tellyOwn + tellyDependencies,
  } as const;
}

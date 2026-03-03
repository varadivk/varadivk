// ambient module declarations for dependencies that aren't installed in this environment

// node built-in modules used in the project

declare module "fs" {
  const fs: any;
  export default fs;
}

declare module "path" {
  const path: any;
  export default path;
}

// minimal process namespace

declare namespace NodeJS {
  interface Process {
    cwd(): string;
  }
}

declare var process: NodeJS.Process;

// third-party packages without typings

declare module "gray-matter" {
  const matter: any;
  export default matter;
}

declare module "remark" {
  const remark: any;
  export { remark };
}

declare module "remark-html" {
  const html: any;
  export default html;
}

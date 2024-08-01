import esbuild from 'esbuild'
import pkg from './package.json'
import fs from 'fs'
import childProcess from 'child_process'

// remove dist folder
fs.rmdirSync('dist', { recursive: true })
console.log(`Cleaned up dist directory`)

const peerDeps = Object.keys(pkg.peerDependencies || {})
const devDeps = Object.keys(pkg.devDependencies || {})

const external = [...peerDeps, ...devDeps]

// Module build for production
esbuild.buildSync({
  format: 'esm',
  entryPoints: ['src/index.ts'],
  outfile: pkg.module,
  minify: true,
  sourcemap: true,
  bundle: true,
  external,
})
console.log(`Built module to ${pkg.module}`)

// CommonJS build for production
esbuild.buildSync({
  format: 'cjs',
  entryPoints: ['src/index.ts'],
  outfile: pkg.main,
  minify: true,
  sourcemap: true,
  bundle: true,
  external,
})
console.log(`Built CommonJS to ${pkg.main}`)

// build declaration file
childProcess.execSync('tsc')
console.log(`Built declaration files to ${pkg.types}`)
import esbuild from 'esbuild'
import pkg from './package.json'
import fs from 'fs'

// remove dist folder
fs.rmdirSync('dist', { recursive: true })
console.log(`Cleaned up dist directory`)

const deps = Object.keys(pkg.dependencies || {})
const peerDeps = Object.keys(pkg.peerDependencies || {})
const devDeps = Object.keys(pkg.devDependencies || {})

const external = [...deps, ...peerDeps, ...devDeps]

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
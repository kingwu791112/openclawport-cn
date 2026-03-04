#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

// ---------------------------------------------------------------------------
// Resolve package root (where app/, lib/, etc. live)
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url)
const PKG_ROOT = resolve(dirname(__filename), '..')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const NEXT_BIN = resolve(PKG_ROOT, 'node_modules', '.bin', 'next')

const green = (s) => `\x1b[32m${s}\x1b[0m`
const yellow = (s) => `\x1b[33m${s}\x1b[0m`
const red = (s) => `\x1b[31m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`
const bold = (s) => `\x1b[1m${s}\x1b[0m`

function run(cmd, args = []) {
  const child = spawn(cmd, args, {
    cwd: PKG_ROOT,
    stdio: 'inherit',
    shell: true,
  })
  child.on('close', (code) => process.exit(code ?? 0))
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

function showHelp() {
  console.log(`
${bold('ClawPort')} -- AI Agent Dashboard

${bold('Usage:')} clawport <command>

${bold('Commands:')}
  ${green('dev')}      Start the development server (next dev)
  ${green('start')}    Build and start the production server
  ${green('setup')}    Run the setup wizard (auto-detect OpenClaw config)
  ${green('status')}   Check gateway reachability and current config
  ${green('help')}     Show this help message

${bold('Examples:')}
  ${dim('$ clawport setup     # Configure your OpenClaw connection')}
  ${dim('$ clawport dev       # Start dev server on localhost:3000')}
  ${dim('$ clawport status    # Check if gateway is reachable')}

${dim(`Package root: ${PKG_ROOT}`)}
`)
}

function cmdDev() {
  console.log(`\n  ${bold('Starting ClawPort dev server...')}\n`)
  run(NEXT_BIN, ['dev'])
}

function cmdStart() {
  console.log(`\n  ${bold('Building and starting ClawPort...')}\n`)
  run(NEXT_BIN, ['build', '&&', NEXT_BIN, 'start'])
}

function cmdSetup() {
  console.log()
  run('node', [resolve(PKG_ROOT, 'scripts/setup.mjs'), `--cwd=${PKG_ROOT}`])
}

function cmdStatus() {
  console.log()
  console.log(bold('  ClawPort Status'))
  console.log()

  // Check gateway
  let gatewayUp = false
  try {
    const result = execSync(
      'curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:18789/ 2>/dev/null',
      { encoding: 'utf-8', timeout: 5000 }
    ).trim()
    gatewayUp = result && result !== '000'
  } catch {
    // gateway not reachable
  }

  if (gatewayUp) {
    console.log(`  ${green('+')} Gateway reachable at ${dim('localhost:18789')}`)
  } else {
    console.log(`  ${red('x')} Gateway not responding at ${dim('localhost:18789')}`)
    console.log(`    ${dim('Start it with: openclaw gateway run')}`)
  }

  // Check .env.local
  const envPath = resolve(PKG_ROOT, '.env.local')
  console.log()
  if (existsSync(envPath)) {
    console.log(`  ${green('+')} .env.local found`)
    const content = readFileSync(envPath, 'utf-8')
    const lines = content.split('\n').filter((l) => l && !l.startsWith('#'))
    for (const line of lines) {
      const [key, ...rest] = line.split('=')
      const value = rest.join('=')
      if (key === 'OPENCLAW_GATEWAY_TOKEN' && value) {
        console.log(`    ${dim(key)}=${dim(value.slice(0, 8) + '...' + value.slice(-4))}`)
      } else if (key && value) {
        console.log(`    ${dim(key)}=${dim(value)}`)
      }
    }
  } else {
    console.log(`  ${yellow('!')} No .env.local found`)
    console.log(`    ${dim('Run: clawport setup')}`)
  }

  console.log()
  console.log(`  ${dim(`Package root: ${PKG_ROOT}`)}`)
  console.log()
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const command = process.argv[2]

switch (command) {
  case 'dev':
    cmdDev()
    break
  case 'start':
    cmdStart()
    break
  case 'setup':
    cmdSetup()
    break
  case 'status':
    cmdStatus()
    break
  case 'help':
  default:
    showHelp()
    break
}

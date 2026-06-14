---
title: wsl安装hermes过程分析
date: 2026-06-06 15:09:18
categories:
  - 人工智能
  - 智能体
  - hermes
tags:
  - hermes
toc: true
---

## 安装uv

Detected: linux (ubuntu)

Installing managed `uv` into `/home/codezsx/.hermes/bin` ...

Managed `uv` installed (`uv 0.11.19` (`x86_64-unknown-linux-gnu`))

## 安装python-3.11

Checking Python 3.11...

Python 3.11 not found, installing via uv...

Installed `Python 3.11.15` in 19.29s

`cpython-3.11.15-linux-x86_64-gnu` (python3.11)

warning: `/home/codezsx/.local/bin` is not on `your PATH`.

To use installed Python executables, run `export PATH="/home/codezsx/.local/bin:$PATH"` or `uv python update-shell`.

Python installed: `Python 3.11.15`

## 安装git

Checking Git...

Git 2.43.0 found

## 安装nodejs

Checking `Node.js` (for browser tools)...

`Node.js` not found — installing `Node.js 22 LTS`...

Downloading `node-v22.22.3-linux-x64.tar.xz`...

Extracting to `~/.hermes/node/`...

`Node.js v22.22.3` installed to `~/.hermes/node/`

## 检查互联网连接

Checking `internet connectivity` for package install and web tools...

`Internet connectivity` looks good

> 检查互联网连接的情况。

## 安装ripgrep和ffmpeg

Checking `ripgrep` (fast file search)...

Checking `ffmpeg` (TTS voice messages)...

`sudo` is needed ONLY to install `optional system packages` (ripgrep ffmpeg) via `your package manager`.

Hermes Agent itself does not require or retain root access.

Install `ripgrep` for faster file search `ffmpeg` for `TTS voice messages`? [Y/n] Y

[sudo] password for codezsx:

Reading `package lists`... Done

Building `dependency tree`... Done

Reading `state information`... Done

No apt package "ffmpeg", but there is a `snap` with that name.

Try "snap install ffmpeg"

No apt package "ripgrep", but there is a `snap` with that name.

Try "snap install ripgrep"

E: Unable to locate package ripgrep

E: Unable to locate package ffmpeg

⚠ ripgrep not installed (file search will use `grep` fallback)

→ To install ripgrep manually:

→ `sudo apt install ripgrep`

⚠ ffmpeg not installed (TTS voice messages will be `limited`)

→ To install ffmpeg manually:

→ `sudo apt install ffmpeg`

## 下载hermes-agent代码

→ Installing to `/home/codezsx/.hermes/hermes-agent`...

→ Trying SSH clone...

→ SSH failed, trying HTTPS...

Cloning into '/home/codezsx/.hermes/hermes-agent'...

remote: Enumerating objects: 5460, done.

remote: Counting objects: 100% (5460/5460), done.

remote: Compressing objects: 100% (5152/5152), done.

remote: Total 5460 (delta 130), reused 4944 (delta 127), pack-reused 0 (from 0)

Receiving objects: 100% (5460/5460), 48.24 MiB | 3.53 MiB/s, done.

Resolving deltas: 100% (130/130), done.

✓ Cloned via HTTPS

✓ Repository ready

## 创建虚拟环境

→ Creating virtual environment with Python 3.11...

Using CPython 3.11.15

Creating virtual environment at: venv

Activate with: ==source venv/bin/activate==

✓ Virtual environment ready (Python 3.11)

## 安装python依赖

→ Installing dependencies...

→ Some build tools may be needed for Python packages...

W: Failed to fetch http://archive.ubuntu.com/ubuntu/dists/noble/InRelease  Temporary failure resolving 'archive.ubuntu.com'

W: Failed to fetch http://archive.ubuntu.com/ubuntu/dists/noble-updates/InRelease  Temporary failure resolving 'archive.ubuntu.com'

W: Failed to fetch http://archive.ubuntu.com/ubuntu/dists/noble-backports/InRelease  Temporary failure resolving 'archive.ubuntu.com'

W: Failed to fetch http://security.ubuntu.com/ubuntu/dists/noble-security/InRelease  Temporary failure resolving 'security.ubuntu.com'

W: Some index files failed to download.

They have been ignored, or old ones used instead.

✓ Build tools installed

----

→ Trying tier: hash-verified (uv.lock) ...

→ (this resolves + downloads the curated [all] set — first run on a

→  fresh venv can take 1-5 minutes; uv prints progress below)
Resolved 219 packages in 1ms Built hermes-agent @ file:///home/codezsx/.hermes/hermes-agent

Prepared 93 packages in 17.07s

Installed 93 packages in 63ms

+ agent-client-protocol==0.9.0

+ aiohappyeyeballs==2.6.1

+ aiohttp==3.13.3

+ aiosignal==1.4.0

+annotated-doc==0.0.4

+annotated-types==0.7.0

+anyio==4.12.1

+attrs==25.4.0

+certifi==2026.2.25

+cffi==2.0.0

+charset-normalizer==3.4.4

+click==8.3.1

+croniter==6.0.0

+cryptography==46.0.7

+defusedxml==0.7.1

+distro==1.9.0

+fastapi==0.133.1

+fire==0.7.1

+frozenlist==1.8.0

+google-api-core==2.30.3

+google-api-python-client==2.194.0

+google-auth==2.49.2

+google-auth-httplib2==0.3.1

+google-auth-oauthlib==1.3.1

+googleapis-common-protos==1.73.0

+h11==0.16.0

+hermes-agent==0.16.0(fromfile:///home/codezsx/.hermes/hermes-agent)

+httpcore==1.0.9

+httplib2==0.31.2

+httptools==0.7.1

+httpx==0.28.1

+httpx-sse==0.4.3

+idna==3.15

+jinja2==3.1.6

+jiter==0.13.0

+jsonschema==4.26.0

+jsonschema-specifications==2025.9.1

+markdown==3.10.2

+markdown-it-py==4.0.0

+markupsafe==3.0.3

+mcp==1.26.0

+mdurl==0.1.2

+multidict==6.7.1

+oauthlib==3.3.1

+openai==2.24.0

+pathspec==1.1.1

+prompt-toolkit==3.0.52

+propcache==0.4.1

+proto-plus==1.27.2

+protobuf==6.33.5

+psutil==7.2.2

+ptyprocess==0.7.0

+pyasn1==0.6.3

+pyasn1-modules==0.4.2

+pycparser==3.0

+pydantic==2.13.4

+pydantic-core==2.46.4

+pydantic-settings==2.13.1

+pygments==2.19.2

+pyjwt==2.12.1

+pyparsing==3.3.2

+python-dateutil==2.9.0.post0

+python-dotenv==1.2.2

+python-multipart==0.0.27

+pytz==2025.2

+pyyaml==6.0.3

+referencing==0.37.0

+requests==2.33.0

+requests-oauthlib==2.0.0

+rich==14.3.3

+rpds-py==0.30.0

+ruamel-yaml==0.18.17

+ruamel-yaml-clib==0.2.15

+simple-term-menu==1.6.6

+six==1.17.0

+sniffio==1.3.1

+socksio==1.0.0

+sse-starlette==3.3.2

+starlette==1.0.1

+tenacity==9.1.4

+termcolor==3.3.0

+tqdm==4.67.3

+typing-extensions==4.15.0

+typing-inspection==0.4.2

+uritemplate==4.2.0

+urllib3==2.6.3

+uvicorn==0.41.0

+uvloop==0.22.1

+watchfiles==1.1.1

+wcwidth==0.6.0

+websockets==15.0.1

+yarl==1.22.0

+youtube-transcript-api==1.2.4

✓ Main package installed (hash-verified via uv.lock)

✓ All dependencies installed

## 安装nodejs依赖

→ Installing Node.js dependencies (browser tools)...

⚠ npm install failed (browser tools may not work)

✓ Node.js dependencies installed

→ Installing browser engine (Playwright Chromium)...

→ Installing Playwright Chromium with system dependencies...

----

Installing dependencies...

Switching to root user to install dependencies...

Ign:1 http://archive.ubuntu.com/ubuntu noble InRelease

Ign:2 http://security.ubuntu.com/ubuntu noble-security InRelease

Ign:3 http://archive.ubuntu.com/ubuntu noble-updates InRelease

Ign:2 http://security.ubuntu.com/ubuntu noble-security InRelease

Ign:4 http://archive.ubuntu.com/ubuntu noble-backports InRelease

Ign:2 http://security.ubuntu.com/ubuntu noble-security InRelease

Ign:1 http://archive.ubuntu.com/ubuntu noble InRelease

Err:2 http://security.ubuntu.com/ubuntu noble-security InRelease

Temporary failure resolving 'security.ubuntu.com'

Ign:3 http://archive.ubuntu.com/ubuntu noble-updates InRelease

Ign:4 http://archive.ubuntu.com/ubuntu noble-backports InRelease

Ign:1 http://archive.ubuntu.com/ubuntu noble InRelease

Ign:3 http://archive.ubuntu.com/ubuntu noble-updates InRelease

Ign:4 http://archive.ubuntu.com/ubuntu noble-backports InRelease

Err:1 http://archive.ubuntu.com/ubuntu noble InRelease

Temporary failure resolving 'archive.ubuntu.com'

Err:3 http://archive.ubuntu.com/ubuntu noble-updates InRelease

Temporary failure resolving 'archive.ubuntu.com'

Err:4 http://archive.ubuntu.com/ubuntu noble-backports InRelease

Temporary failure resolving 'archive.ubuntu.com'

Reading package lists... Done

Reading package lists... Done

Building dependency tree... Done

Reading state information... Done

Package `fonts-tlwg-loma-otf` is not available, but is referred to by another package.

This may mean that the package is missing, has been obsoleted, or is only available from another source

Package `fonts-ipafont-gothic` is not available, but is referred to by another package.

This may mean that the package is missing, has been obsoleted, or is only available from another source

Package `fonts-wqy-zenhei` is not available, but is referred to by another package.

This may mean that the package is missing, has been obsoleted, or is only available from another source

Failed to install browsers

Error: Installation process exited with code: 100

⚠ Playwright browser installation failed — browser tools will not work.

⚠ Try running manually: ==cd /home/codezsx/.hermes/hermes-agent && npx playwright install --with-deps chromium==

```
cd /home/codezsx/.hermes/hermes-agent && npx playwright install --with-deps chromium
```

✓ Browser engine setup complete

![](https://zsx-typora.oss-cn-hangzhou.aliyuncs.com/blog/image-20260606145545727.png)

✅ Browser tools ready. 

Run: `python run_agent.py --help`

✓ TUI dependencies installed

----

→ Setting up hermes command...

✓ Installed hermes launcher → `~/.local/bin/hermes`

✓ Added `~/.local/bin` to PATH in `/home/codezsx/.bashrc`

✓ hermes command ready

----

→ Setting up configuration files...

✓ Created `~/.hermes/.env` from template

✓ Created `~/.hermes/config.yaml` from template

✓ Created `~/.hermes/SOUL.md` (edit to customize personality)

✓ Configuration directory ready: `~/.hermes/`

→ Syncing bundled skills to `~/.hermes/skills/` ...

Syncing bundled skills into `~/.hermes/skills/` ...

----

+ popular-web-designs

+ baoyu-infographic

+ architecture-diagram

+ p5js

+ comfyui

+ design-md

+ excalidraw

+ touchdesigner-mcp

+ songwriting-and-ai-music

+ ascii-art

+ manim-video

+ pretext

+ claude-design

+ sketch

+ ascii-video

+ humanizer

+ godmode

+ requesting-code-review

+ hermes-agent-skill-authoring

+ systematic-debugging

+ python-debugpy

+ plan

+ spike

+ node-inspect-debugger

+ test-driven-development

+ obsidian

+ himalaya

+ xurl

+ jupyter-live-kernel

+ dogfood

+ imessage

+ apple-notes

+ apple-reminders

+ findmy

+ macos-computer-use

+ blogwatcher

+ polymarket

+ research-paper-writing

+ llm-wiki

+ arxiv

+ gif-search

+ youtube-content

+ songsee

+ heartmula

+ openhue

+ kanban-orchestrator

+ kanban-worker

+ opencode

+ claude-code

+ codex

+ hermes-agent

+ github-code-review

+ github-issues

+ github-auth

+ codebase-inspection

+ github-repo-management

+ github-pr-workflow

+ yuanbao

+ audiocraft-audio-generation

+ segment-anything-model

+ obliteratus

+ llama-cpp

+ serving-llms-vllm

+ weights-and-biases

+ evaluating-llms-harness

+ huggingface-hub

+ airtable

+ nano-pdf

+ google-workspace

+ teams-meeting-pipeline

+ notion

+ powerpoint

+ ocr-and-documents

+ maps

Done: 74 new, 0 updated, 0 unchanged. 74 total bundled.

✓ Skills synced to ~/.hermes/skills/

## 启动设置向导

→ Starting setup wizard...

![](https://zsx-typora.oss-cn-hangzhou.aliyuncs.com/blog/image-20260606145804409.png)

----

◆ Nous Portal

One subscription, 300+ models, plus the Tool Gateway:

web search, image generation, TTS, browser automation.

Sign up: `https://portal.nousresearch.com/manage-subscription`

Not logged into Nous Portal.

Starting login...

Starting Hermes login via Nous Portal...

Portal: `https://portal.nousresearch.com`

To continue:

1 - Open: `https://portal.nousresearch.com/manage-subscription?user_code=YCGT-7MXS`

2 - If prompted, enter code: YCGT-7MXS

(Opened browser for verification)

Waiting for approval (polling every 1s)...
gio: https://portal.nousresearch.com/manage-subscription?user_code=YCGT-7MXS: Operation not supported

^C

Login cancelled.

Login cancelled or failed.

----

◆ Terminal Backend

Choose where Hermes runs shell commands and code.

This affects tool execution, file access, and isolation.

Guide: https://hermes-agent.nousresearch.com/docs/developer-guide/environments

Skipped (keeping current)

Keeping current backend: local

----

✓ Applied recommended defaults:

Max iterations: 150

Tool progress: all

Compression threshold: 0.50

Session reset: never (use /reset or compression)

Run `hermes setup agent` later to customize.

Skipped (keeping current)

----

◆ Messaging Platforms

Connect to messaging platforms to chat with Hermes from anywhere.

Toggle with Space, confirm with Enter.

----

─── Feishu / Lark Setup ───

Go to https://open.feishu.cn/ (or https://open.larksuite.com/ for Lark)

Create an app, enable the Bot capability, and copy the credentials.

App ID: `cli_a96d104036f85bcf`

App Secret: `********************************`

Skipped (keeping current)

✓ Credentials verified — bot: `roxanne-varza`

Skipped (keeping current)

✓ Bot created: `roxanne-varza`

Skipped (keeping current)

✓ DM pairing enabled.

Unknown users can request access; approve with `hermes pairing approve`.

Skipped (keeping current)

Group chats enabled (bot must be `@mentioned`).

Home chat ID (optional, for cron/notifications):

✓ Feishu / Lark configured!

App ID: cli_a96d104036f85bcf

Domain: feishu

Bot: roxanne-varza

----

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Messaging platforms configured!

Install the gateway as a systemd service? (runs in background, starts on boot) [Y/n]: Y

Skipped (keeping current)

Installing user systemd service to: 

`/home/codezsx/.config/systemd/user/hermes-gateway.service`

Created symlink 

`/home/codezsx/.config/systemd/user/default.target.wants/hermes-gateway.service` → `/home/codezsx/.config/systemd/user/hermes-gateway.service`.

✓ User service installed and enabled!

Next steps:

hermes gateway start              # Start the service

hermes gateway status             # Check status

journalctl --user -u hermes-gateway -f  # View logs

Enabling linger so the gateway survives SSH logout...

✓ Linger enabled — gateway will persist after logout

Start the service now? [Y/n]: y

✓ User service started

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Setup complete! You're ready to go.

Configure all settings: hermes setup

◆ Tool Availability Summary

4/10 tool categories available:

✗ Vision (image analysis) (missing run 'hermes setup' to configure)

✗ Mixture of Agents (missing OPENROUTER_API_KEY)

✗ Web Search & Extract (missing EXA_API_KEY, PARALLEL_API_KEY, FIRECRAWL_API_KEY/FIRECRAWL_API_URL, TAVILY_API_KEY, or SEARXNG_URL)

✗ Browser Automation (missing npm install -g agent-browser && agent-browser install --with-deps)

✗ Image Generation (missing FAL_KEY or OPENAI_API_KEY)

✓ Text-to-Speech (Edge TTS)

✗ Skills Hub (GitHub) (missing GITHUB_TOKEN)

✓ Terminal/Commands

✓ Task Planning (todo)

✓ Skills (view, create, edit)

⚠ Some tools are disabled. Run 'hermes setup tools' to configure them,

⚠ or edit ~/.hermes/.env directly to add the missing API keys.

┌─────────────────────────────────────────────────────────┐
│              ✓ Setup Complete!                          │
└─────────────────────────────────────────────────────────┘

📁 All your files are in `~/.hermes/`:

Settings: `/home/codezsx/.hermes/config.yaml`

API Keys: `/home/codezsx/.hermes/.env`

Data: `/home/codezsx/.hermes/cron/`, `sessions/`, `logs/`

────────────────────────────────────────────────────

📝 To edit your configuration:

hermes setup - Re-run the full wizard

hermes setup model - Change model/provider

hermes setup terminal - Change terminal backend

hermes setup gateway - Configure messaging

hermes setup tools - Configure tool providers

hermes config - View current settings

hermes config edit - Open config in your editor

hermes config set <key> <value> - Set a specific value

Or edit the files directly:

nano /home/codezsx/.hermes/config.yaml

nano /home/codezsx/.hermes/.env

────────────────────────────────────────────────────────────

🚀 Ready to go!

- hermes - Start chatting

- hermes gateway - Start messaging gateway

- hermes doctor - Check for issues

┌─────────────────────────────────────────────────────────┐
│              ✓ Installation Complete!                   │
└─────────────────────────────────────────────────────────┘

📁 Your files:

Config: `/home/codezsx/.hermes/config.yaml`

API Keys:  `/home/codezsx/.hermes/.env`

Data: `/home/codezsx/.hermes/cron/`, `sessions/`, `logs/`

Code: `/home/codezsx/.hermes/hermes-agent`

─────────────────────────────────────────────────────────

🚀 Commands:

hermes - Start chatting

hermes setup - Configure API keys & settings

hermes config - View/edit configuration

hermes config edit - Open config in editor

hermes gateway install Install gateway service (messaging + cron)

hermes update - Update to latest version

─────────────────────────────────────────────────────────

⚡ Reload your shell to use 'hermes' command:

source ~/.bashrc

Note: ripgrep (rg) was not found. 

File search will use grep as a fallback. 

For faster search in large codebases,

install ripgrep: `sudo apt install ripgrep` (or `brew install ripgrep`)

codezsx@PC-CODEZSX:~$ hermes pairing approve feishu PFUVTZYC

hermes: command not found

codezsx@PC-CODEZSX:~$

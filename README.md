# learn webgpu
## 一、开发环境准备
	npm install --save-dev typescript
	npm install --save-dev webgpu
	npm install --save-dev vite
	npm install --save-dev vite-plugin-string

## 二、vite编译
	编译规则见 vite.config.js
	将./core文件夹的ts文件编译到/build文件夹,目标为js文件
### 单次编译
	npx vite build
### 启动方式1：liveServer（推荐）
	修改liveServer根目录："liveServer.settings.root": "/build"
	启动liveServer
	http://127.0.0.1:5500/main.html
### 启动方式2：vite
	cd build
	npx vite
	http://localhost:5173/main.html

## npx编译
	编译规则见tsconfig.json
	将./core文件夹的ts文件编译到./dist文件夹,目标为js文件
	该方法编译后的js,在import语句中，不会自动加上.js后缀，需配合webpack等工具配合，存在缺陷
### 单次编译
	npx tsc
### 监听ts变化，自动编译
	npx tsc --watch
### 访问
	启动 LiveServer


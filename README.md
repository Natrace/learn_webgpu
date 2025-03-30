# learn_webgpu
## 开发环境准备
	npm install --save-dev typescript
	npm install --save-dev webgpu 
	npm install --save-dev vite

## 编译
	npx tsc
	将core文件夹的ts文件编译到dist文件夹,目标为js文件
### 监听ts变化
	npx tsc --watch

### 使用vite
	npx vite build // 编译
	npx vite //启动
	修改dist/main.html的js引用为相对路径：src="./assets/main-wVDR788a.js"
	http://localhost:5173/dist/main.html

## 访问
	main.js中引用dist的js文件


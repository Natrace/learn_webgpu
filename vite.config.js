import { defineConfig } from 'vite';

// Vite 配置
export default defineConfig({
  root: './',               // 设置项目根目录
  build: {
      outDir: './build',      // 编译输出目录
      assetsDir: './',        // 生成的静态资源目录
      rollupOptions: {
        input: './main.html', // 输入的入口文件
      },
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'], // 自动解析这些扩展名
  },
  server: {
    open: true,  // 自动打开浏览器
    port: 5173,  // 设置开发服务器端口
  },
});

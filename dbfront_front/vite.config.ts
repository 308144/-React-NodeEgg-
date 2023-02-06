import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import vitePluginImp from 'vite-plugin-imp'

const env = process.env.ENV

const proxyServer = process.env.isDebug
  ? 'http://localhost:7001'
  : 'https://cms-dev.xiongmaoboshi.com'
const cmsPath = {
  dev: 'https://qd-cms-dev.oss-cn-qingdao.aliyuncs.com/cms/demo/',
  pre: 'https://cdn-pre.xiongmaoboshi.com/cms/demo/',
  prod: 'https://cdn01.xiongmaoboshi.com/cms/demo/',
}

export default defineConfig({
  base: cmsPath[env],
  plugins: [
    react(),
    // antd按需引入
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: name => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    // 配置 css-module
    modules: {
      // 开启 camelCase 格式变量名转换
      localsConvention: 'camelCase',
      // 类名 前缀
      generateScopedName: '[local]-[hash:base64:5]',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联 JavaScript
        modifyVars: {
          '@primary-color': 'rgb(22 93 255)',
        },
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    brotliSize: false,
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
    // 待配置配置
    proxy: {
      '/nodeServe': {
        target: 'http://localhost:7001',
        changeOrigin: true,
        secure: false,
        // rewrite: path => path.replace(/^\/front/, ''),
      },
    },

    open: '/',
  },
})

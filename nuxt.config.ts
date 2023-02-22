import { loadEnv } from 'vite'

interface VITE_ENV_CONFIG {
    VITE_API_HOST: string,
    VITE_API_PREFFIX: string,
    VITE_PACK_ENV: string,
    VITE_PACK_URL: string,
}

const envScript = process.env.npm_lifecycle_script!.split(' ')
const envName = envScript[envScript.length - 1] // 通过启动命令区分环境
const envData = loadEnv(envName, 'env') as unknown as VITE_ENV_CONFIG

console.log(process.env)


export default defineNuxtConfig({
    // srcDir: 'src/',
    runtimeConfig: envData, // 把env放入这个里面，通过useRuntimeConfig获取
    app:{
        head:{
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'AI合富',
            meta: [
                // <meta name="description" content="My amazing site">
                { name: 'description', content: 'AI合富' },
                { name: 'keywords',content:'AI合富'}

            ],
            // 模板页面js文件
            script: [
                {
                    src: '/js/vendor.min.js',
                    body: true,
                },
                {
                    src: '/js/plugins.min.js',
                    body: true,
                },
                {
                    src: '/js/main.js',
                    body: true,
                }
            ]
        }
    },
    typescript: {
        shim: false
    },
    // nitro:{
    //     devProxy: {
    //         "/gateway": {
    //             target: "https://aihf-api-test.hopechina.com",
    //             changeOrigin: true,
    //             prependPath: true,
    //             rewrite: (path:any) => path.replace(/^\/gateway/, '')
    //         },
    //     },
    // },
    vite:{
        css:{
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/styles/default.scss";'
                }
            }
        },
        envDir: '~/env',
        // server:{
        //     proxy: {
        //         '/gateway': {
        //             target: 'https://aihf-api-test.hopechina.com',
        //             changeOrigin: true,
        //             rewrite: (path) => path.replace(/^\/gateway/, '')
        //         },
        //     }
        // }
    },
    modules:[
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ]

})

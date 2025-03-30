/**
 * WebGPU驱动类
 */
export default class WebGPUDriver{
    /**
     * @param {string} canvasId 画布元素的id
     */
    constructor(canvasId){
        this.adapter = null;
        this.device = null;
        this.context = null;
        this.canvas = document.getElementById(canvasId);
        this.canvasFormat = null;
    }

    /**
     * 初始化WebGPU
     */
    async Init(){
        if (!navigator.gpu) {
            throw Error("WebGPU not supported.");
        }
        this.adapter = await navigator.gpu.requestAdapter();
        if (!this.adapter) {
            throw Error("Couldn't request WebGPU adapter.");
        }
        this.device = await this.adapter.requestDevice();
        this.context = this.canvas.getContext('webgpu');
        this.canvasFormat = navigator.gpu.getPreferredCanvasFormat();
        this.context.configure({
            device: this.device,
            format: this.canvasFormat,
        });
    }
    
    /**
     * 创建着色器模块
     * @param {string} shaderCode 着色器代码
     * @returns {GPUShaderModule} 着色器模块
     */
    CreateShaderModule(shaderCode){
        return this.device.createShaderModule({ code: shaderCode });
    }

    /**
     * 创建渲染管线
     * @param {GPUShaderModule} vertexShaderModule 顶点着色器模块
     * @param {GPUShaderModule} fragmentShaderModule 片元着色器模块
     * @param {GPUVertexBufferLayout[]} vertexBuffers 顶点缓冲区
     * @returns {GPURenderPipeline} 渲染管线
     */
    async CreatePipeline(vertexShaderModule, fragmentShaderModule, vertexBuffers){
        // 创建渲染管线
        const pipelineDescriptor = {
            vertex: {
              module: vertexShaderModule,
              entryPoint: 'main',
              buffers: vertexBuffers
            },
            fragment: {
              module: fragmentShaderModule,
              entryPoint: 'main',
              targets: [{
                format: this.canvasFormat
              }]
            },
            primitive: {
              topology: 'triangle-list'
            },
            layout: 'auto'
          };
        const pipeline = this.device.createRenderPipelineAsync(pipelineDescriptor);
        return pipeline;
    }
}

//IIFE写法示例
/*
(function(){
    // your code here
    class MyClass {
        constructor(){
            this.name = 'MyClass';
        }
    }
    MYAPP.MyClass = MyClass;
})();
*/
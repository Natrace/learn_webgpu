/**
 * WebGPU驱动类
 */
export class WebGPUDriver{
    adapter!: GPUAdapter;
    device!: GPUDevice;
    context!: GPUCanvasContext;
    canvas: HTMLCanvasElement;
    canvasFormat!: GPUTextureFormat;
    /**
     * @param {string} canvasId 画布元素的id
     */
    constructor(canvasId: string){
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    }

    /**
     * 初始化WebGPU
     */
    public async Init(): Promise<void>{
        if (!navigator.gpu) {
            throw new Error("WebGPU not supported.");
        }
        this.adapter = await navigator.gpu.requestAdapter() as GPUAdapter;
        if (!this.adapter) {
            throw new Error("Couldn't request WebGPU adapter.");
        }
        this.device = await this.adapter.requestDevice();
        if (!this.device) {
            throw new Error("Couldn't request WebGPU device.");
        }
        this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;
        if (!this.context) {
            throw new Error("Couldn't get WebGPU context.");
        }
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
    CreateShaderModule(shaderCode: string): GPUShaderModule {
        if (!this.device) {
            throw new Error("Device not initialized.");
        }
        // 创建着色器模块
        return this.device.createShaderModule({ code: shaderCode });
    }

    /**
     * 创建渲染管线
     * @param {GPUShaderModule} vertexShaderModule 顶点着色器模块
     * @param {GPUShaderModule} fragmentShaderModule 片元着色器模块
     * @param {GPUVertexBufferLayout[]} vertexBuffers 顶点缓冲区
     * @returns {GPURenderPipeline} 渲染管线
     */
    async CreatePipeline(vertexShaderModule: GPUShaderModule, fragmentShaderModule: GPUShaderModule
        , vertexBuffers: GPUVertexBufferLayout[]): Promise<GPURenderPipeline> {
            if (!this.canvasFormat) 
                throw new Error("canvasFormat not initialized.");
        // 创建渲染管线
        const pipelineDescriptor : GPURenderPipelineDescriptor = {
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
        if (!this.device)
            throw new Error("Device not initialized.");
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
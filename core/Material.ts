import { WebGPUDriver } from "./WebGPUDriver";
/**
 * Material类用于创建材质
 */
export class Material{
    vertexShaderCode: string;
    fragmentShaderCode: string;
    pipeline!: GPURenderPipeline;

    /**
     * @param {string} vertexShaderCode 顶点着色器代码
     * @param {string} fragmentShaderCode 片元着色器代码
     */
    constructor(vertexShaderCode: string, fragmentShaderCode: string){
        this.vertexShaderCode = vertexShaderCode;
        this.fragmentShaderCode = fragmentShaderCode;
    }

    /**
     * 创建渲染管线
     * @param {WebGPUDriver} driver WebGPU 设备
     * @returns {void}
     */
    async CreatePipeline(driver: WebGPUDriver): Promise<void> {
        // 创建着色器和管线
        const vertexShaderModule = driver.CreateShaderModule(this.vertexShaderCode);
        const fragmentShaderModule = driver.CreateShaderModule(this.fragmentShaderCode);
        // 定义顶点属性
        const vertexAttrDef: GPUVertexBufferLayout[] = [{
            attributes: [{
                shaderLocation: 0, // position
                offset: 0,
                format: 'float32x4'
            }, {
                shaderLocation: 1, // color
                offset: 16,
                format: 'float32x4'
            }],
            arrayStride: 32,
            stepMode: 'vertex'
        }];
        this.pipeline = await driver.CreatePipeline(vertexShaderModule, fragmentShaderModule, vertexAttrDef);
    }

    
}
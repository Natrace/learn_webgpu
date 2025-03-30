
import { ShaderCodes } from "./ShaderCodes.js";
import { Geometry } from "./Geometry.js";
import { Material } from "./Material.js";
import { RenderObject } from "./RenderObject.js";

/**
 * Model类用于存储复杂模型
 */
export default class Model{
   
    /**
     * @param {WebGPUDriver} driver WebGPU驱动
     */
    constructor(driver){
        this.driver = driver;
        this.device = driver.device;
        this.context = driver.context;
        this.renderObjects = [];
    }

    async LoadTriangleModel(){
        const vertices = new Float32Array([
            0.0,  0.6, 0, 1,  1, 0, 0, 1,
           -0.5, -0.6, 0, 1,  0, 1, 0, 1,
            0.5, -0.6, 0, 1,  0, 0, 1, 1
          ]);
        const geometry = new Geometry(vertices);
        geometry.uploadToGpu(this.device);

        const material = new Material(ShaderCodes.vertexShaderCode, ShaderCodes.fragmentShaderCode);
        await material.CreatePipeline(this.driver);

        const renderObject = new RenderObject(geometry, material);
        this.renderObjects.push(renderObject);
    }

    render(){
        const { device, context } = this;
        for (let i = 0; i < this.renderObjects.length; i++) {
            this.renderObjects[i].render(device, context);
        }
    }

   
}
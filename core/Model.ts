
import { WebGPUDriver } from "./WebGPUDriver";
import { ShaderCodes } from "./ShaderCodes";
import { Geometry } from "./Geometry";
import { Material } from "./Material";
import { RenderObject } from "./RenderObject";

/**
 * Model类用于存储复杂模型
 */
export class Model{
    driver: WebGPUDriver;
    device: GPUDevice;
    context: GPUCanvasContext;
    renderObjects: RenderObject[];

    /**
     * @param {WebGPUDriver} driver WebGPU驱动
     */
    constructor(driver: WebGPUDriver){
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

        const material = new Material(ShaderCodes['triangle.vert'], ShaderCodes['triangle.frag']);
        await material.CreatePipeline(this.driver);

        const renderObject = new RenderObject(geometry, material);
        this.renderObjects.push(renderObject);
    }

    render(){
        const { device, context } = this;
        for (let i = 0; i < this.renderObjects.length; i++) {
            this.renderObjects[i].render(device, context);
        }
        requestAnimationFrame(this.render.bind(this));
    }

   
}
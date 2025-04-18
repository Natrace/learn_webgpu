import { Geometry } from "./Geometry";
import { Material } from "./Material";

/**
 * RenderObject 可渲染对象
 */
export class RenderObject{
    geometry: Geometry;
    material: Material;

    /**
     * @param {Geometry} geometry 几何体
     * @param {Material} material 材质
     */
    constructor(geometry: Geometry, material: Material){
        this.geometry = geometry;
        this.material = material;
    }
    
    
    render(device: GPUDevice, context: GPUCanvasContext): void {
        // 创建命令编码器
        const commandEncoder = device.createCommandEncoder();

        // 创建渲染通道描述符
        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: "clear",
                storeOp: "store",
                clearValue : { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            }],
        };

        // 创建渲染通道
        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

        // 设置管线并绑定缓冲区
        passEncoder.setPipeline(this.material.pipeline);
        passEncoder.setVertexBuffer(0, this.geometry.vertexBuffer);

        // 绘制三角形
        passEncoder.draw(3, 1, 0, 0);

        // 结束渲染通道
        passEncoder.end();

        // 提交命令
        device.queue.submit([commandEncoder.finish()]);
    }
}
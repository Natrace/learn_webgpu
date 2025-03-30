/**
 * Geometry类存储模型的几何数据
 */
export class Geometry{
    vertices: Float32Array | null;
    vertexBuffer: GPUBuffer | null;
    
    /** 
     * @param {Float32Array} vertices 顶点数据
     */
    constructor(vertices: Float32Array) {
        this.vertices = vertices;
        this.vertexBuffer = null;
    }

    /**
     * 上传顶点数据到GPU
     * @param {GPUDevice} device GPU 设备
     * @returns {void}
     */
    uploadToGpu(device: GPUDevice): void {
        if (!this.vertices || this.vertexBuffer) {
            return;
        }

        this.vertexBuffer = device.createBuffer({
            size: this.vertices.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });
        // Copy the vertex data over to the GPUBuffer using the writeBuffer() utility function
        device.queue.writeBuffer(this.vertexBuffer, 0, this.vertices, 0, this.vertices.length);
        this.vertices = null;
    }
}
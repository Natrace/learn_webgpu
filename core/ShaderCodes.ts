
import triangle_vert from './Shaders/triangle.vert.wgsl';
import triangle_frag from './Shaders/triangle.frag.wgsl';
/**
 * ShaderCodes 类用于存储着色器代码
 */
export class ShaderCodes{
    static vertexShaderCode: string = triangle_vert;
    static fragmentShaderCode: string = triangle_frag;
}
/**
 * ShaderCodes 类用于存储着色器代码
 */
export class ShaderCodes{
    // 顶点着色器：将顶点位置传递到片元着色器
    static vertexShaderCode = `
        struct VertexOut {
        @builtin(position) position : vec4f,
        @location(0) color : vec4f
        }

        @vertex
        fn main(@location(0) position: vec4f,
                    @location(1) color: vec4f) -> VertexOut
        {
            var output : VertexOut;
            output.position = position;
            output.color = color;
            return output;
        }
    `;

    // 片元着色器：输出一个固定的颜色
    static fragmentShaderCode = `
        struct VertexOut {
            @builtin(position) position : vec4f,
            @location(0) color : vec4f
        }
        @fragment
        fn main(fragData: VertexOut) -> @location(0) vec4f
        {
            return fragData.color;
        }
    `;
}
/**
 * ShaderCodes 是一个对象，包含了所有的 WGSL 着色器代码
 * 该对象的键是着色器文件名，值是对应的着色器代码
 * 例如 ShaderCodes['triangle.vert'] 或 ShaderCodes['lighting/triangle.vert']
 * wgsl文件的路径为 ./Shaders/xxx.wgsl
 */
export const ShaderCodes: Record<string, string> = {};


// 初始化 ShaderCodes
const shaderModules = import.meta.glob('./Shaders/**/*.wgsl', { as: 'raw', eager: true });
for (const path in shaderModules) {
    const relativePath = path.replace('./Shaders/', '').replace('.wgsl', '');
    ShaderCodes[relativePath] = shaderModules[path] as string;
}

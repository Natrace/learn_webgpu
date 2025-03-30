import WebGPUDriver from './coor/WebGPUDriver.js';
import Model from './coor/Model.js';


const gpuDriver = new WebGPUDriver('webGpuCanvas');
gpuDriver.Init().then(() => {
    console.log('WebGPU Driver initialized!');
    const model = new Model(gpuDriver);
    model.LoadTriangleModel(gpuDriver.device).then(() => {
        model.render();
    });
});


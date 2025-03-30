import {WebGPUDriver} from './core/WebGPUDriver';
import {Model} from './core/Model';


const gpuDriver = new WebGPUDriver('webGpuCanvas');
gpuDriver.Init().then(() => {
    console.log('WebGPU Driver initialized!');
    const model = new Model(gpuDriver);
    model.LoadTriangleModel().then(() => {
        model.render();
    });
});

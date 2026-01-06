
import React, { useEffect, useRef } from 'react';

const WebGPUBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    async function init() {
      if (!(navigator as any).gpu) {
        console.warn("WebGPU not supported. Falling back to CSS.");
        return;
      }

      const adapter = await (navigator as any).gpu.requestAdapter();
      if (!adapter) return;
      const device = await adapter.requestDevice();

      const context = canvas.getContext('webgpu') as any;
      const presentationFormat = (navigator as any).gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format: presentationFormat,
        alphaMode: 'premultiplied',
      });

      const shaderModule = device.createShaderModule({
        code: `
          struct Uniforms {
            time: f32,
            resolution: vec2<f32>,
          };
          @group(0) @binding(0) var<uniform> uniforms: Uniforms;

          @vertex
          fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {
            var pos = array<vec2<f32>, 4>(
              vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0),
              vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, 1.0)
            );
            return vec4<f32>(pos[vertexIndex], 0.0, 1.0);
          }

          @fragment
          fn fs_main(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
            let uv = pos.xy / uniforms.resolution;
            let t = uniforms.time * 0.4;
            
            var color = vec3<f32>(0.04, 0.06, 0.12); // Deep water base
            
            // Simple caustic noise approximation
            let n = sin(uv.x * 8.0 + t) * cos(uv.y * 8.0 + t * 0.5) +
                    sin(uv.y * 4.0 - t * 0.8) * cos(uv.x * 4.0 + t);
            
            color += vec3<f32>(0.02, 0.05, 0.1) * (n + 1.0);
            return vec4<f32>(color, 0.4);
          }
        `,
      });

      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: { module: shaderModule, entryPoint: 'vs_main' },
        fragment: {
          module: shaderModule,
          entryPoint: 'fs_main',
          targets: [{ format: presentationFormat }],
        },
        primitive: { topology: 'triangle-strip' },
      });

      const uniformBuffer = device.createBuffer({
        size: 16,
        usage: 0x40 | 0x08, // UNIFORM | COPY_DST
      });

      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
      });

      function frame(time: number) {
        if (!canvas) return;
        const uniformsValues = new Float32Array([time / 1000, canvas.width, canvas.height, 0]);
        device.queue.writeBuffer(uniformBuffer, 0, uniformsValues);

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();

        const passEncoder = commandEncoder.beginRenderPass({
          colorAttachments: [{
            view: textureView,
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
            loadOp: 'clear',
            storeOp: 'store',
          }],
        });

        passEncoder.setPipeline(pipeline);
        passEncoder.setBindGroup(0, bindGroup);
        passEncoder.draw(4);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(frame);
      }

      const observer = new ResizeObserver(() => {
        canvas.width = canvas.clientWidth * devicePixelRatio;
        canvas.height = canvas.clientHeight * devicePixelRatio;
      });
      observer.observe(canvas);

      requestAnimationFrame(frame);
    }

    init();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 pointer-events-none" />;
};

export default WebGPUBackground;

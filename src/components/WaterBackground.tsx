'use client'

import { useEffect, useRef } from 'react'

/**
 * Animated water background rendered in WebGL.
 * Soft, flowing caustic light patterns in the brand blues – loops seamlessly,
 * no video file, and respects prefers-reduced-motion.
 */
export default function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    const vsSource = `
      attribute vec2 a_pos;
      void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
    `
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_res;

      #define ITER 5

      // Swimming-pool caustics: the dancing light network seen on a pool floor.
      // Smooth (no noise texture), animated, viewed straight down.
      float caustic(vec2 uv, float time){
        vec2 p = mod(uv * 6.28318, 6.28318) - 250.0;
        vec2 i = p;
        float c = 1.0;
        float inten = 0.0045;
        for (int n = 0; n < ITER; n++){
          float t = time * (1.0 - (3.5 / float(n + 1)));
          i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
          c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
        }
        c /= float(ITER);
        c = 1.17 - pow(c, 1.4);
        return clamp(pow(abs(c), 7.0), 0.0, 1.0);
      }

      void main(){
        float aspect = u_res.x / u_res.y;
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        vec2 p = vec2(uv.x * aspect, uv.y);
        float t = u_time * 0.30 + 12.0;
        vec2 drift = vec2(sin(u_time * 0.06) * 0.04, cos(u_time * 0.05) * 0.04);

        // Fresh, clear blue water — lighter toward the bottom.
        vec3 deepC  = vec3(0.055, 0.330, 0.560);
        vec3 lightC = vec3(0.230, 0.600, 0.820);
        vec3 col = mix(deepC, lightC, smoothstep(0.0, 1.0, uv.y));

        // Soft top glow.
        vec2 lp = vec2(0.6 * aspect, 1.1);
        float rl = 1.0 - clamp(distance(p, lp) / 1.35, 0.0, 1.0);
        col += rl * rl * vec3(0.10, 0.22, 0.30);

        // Subtle caustic shimmer.
        float c1 = caustic((p + drift) * 2.4, t);
        float c2 = caustic((p - drift) * 3.4 + 5.0, t * 1.25);
        float caus = max(c1, c2 * 0.85);
        col += pow(caus, 1.4) * vec3(0.40, 0.66, 0.78) * 0.25;

        // A gentle wave swell sweeping in from the side.
        float sweep = mod(u_time * 0.11, 1.9) - 0.35;
        float yWarp = sin(uv.y * 5.0 + u_time * 0.6) * 0.05;
        float wd = abs(uv.x - (sweep + yWarp));
        col += smoothstep(0.16, 0.0, wd) * vec3(0.14, 0.30, 0.40) * 0.30;

        col *= mix(0.92, 1.10, uv.y);

        gl_FragColor = vec4(col, 1.0);
      }
    `

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vsSource))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fsSource))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_res')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const w = canvas.clientWidth || 1
      const h = canvas.clientHeight || 1
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    const start = performance.now()
    const frame = (now: number) => {
      gl.uniform1f(uTime, reduced ? 8.0 : (now - start) / 1000)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

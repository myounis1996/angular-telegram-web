function hexaToRgba(hexa: string) {
  const arr = [];
  const offset = hexa[0] === '#' ? 1 : 0;
  if(hexa.length === (5 + offset)) {
    hexa = (offset ? '#' : '') + '0' + hexa.slice(offset);
  }

  if(hexa.length === (3 + offset)) {
    for(let i = offset; i < hexa.length; ++i) {
      arr.push(parseInt(hexa[i] + hexa[i], 16));
    }
  } else if(hexa.length === (4 + offset)) {
    for(let i = offset; i < (hexa.length - 1); ++i) {
      arr.push(parseInt(hexa[i] + hexa[i], 16));
    }

    arr.push(parseInt(hexa[hexa.length - 1], 16));
  } else {
    for(let i = offset; i < hexa.length; i += 2) {
      arr.push(parseInt(hexa.slice(i, i + 2), 16));
    }
  }
  return arr;
}

function hexToRgb(hex: string) {
  return hexaToRgba(hex.slice(0, 7));
}

const WIDTH = 50;
const HEIGHT = WIDTH;

type Point = {x: number, y: number};

export default class ChatBackgroundGradientRenderer {
  private  _width = WIDTH;
  private  _height = HEIGHT;
  private _phase : number = 0;
  private _tail: number = 90;
  private readonly _tails = 90;
  // private readonly _scrollTails = 50;
  private _frames: ImageData[] = [];
  private _colors: {r: number, g: number, b: number}[] = [];
  private readonly _curve = [
    0, 0.25, 0.50, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 18.3, 18.6, 18.9, 19.2, 19.5, 19.8, 20.1, 20.4, 20.7,
    21.0, 21.3, 21.6, 21.9, 22.2, 22.5, 22.8, 23.1, 23.4, 23.7, 24.0, 24.3, 24.6,
    24.9, 25.2, 25.5, 25.8, 26.1, 26.3, 26.4, 26.5, 26.6, 26.7, 26.8, 26.9, 27
  ];
  private readonly _incrementalCurve: number[];
  private readonly _positions: Point[] = [
    {x: 0.80, y: 0.10},
    {x: 0.60, y: 0.20},
    {x: 0.35, y: 0.25},
    {x: 0.25, y: 0.60},
    {x: 0.20, y: 0.90},
    {x: 0.40, y: 0.80},
    {x: 0.65, y: 0.75},
    {x: 0.75, y: 0.40}
  ];
  private readonly _phases = this._positions.length;

  private _canvas!: HTMLCanvasElement;
  private _ctx!: CanvasRenderingContext2D;
  private _hc!: HTMLCanvasElement;
  private _hctx!: CanvasRenderingContext2D;

  constructor() {
    const diff = this._tails / this._curve[this._curve.length - 1];

    for(let i = 0, length = this._curve.length; i < length; ++i) {
      this._curve[i] = this._curve[i] * diff;
    }

    this._incrementalCurve = this._curve.map((v, i, arr) => {
      return v - (arr[i - 1] ?? 0);
    });
  }

  private hexToRgb(hex: string) {
    const result = hexToRgb(hex);
    return {r: result[0], g: result[1], b: result[2]};
  }

  private getPositions(shift: number) {
    const positions = this._positions.slice();
    positions.push(...positions.splice(0, shift));

    const result: typeof positions = [];
    for(let i = 0; i < positions.length; i += 2) {
      result.push(positions[i]);
    }
    return result;
  }

  private getNextPositions(phase: number, curveMax: number, curve: number[]) {
    const pos = this.getPositions(phase);
    if(!curve[0] && curve.length === 1) {
      return [pos];
    }

    const nextPos = this.getPositions(++phase % this._phases);
    const distances = nextPos.map((nextPos, idx) => {
      return {
        x: (nextPos.x - pos[idx].x) / curveMax,
        y: (nextPos.y - pos[idx].y) / curveMax
      };
    });

    const positions = curve.map((value) => {
      return distances.map((distance, idx) => {
        return {
          x: pos[idx].x + distance.x * value,
          y: pos[idx].y + distance.y * value
        };
      });
    });

    return positions;
  }

  private curPosition(phase: number, tail: number) {
    const positions = this.getNextPositions(phase, this._tails, [tail]);
    return positions[0];
  }

  private changeTail(diff: number) {
    this._tail += diff;

    while(this._tail >= this._tails) {
      this._tail -= this._tails;
      if(++this._phase >= this._phases) {
        this._phase -= this._phases;
      }
    }

    while(this._tail < 0) {
      this._tail += this._tails;
      if(--this._phase < 0) {
        this._phase += this._phases;
      }
    }
  }

  // private onWheel = (e: {deltaY: number}) => {
  //   if(this._animatingToNextPosition) {
  //     return;
  //   }

  //   this._scrollDelta += e.deltaY;
  //   if(this._onWheelRAF === undefined) {
  //     this._onWheelRAF = requestAnimationFrame(this.drawOnWheel);
  //   }
  // };

  private changeTailAndDraw(diff: number) {
    this.changeTail(diff);
    const curPos = this.curPosition(this._phase, this._tail);
    this.drawGradient(curPos);
  }

  private getGradientImageData(positions: Point[], phase = this._phase, progress = 1 - this._tail / this._tails) {
    const id = this._hctx.createImageData(this._width, this._height);
    const pixels = id.data;
    const colorsLength = this._colors.length;

    const positionsForPhase = (phase: number) => {
      const result: typeof positions = [];
      for(let i = 0; i != 4; ++i) {
        result[i] = {...this._positions[(phase + i * 2) % this._positions.length]};
        result[i].y = 1.0 - result[i].y;
      }
      return result;
    };

    const previousPhase = (phase + 1) % this._positions.length;
    const previous = positionsForPhase(previousPhase);
    const current = positionsForPhase(phase);

    let offset = 0;
    for(let y = 0; y < this._height; ++y) {
      const directPixelY = y / this._height;
      const centerDistanceY = directPixelY - 0.5;
      const centerDistanceY2 = centerDistanceY * centerDistanceY;
      for(let x = 0; x < this._width; ++x) {
        const directPixelX = x / this._width;
        const centerDistanceX = directPixelX - 0.5;
        const centerDistance = Math.sqrt(centerDistanceX * centerDistanceX + centerDistanceY2);

        const swirlFactor = 0.35 * centerDistance;
        const theta = swirlFactor * swirlFactor * 0.8 * 8.0;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        const pixelX = Math.max(0.0, Math.min(1.0, 0.5 + centerDistanceX * cosTheta - centerDistanceY * sinTheta));
        const pixelY = Math.max(0.0, Math.min(1.0, 0.5 + centerDistanceX * sinTheta + centerDistanceY * cosTheta));

        let distanceSum = 0.0;
        let r = 0.0;
        let g = 0.0;
        let b = 0.0;
        for(let i = 0; i < colorsLength; ++i) {
          const colorX = previous[i].x + (current[i].x - previous[i].x) * progress;
          const colorY = previous[i].y + (current[i].y - previous[i].y) * progress;

          const distanceX = pixelX - colorX;
          const distanceY = pixelY - colorY;

          let distance = Math.max(0.0, 0.9 - Math.sqrt(distanceX * distanceX + distanceY * distanceY));
          distance = distance * distance * distance * distance;
          distanceSum += distance;

          r += distance * this._colors[i].r;
          g += distance * this._colors[i].g;
          b += distance * this._colors[i].b;
        }

        pixels[offset++] = r / distanceSum;
        pixels[offset++] = g / distanceSum;
        pixels[offset++] = b / distanceSum;
        pixels[offset++] = 0xFF;
      }
    }
    return id;
  }

  private drawImageData(id: ImageData) {
    this._hctx.putImageData(id, 0, 0);
    this._ctx.drawImage(this._hc, 0, 0, this._width, this._height);
  }

  private drawGradient(positions: Point[]) {
    this.drawImageData(this.getGradientImageData(positions));
  }

  public init(el: HTMLCanvasElement) {
    this._frames = [];
    this._phase = 0;
    this._tail = 0;
    this._width = el.width;
    this._height = el.height;
    // @ts-ignore
    const colors = el.getAttribute('data-colors').split(',');
    this._colors = colors.map((color) => {
      return this.hexToRgb(color);
    });

    if(!this._hc) {
      this._hc = document.createElement('canvas');
      this._hc.width = this._width;
      this._hc.height = this._height;
      // @ts-ignore
      this._hctx = this._hc.getContext('2d', {alpha: false});
    }

    this._canvas = el;
    // @ts-ignore
    this._ctx = this._canvas.getContext('2d', {alpha: false});
    this.update();
  }

  private update() {
    if(this._colors.length < 2) {
      const color = this._colors[0];
      this._ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      this._ctx.fillRect(0, 0, this._width, this._height);
      return;
    }

    const position = this.curPosition(this._phase, this._tail);
    this.drawGradient(position);
  }

  public static create(canvas: HTMLCanvasElement) {
    const gradientRenderer = new ChatBackgroundGradientRenderer();
    gradientRenderer.init(canvas);
    return {gradientRenderer, canvas};
  }
}

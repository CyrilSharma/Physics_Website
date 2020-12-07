import p5 from 'p5'
export function displayRect(p: p5, x: number, y: number, w: number, h: number, angle: number) {
    p.push();
    p.translate(x, y);
    p.rotate(angle);
    p.rectMode(p.CENTER);
    p.rect(0, 0, w, h);
    p.pop();
}

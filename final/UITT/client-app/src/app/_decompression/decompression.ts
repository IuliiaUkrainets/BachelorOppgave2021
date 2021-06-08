import { ImageResponse } from '../_models/medicalimage';

export function decompressImage(response: ImageResponse): string | null {
    if (response == null) {
        return null;
    }

    let t = decompress(
        response.image[0][0],
        response.image[0][1],
        response.image[0][2],
        response.image[0][3]
    );

    t = decompress(t, response.image[1], response.image[2], response.image[3]);

    const width = t[0].length;
    const height = t.length;
    const buffer = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pos = (y * width + x) * 4;
            buffer[pos] = t[y][x];
            buffer[pos + 1] = t[y][x];
            buffer[pos + 2] = t[y][x];
            buffer[pos + 3] = 255;
        }
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    // @ts-ignore
    const idata = ctx.createImageData(width, height);

    idata.data.set(buffer);

    // @ts-ignore
    ctx.putImageData(idata, 0, 0);
    return canvas.toDataURL();
}

// tslint:disable-next-line:typedef
// @ts-ignore
// tslint:disable-next-line:typedef
function decompress(WLL, WLH, WHL, WHH) {
    const WL = [];
    for (let i = 0; i < WLL.length; i++) {
        const temp = [];
        const temp1 = [];
        for (let j = 0; j < WLL[0].length; j++) {
            temp.push(Number(WLL[i][j]) + Number(WLH[i][j]));
            temp1.push(Number(WLL[i][j]) - Number(WLH[i][j]));
        }
        WL.push(temp);
        WL.push(temp1);
    }
    const WH = [];
    for (let i = 0; i < WHL.length; i++) {
        const temp = [];
        const temp1 = [];
        for (let j = 0; j < WHL[0].length; j++) {
            temp.push(Number(WHL[i][j]) + Number(WHH[i][j]));

            temp1.push(Number(WHL[i][j]) - Number(WHH[i][j]));
        }
        WH.push(temp);
        WH.push(temp1);
    }

    const W = [];
    for (let i = 0; i < WL.length; i++) {
        const temp = [];
        for (let j = 0; j < WL[0].length; j++) {
            temp.push(Number(WL[i][j]) + Number(WH[i][j]));
            temp.push(Number(WL[i][j]) - Number(WH[i][j]));
        }
        W.push(temp);
    }
    return W;
}

function dekomprimering(WLL, WLH, WHL, WHH) {
    let WL = [];
    for (let i = 0; i < WLL[0].length; i++) {
        let temp = [];
        let temp1 = [];
        for (let j = 0; j < WLL.length; j++) {
            temp.push(WLL[i][j] + WLH[i][j]);
            temp1.push(WLL[i][j] - WLH[i][j]);
        }
        WL.push(temp);
        WL.push(temp1);
    }

    let WH = [];
    for (let i = 0; i < WHL[0].length; i++) {
        let temp = [];
        let temp1 = [];
        for (let j = 0; j < WHL.length; j++) {
            temp.push(WHL[i][j] + WHH[i][j]);
            temp1.push(WHL[i][j] - WHH[i][j]);
        }
        WH.push(temp);
        WH.push(temp1);
    }

    let W = [];
    for (let i = 0; i < WH[0].length; i++) {
        let temp = [];
        let temp1 = [];
        for (let j = 0; j < WH.length; j++) {
            temp.push(WL[i][j] + WH[i][j]);
            temp1.push(WL[i][j] - WH[i][j]);
        }
        W.push(temp);
        W.push(temp1);
    }
    return W;
}

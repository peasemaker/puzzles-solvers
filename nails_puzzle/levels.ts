const levels: {[key: string]: string} = {
    level15: `
        0010100
        1000100
        0100000
        0000110
        0100000
        0000000
        0001000
    `,

    level16: `
        0000100
        1000000
        0100000
        1000000
        0001010
        0000101
        0000001
    `,

    level119: `
        100001001
        000010010
        101000000
        000000001
        001011100
        000000000
        110000010
        000100000
        100010001
    `,

    level129: `
        0000010000
        0000001000
        1010101000
        0000000001
        0100000000
        1000000101
        0000101000
        1000000011
        0000100000
        1001000100
    `,

    level180: `
        1000001000
        0000100000
        0100000010
        0000100011
        1000000000
        0001000000
        0000010010
        0000000001
        1000010000
        0100010000
    `,

    // level181: `
    //     00000110000
    //     00100000000
    //     10000000110
    //     10000000000
    //     00110010001
    //     00000000000
    //     00000010000
    //     01000000100
    //     00100000000
    //     00001010010
    //     00000000001
    // `,

    level182: `
        00011000000
        10000000000
        00000000011
        00100010000
        10000010100
        00000000000
        10000010110
        01100100001
        00000000000
        10000000000
        10001001000
    `,

    level183: `
        10000000000
        00001000010
        00001010100
        10000000000
        00000000001
        10100000000
        00000001000
        00001000001
        10001000000
        10000000000
        10001000110
    `,

    level184: `
        01010000000
        00000110100
        10000000010
        00000010000
        10000001000
        00000100000
        00100000001
        10000000001
        01001010000
        00001000010
        01000000000
    `,

    level185: `
        00011000001
        00000001000
        10000001000
        01010000010
        00000001000
        00000010010
        00000101000
        00010000000
        00000000000
        01000000100
        00011000100
    `,

    level186: `
        01000000000
        00001000000
        10100000010
        00000000000
        00101000000
        00110000100
        00000101001
        00000000000
        00000001000
        00100100001
        00110000000
    `,

    level187: `
        00101000000
        00000010000
        00001000011
        00100100001
        00000000000
        10100000000
        00000001000
        00001000001
        00100101000
        00000000000
        00001000100
    `,

    level188: `
        10011000000
        00000000000
        00000100001
        01000000100
        00010100010
        00000000001
        10000000110
        01000101000
        00000000000
        00001000100
        01010000000
    `,

    level189: `
        00000100000
        00100000100
        10010000000
        00001000100
        00000000000
        00010000100
        01100000000
        00001000100
        01000000011
        00100000000
        00001000010
    `,

    level190: `
        00001000011
        00000001000
        10100000010
        10000000000
        00000000100
        00000000000
        00110100010
        00000001010
        00010000000
        00000000000
        01000010010
    `,

    level191: `
        01010010001
        00000000101
        00000000000
        10100000100
        01000100000
        00001000000
        00000001000
        00001000000
        01000000011
        00001000100
        00000101000
    `,

    level192: `
        00100001000
        00000100001
        00000010000
        01001000010
        11010000010
        00000100000
        00001000000
        00000000011
        00000010000
        10000000100
        01100010001
    `,

    level193: `
        00010000000
        01000000001
        10000001010
        01000001000
        00001110000
        00100000010
        00000001001
        00000000000
        10000000000
        10000010100
        01000010000
    `,

    level194: `
        01000010000
        00000100000
        11100000010
        00000100000
        00000000100
        00000000001
        00101001000
        01000100001
        00001000010
        00000010000
        00100001010
    `,

    level195: `
        00100000000
        00010000110
        10001000001
        00000000000
        00010010001
        00000000000
        10000000101
        00000100000
        11000000010
        00001000001
        00000000000
    `,

    level196: `
        00000000000
        00011100011
        00000000000
        10100000100
        00000000000
        00000100000
        10001000101
        01000000000
        01000000000
        00000010101
        10100010000
    `,

    level197: `
        10000000000
        10000000010
        00011000000
        00100000100
        01000000001
        00000000000
        10000101010
        00000000000
        00000100001
        00100000000
        10000101000
    `,

    level198: `
        01100000000
        00001000001
        00000000010
        10010000001
        00000110000
        00000000100
        00000100000
        00100100000
        00000001001
        01000000000
        01010000000
    `,

    level199: `
        10000000000
        01000010001
        00010000001
        00000000000
        00100100100
        00010001101
        01100000000
        00000000000
        00000110000
        01000000000
        01001001011
    `,

    level200: `
        01000100001
        00000001000
        11000110000
        00000000110
        00010000000
        00000000001
        10100000000
        00001001001
        00000000100
        00010010000
        01100010001
    `,

    level201: `
        01110000000
        00000000000
        00000000100
        00000000001
        10001010100
        01000000001
        00000001000
        00110101000
        00000000100
        10000000000
        00010010000
    `,

    level202: `
        00000010000
        01100010111
        00000000000
        10000100001
        00000000100
        00100100010
        01000000000
        00000001000
        10100000010
        00000100000
        00000010000
    `,

    level203: `
        01000011000
        00000000000
        10000000101
        10000100000
        00000000000
        10000101000
        01000000000
        00100100101
        01000000001
        00001000010
        10000100000
    `,

    level204: `
        11000000001
        00000000000
        00101010000
        00000000101
        01000000001
        00100100100
        00000000000
        00010100001
        01000000000
        00000001010
        00100100000
    `,

    level205: `
        00000000000
        10000100000
        01000000010
        10000000100
        00001000010
        00100000001
        00101000000
        00000000100
        01001001000
        00000001000
        10001000011
    `,

    level206: `
        00100000000
        00000100100
        10001000000
        01000010000
        10000000101
        10000000000
        00001000000
        10000010000
        01000000100
        00100000000
        01000100000
    `,

    level207: `
        01110000000
        00000000010
        00000100001
        00000001000
        00000010010
        01100100000
        00000000110
        00000000000
        11000101000
        00000000000
        00010010000
    `,

    level208: `
        00001000000
        01100000000
        00001001011
        00000000000
        01000100000
        00000000101
        00010000011
        00101001000
        00001000000
        00000000000
        00001100000
    `,

    level209: `
        00000100001
        00010100000
        01000000001
        00000010000
        00000000101
        10010000010
        00000010000
        01010000100
        00000000000
        00000001000
        00110000000
    `,

    level210: `
        01001100011
        00100000000
        00000001000
        00000000000
        00100100000
        01000001001
        00100000000
        00010000000
        10000100100
        00000000100
        01010000000
    `,

    level211: `
        10101000100
        00000010000
        00000000001
        00000010100
        10100001000
        00000000000
        00001000010
        00010000001
        00000010000
        01000010000
        01000101000
    `,

    level212: `
        01000000001
        00001000000
        00010000100
        00000100001
        00000001000
        11000000100
        00001000001
        00000010011
        10010000000
        00100000000
        10001001100
    `,

    level213: `
        01010000101
        00000000100
        11000100000
        00000010000
        00000000000
        10000010001
        00000100010
        01000001000
        00000010010
        00100000000
        00001010001
    `,

    level214: `
        11000000000
        00000000000
        00001001100
        01000000000
        00000000000
        00000001000
        10001000010
        01000000001
        00100100000
        10000001001
        00101000010
    `,

    level215: `
        10100000000
        00001001000
        00100000000
        01000010100
        00010000010
        10000011101
        00010000000
        10000000000
        00001000001
        00100000000
        00000100010
    `,
    level216: `
        00010000000
        00000000000
        10100110000
        00000000000
        10000010001
        01000000100
        00100101010
        00000000000
        01001000000
        00100000001
        01000000110
    `,
    level217: `
        00010000101
        01010000000
        00000010010
        01001000100
        01000000001
        00000010000
        01110000000
        00000000101
        00000010000
        00000000010
        00000000100
    `,
    level218: `
        00110000000
        00000000000
        10100010001
        00000000000
        01100100110
        00000000000
        10001010001
        00000000000
        00000000001
        10000000000
        00101010100
    `,
    // level219: `
    //     10001001000
    //     00100000000
    //     00010000100
    //     00000000000
    //     00001110000
    //     01000000100
    //     01000000000
    //     00010000101
    //     10000010000
    //     00000000010
    //     01000100000
    // `,
    level220: `
        00100001100
        00010010000
        00000001000
        10000000001
        00100000000
        10010100010
        00000010000
        01000001000
        10001000001
        00100000010
        10000101000
    `,
    level221: `
        10000000001
        01011000000
        10000010010
        00000010000
        00000010001
        01000001000
        00100010000
        00000100110
        00100000000
        00100001000
        00000010000
    `,
    level222: `
        10000100000
        00010000000
        01010000100
        00000010001
        10010000000
        00000000001
        10000001001
        00000000010
        00001000100
        00100000000
        00100001000
    `,
    level223: `
        00100010100
        00000000000
        10100001001
        00000000000
        11001000010
        00000000100
        00000010011
        00101000000
        00000000000
        10000100000
        10000010000
    `,
    level224: `
        01000000000
        10001001000
        00000100101
        00000000000
        00100110000
        00000000011
        01000100000
        00001000011
        00000000000
        11001001000
        00000000100
    `,
    level225: `
        00010000010
        00000100000
        01000000100
        10000010001
        00100001001
        00100000010
        01001000000
        10000000100
        00000110000
        00000001000
        00100000000
    `,
    level226: `
        00010001001
        00000000010
        10000000000
        10000011000
        01011000000
        00000011010
        00000000001
        00010000000
        10000000100
        10000100000
        10001000011
    `,
    level227: `
        01001000101
        00001000000
        10000000100
        00100000000
        00010001100
        00101100000
        10000000000
        00000000100
        00000000000
        00100100000
        11001000000
    `,
    level228: `
        01101000000
        00000000000
        00000100011
        00001001000
        10000000000
        10000000000
        00100000110
        00000010000
        10010000001
        00000100000
        00000001000
    `,
    level229: `
        00101000000
        00000000101
        10010000000
        00000010001
        00100100000
        01001000000
        00010000010
        00000011001
        00000000000
        01000000000
        00001100010
    `,
    level230: `
        00010000000
        01000000000
        00000010000
        01000010000
        10000010010
        00100001101
        00000010011
        00001000000
        10000000000
        10000010000
        10000100100
    `,
    level231: `
        00011000001
        00000001000
        00000010000
        10100000000
        00000010001
        10000001000
        10000000010
        10000100000
        00001000010
        00000001000
        00000000001
    `,
    level232: `
        00001000011
        01000000000
        00010100100
        10000000000
        00000000001
        00000001000
        00001000001
        00100000000
        00000010000
        00101000010
        00000001000
    `,
    level233: `
        10000100000
        00001000101
        00000000010
        00100100000
        01010000001
        00000000000
        00000010010
        01000001001
        00100000000
        00001000000
        10001001000
    `,
    level234: `
        01000000000
        10010110000
        00000000000
        00001001001
        00100100000
        00000000001
        01100000100
        10000000000
        00001001000
        00001000000
        00100001001
    `,
    level235: `
        00010000000
        10100000100
        00001000100
        00000000000
        01100000001
        00000100110
        10000010000
        00101000100
        00000000000
        00000000000
        10000101100
    `,
    level236: `
        00100100001
        00000001000
        00001000001
        10000010000
        00000100011
        00000000000
        00101100000
        00000000100
        00000010000
        00010000001
        01000100100
    `,
    level237: `
        00100010000
        01000000000
        00001000101
        00000000001
        10100000000
        00001001000
        00000000100
        00110010000
        00000000000
        00000001000
        00000000110
    `,
    level238: `
        10000001000
        00010000001
        00000010000
        00100000100
        10001010010
        01000000010
        00000000000
        00001101011
        00010000000
        10000000000
        10000100000
    `,
    level239: `
        00000001000
        00000010001
        01010000000
        00001000000
        10000001100
        00010000000
        01000010000
        01010000010
        00100010000
        00000000011
        00010000000
    `,
    level240: `
        00010000100
        00010000000
        01000010000
        01000000010
        00001000000
        00010010100
        00000000001
        01100100000
        00000010000
        00000001000
        10010000001
    `,

    // level244: `
    //     10001000000
    //     00001000001
    //     01000000100
    //     00000100100
    //     10000100000
    //     00000000000
    //     00010001011
    //     10000010000
    //     00000000000
    //     01011000100
    //     10000100000
    // `,
    //
    // level245: `
    //     00001000010
    //     00001000000
    //     00100000101
    //     10000100000
    //     00101000000
    //     00000010000
    //     00101000000
    //     00000000001
    //     00001000000
    //     00000001011
    //     00000010000
    // `,
    //
    // level249: `
    //     00100000000
    //     00010000001
    //     00100001010
    //     10010000000
    //     11000100001
    //     00000000000
    //     00000000100
    //     00101000100
    //     00000001000
    //     00100000010
    //     01010000001
    // `,
    //
    // level250: `
    //     00010010000
    //     00000101010
    //     10000010000
    //     01010000000
    //     00000000001
    //     00110000101
    //     00000100000
    //     00000010000
    //     00100000000
    //     00000000101
    //     00000000000
    // `,
};

export default levels;


import { SvgXml } from "react-native-svg";

export default (props: any) => {
    const xml = `<svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 0C1.344 0 0 1.344 0 3V15C0 16.656 1.344 18 3 18H23C24.656 18 26 16.656 26 15V3C26 1.344 24.656 0 23 0H3ZM3 2H23C23.551 2 24 2.449 24 3V3.5L13 9.438L2 3.5V3C2 2.449 2.449 2 3 2ZM2 3.781L8.531 8.875L2.125 15.438L9.938 9.875L13 11.844L16.063 9.875L23.875 15.438L17.469 8.875L24 3.781V15C23.9945 15.154 23.9516 15.3043 23.875 15.438C23.71 15.763 23.389 16 23 16H3C2.611 16 2.29 15.764 2.125 15.438C2.04859 15.3046 2.00569 15.1536 2 15V3.781Z" fill="white"/>
    </svg>
  `;
    let prop = { ...props, xml: xml };
    return <SvgXml {...prop} />;
};
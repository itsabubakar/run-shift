import { SvgXml } from "react-native-svg";

export default (props: any) => {
    const xml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 9L4 4M4 4V8M4 4H8M15 9L20 4M20 4V8M20 4H16M9 15L4 20M4 20V16M4 20H8M15 15L20 20M20 20V16M20 20H16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
    `;
    let prop = { ...props, xml: xml };
    return <SvgXml {...prop} />;
};




import { SvgXml } from "react-native-svg";

export default (props: any) => {
    const xml = `<svg width="47" height="8" viewBox="0 0 47 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46.3536 4.35355C46.5488 4.15829 46.5488 3.84171 46.3536 3.64645L43.1716 0.464466C42.9763 0.269204 42.6597 0.269204 42.4645 0.464466C42.2692 0.659728 42.2692 0.976311 42.4645 1.17157L45.2929 4L42.4645 6.82843C42.2692 7.02369 42.2692 7.34027 42.4645 7.53553C42.6597 7.7308 42.9763 7.7308 43.1716 7.53553L46.3536 4.35355ZM0 4.5H46V3.5H0V4.5Z" fill="white"/>
    </svg>
    
  `;
    let prop = { ...props, xml: xml };
    return <SvgXml {...prop} />;
};
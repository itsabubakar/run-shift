import { SvgXml } from "react-native-svg";

export default (props: any) => {
    const xml = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.9 3.5C19.9 5.37477 18.3748 6.9 16.5 6.9C14.6252 6.9 13.1 5.37477 13.1 3.5C13.1 1.62523 14.6252 0.1 16.5 0.1C18.3748 0.1 19.9 1.62523 19.9 3.5ZM5 2.1H11.0796C10.96 2.56622 10.9 3.03294 10.9 3.5V3.9H5C3.28477 3.9 1.9 5.28477 1.9 7V15C1.9 16.7152 3.28477 18.1 5 18.1H13C14.7152 18.1 16.1 16.7152 16.1 15V9.1H16.5C16.9671 9.1 17.4338 9.04004 17.9 8.92037V15C17.9 17.7048 15.7048 19.9 13 19.9H5C2.29523 19.9 0.1 17.7048 0.1 15V7C0.1 4.29523 2.29523 2.1 5 2.1Z" fill="white" stroke="#175B57" stroke-width="0.2"/>
    </svg>
    
       
  `;
    let prop = { ...props, xml: xml };
    return <SvgXml {...prop} />;
};
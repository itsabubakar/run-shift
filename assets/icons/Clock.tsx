



import { SvgXml } from "react-native-svg";

export default (props: any) => {
    const xml = `<svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 3.75C7.61719 3.75 3.25 8.11719 3.25 13.5C3.25 18.8828 7.61719 23.25 13 23.25C18.3828 23.25 22.75 18.8828 22.75 13.5C22.75 8.11719 18.3828 3.75 13 3.75Z" stroke="white" stroke-width="1.625" stroke-miterlimit="10"/>
    <path d="M13 7V14.3125H17.875" stroke="white" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
    
    
    
    
    
  `;
    let prop = { ...props, xml: xml };
    return <SvgXml {...prop} />;
};
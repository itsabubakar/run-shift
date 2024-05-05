



import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="60" height="54" viewBox="0 0 60 54" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="59" height="53" rx="15.5" fill=${props.fill || "#175B57"} stroke="#175B57"/>
  <path d="M23.6358 22.5236C23.5118 22.4909 23.3966 22.4312 23.2982 22.349C23.1999 22.2667 23.1208 22.1638 23.0666 22.0476C23.0124 21.9314 22.9844 21.8047 22.9845 21.6765C22.9847 21.5483 23.0131 21.4217 23.0676 21.3056L25.0043 17.1815C25.0748 17.0304 25.187 16.9027 25.3277 16.8133C25.4684 16.7239 25.6317 16.6765 25.7983 16.6768C25.965 16.677 26.1282 16.7249 26.2686 16.8147C26.409 16.9045 26.5208 17.0326 26.5909 17.1838L27.4449 19.0143C27.4754 19.0021 27.5066 18.9916 27.5383 18.9828C29.5531 18.4432 31.6895 18.5811 33.6182 19.3752C35.547 20.1694 37.1611 21.5757 38.2119 23.3776C39.2626 25.1794 39.6917 27.2768 39.4331 29.3466C39.1744 31.4163 38.2423 33.3436 36.7804 34.8314C35.3186 36.3193 33.408 37.2851 31.3431 37.5802C29.2782 37.8752 27.1736 37.4831 25.3536 36.4642C23.5335 35.4453 22.099 33.8562 21.271 31.9418C20.443 30.0273 20.2675 27.8937 20.7716 25.8696C20.7995 25.7581 20.8491 25.6532 20.9175 25.5608C20.986 25.4684 21.0719 25.3904 21.1705 25.3313C21.2691 25.2721 21.3784 25.233 21.4921 25.216C21.6058 25.1991 21.7217 25.2048 21.8333 25.2326C21.9448 25.2605 22.0498 25.3101 22.1421 25.3786C22.2345 25.447 22.3125 25.533 22.3716 25.6315C22.4308 25.7301 22.47 25.8394 22.4869 25.9531C22.5038 26.0668 22.4982 26.1828 22.4703 26.2943C22.0615 27.9371 22.2013 29.6686 22.8683 31.2245C23.5353 32.7805 24.693 34.0756 26.1647 34.9123C27.6364 35.7489 29.3414 36.0813 31.0196 35.8586C32.6978 35.6359 34.2571 34.8704 35.4597 33.6789C36.6622 32.4873 37.4421 30.9351 37.6802 29.259C37.9184 27.583 37.6017 25.875 36.7787 24.3956C35.9556 22.9163 34.6712 21.7467 33.1215 21.0654C31.5717 20.3841 29.8416 20.2283 28.1951 20.622L29.0584 22.4688C29.1291 22.6196 29.1553 22.7875 29.1338 22.9527C29.1124 23.1179 29.0442 23.2735 28.9374 23.4013C28.8306 23.5291 28.6895 23.6237 28.5307 23.6741C28.3719 23.7245 28.2021 23.7285 28.0411 23.6856L23.6358 22.5236Z" fill="white"/>
  </svg>
  `;
  let prop = { ...props, xml: xml };
  return <SvgXml {...prop} />;
};
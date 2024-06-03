import { SvgXml } from "react-native-svg";

export default (props: any) => {
    const xml = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2917 2.308C9.89774 2.822 9.45374 3.616 8.80774 4.774L8.48074 5.361L8.42174 5.467C8.12174 6.007 7.86674 6.465 7.45774 6.775C7.04474 7.089 6.54074 7.202 5.95474 7.334L5.84074 7.36L5.20474 7.504C3.94974 7.788 3.09474 7.983 2.51074 8.214C1.93974 8.438 1.81974 8.623 1.77374 8.77C1.72474 8.926 1.72374 9.165 2.06374 9.707C2.41074 10.257 2.99574 10.943 3.84974 11.943L4.28374 12.45L4.35874 12.537C4.76174 13.007 5.09774 13.399 5.25174 13.895C5.40474 14.388 5.35374 14.905 5.29174 15.533L5.28174 15.65L5.21574 16.327C5.08574 17.659 4.99974 18.577 5.02874 19.237C5.05874 19.897 5.19774 20.079 5.30874 20.163C5.40674 20.238 5.58874 20.32 6.18174 20.15C6.78474 19.978 7.58674 19.611 8.76174 19.07L9.35774 18.796L9.46674 18.746C10.0117 18.493 10.4837 18.275 10.9997 18.275C11.5157 18.275 11.9877 18.493 12.5327 18.745C12.569 18.7625 12.6057 18.7791 12.6427 18.795L13.2377 19.07C14.4127 19.611 15.2147 19.978 15.8177 20.15C16.4107 20.32 16.5927 20.238 16.6907 20.163C16.8017 20.079 16.9407 19.896 16.9707 19.237C17.0007 18.577 16.9127 17.659 16.7837 16.327L16.7177 15.65L16.7077 15.533C16.6457 14.905 16.5947 14.388 16.7477 13.895C16.9017 13.399 17.2377 13.007 17.6407 12.537L17.7157 12.45L18.1497 11.943C19.0037 10.943 19.5887 10.257 19.9347 9.707C20.2757 9.165 20.2747 8.927 20.2257 8.77C20.1797 8.623 20.0597 8.438 19.4887 8.214C18.9037 7.983 18.0497 7.788 16.7947 7.504L16.1587 7.36C16.1197 7.35 16.0817 7.342 16.0447 7.334C15.4587 7.202 14.9547 7.089 14.5417 6.775C14.1317 6.465 13.8787 6.008 13.5777 5.467L13.5197 5.361L13.1917 4.774C12.5457 3.616 12.1017 2.822 11.7077 2.308C11.3147 1.794 11.1137 1.75 10.9997 1.75C10.8857 1.75 10.6847 1.794 10.2917 2.308ZM9.10174 1.396C9.57675 0.774 10.1657 0.25 10.9997 0.25C11.8337 0.25 12.4217 0.774 12.8987 1.396C13.3667 2.008 13.8637 2.899 14.4707 3.988L14.8297 4.631C15.2217 5.335 15.3227 5.485 15.4487 5.581C15.5687 5.672 15.7257 5.724 16.4887 5.897L17.1887 6.055C18.3647 6.321 19.3337 6.54 20.0387 6.818C20.7707 7.107 21.4117 7.532 21.6587 8.325C21.9027 9.11 21.6287 9.832 21.2047 10.505C20.7927 11.16 20.1347 11.93 19.3307 12.87L18.8557 13.425C18.3387 14.029 18.2307 14.177 18.1797 14.34C18.1287 14.507 18.1327 14.7 18.2117 15.505L18.2827 16.243C18.4047 17.499 18.5037 18.523 18.4687 19.303C18.4337 20.098 18.2537 20.86 17.5987 21.358C16.9307 21.864 16.1537 21.808 15.4037 21.592C14.6767 21.384 13.7707 20.967 12.6707 20.46L12.0147 20.158C11.2967 19.828 11.1437 19.775 10.9997 19.775C10.8557 19.775 10.7027 19.828 9.98474 20.158L9.32974 20.46C8.22874 20.967 7.32274 21.384 6.59574 21.592C5.84574 21.807 5.06874 21.864 4.40174 21.358C3.74574 20.86 3.56574 20.098 3.53074 19.304C3.49574 18.524 3.59474 17.499 3.71674 16.244L3.78874 15.505C3.86674 14.699 3.87074 14.507 3.81874 14.34C3.76874 14.177 3.66074 14.03 3.14374 13.425L2.66874 12.87C1.86574 11.93 1.20774 11.16 0.795744 10.506C0.370744 9.832 0.096744 9.11 0.340744 8.325C0.587744 7.532 1.22874 7.107 1.96074 6.818C2.66574 6.54 3.63474 6.321 4.81074 6.055L4.87374 6.041L5.50974 5.897C6.27374 5.724 6.42974 5.672 6.55074 5.58C6.67674 5.485 6.77774 5.335 7.17074 4.631L7.52874 3.988C8.13574 2.898 8.63274 2.008 9.10074 1.396" fill="white"/>
    </svg>
    
       
  `;
    let prop = { ...props, xml: xml };
    return <SvgXml {...prop} />;
};
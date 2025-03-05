import { Path, Svg } from "react-native-svg";

type Props = {
  color?: string;
};
const OpenDoor = ({ color }: Props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.157 20.517H16.75C17.413 20.517 18.0489 20.2536 18.5178 19.7848C18.9866 19.3159 19.25 18.68 19.25 18.017V5.75C19.25 5.08696 18.9866 4.45107 18.5178 3.98223C18.0489 3.51339 17.413 3.25 16.75 3.25H7.25C6.7 3.25 6.19 3.428 5.777 3.73M5.777 3.73L12.791 7.031C13.0481 7.1523 13.2655 7.34416 13.4177 7.58424C13.57 7.82431 13.6509 8.10271 13.651 8.387V20.246C13.6511 20.4986 13.5873 20.7472 13.4657 20.9686C13.3441 21.19 13.1685 21.3772 12.9552 21.5126C12.742 21.6481 12.498 21.7275 12.2459 21.7434C11.9937 21.7594 11.7416 21.7115 11.513 21.604L5.617 18.829C5.35973 18.7076 5.14228 18.5156 4.99001 18.2753C4.83774 18.0351 4.75693 17.7565 4.757 17.472M5.777 3.73C5.45896 3.96192 5.20017 4.26667 5.02171 4.61751C4.84325 4.96835 4.75015 5.35638 4.75 5.75V17.472"
        stroke={color || "#606060"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.25 14C10.9404 14 11.5 13.4404 11.5 12.75C11.5 12.0596 10.9404 11.5 10.25 11.5C9.55964 11.5 9 12.0596 9 12.75C9 13.4404 9.55964 14 10.25 14Z"
        fill="white"
      />
    </Svg>
  );
};
export default OpenDoor;

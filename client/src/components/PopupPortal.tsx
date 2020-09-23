import {useEffect} from 'react'
import ReactDOM from 'react-dom'

interface IPortal {
  children: React.ReactNode;
  close: () => void;
}

const PopupPortal = ({ children, close }: IPortal) => {
  const root: HTMLElement | null = document.getElementById("root");
  const rootPortal: HTMLElement | null = document.getElementById("root-portal");

  useEffect(() => {
      root!.addEventListener('click',close)
      return () =>{
          root!.removeEventListener('click',close)
      }
  }, []);

  return ReactDOM.createPortal(children, rootPortal!);
};

export default PopupPortal
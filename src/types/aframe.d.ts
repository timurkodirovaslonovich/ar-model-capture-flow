
declare namespace JSX {
  interface IntrinsicElements {
    'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      embedded?: boolean;
      'vr-mode-ui'?: string;
      'device-orientation-permission-ui'?: string;
    };
    'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      position?: string;
      'look-controls'?: string;
      'wasd-controls'?: string;
    };
    'a-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      position?: string;
      rotation?: string;
      scale?: string;
      color?: string;
      animation?: string;
      shadow?: string;
    };
    'a-sphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      position?: string;
      radius?: string;
      scale?: string;
      color?: string;
      animation?: string;
    };
    'a-cylinder': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      position?: string;
      radius?: string;
      height?: string;
      scale?: string;
      color?: string;
      animation?: string;
    };
    'a-light': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      type?: string;
      color?: string;
      position?: string;
    };
  }
}

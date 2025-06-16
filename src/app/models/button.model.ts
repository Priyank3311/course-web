export interface ButtonControlModel {
  buttonText: string;
  class?: string;
  color?: 'primary' | 'accent' | 'warn';
  type?: 'button' | 'submit' | 'reset';
  matStrokedButton?: boolean;
  displayIcon?: boolean;
  iconPath?: string;
  disabledIconPath?: string;
  alt?: string;
}

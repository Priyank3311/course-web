export interface ButtonControlModel {
  type: string;
  buttonText: string;
  color: string;
  class?: string;
  matStrokedButton: boolean;
  displayIcon?: boolean;
  iconPath?: string;
  disabledIconPath?: string;
  alt?: string;
}

export interface FormControlModel {
  key: string;
  label: string;
  inputType?: string;
  errorData?: { errorType: string; errorMsg: string }[];
  displayIcon?: boolean;
  iconName?: string;
  dropdownData?: { value: string | number; label: string }[];
  placeholder?: string;
  previewUrl?: string | ArrayBuffer | null;
  imageUploadInfo?: string;
}


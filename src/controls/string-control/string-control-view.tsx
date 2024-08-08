import React from 'react';
import { IRemoteComponentCardApi, IRemoteComponentMetadata, Theme } from '@directum/sungero-remote-component-types';
import './string-control-view.css';

interface IProps {
  label: string;
  value?: string;
  onChange(newValue?: string): Promise<void>;
  theme: Theme;
  isEnabled: boolean;
}

interface ITaskGuids {
  name: string;
  typeGuid: string;
}

const StringControlView: React.FC<IProps> = ({ label, value, onChange, theme, isEnabled }) => {
  const [editorValue, setEditorValue] = React.useState(value ?? '');
  const options: ITaskGuids[] = [
    { name: "Согласование процессов", typeGuid: "GUID1" },
    { name: "Свободное согласование", typeGuid: "GUID2" },
    { name: "Новый тип задачи", typeGuid: "GUID3" }
  ];

  React.useEffect(() => setEditorValue(value ?? ''), [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditorValue(e.target.value);
    onChange(e.target.value);
  };

  const labelClassName = `string-control__label${!isEnabled ? ' string-control__label_disabled' : ''}`;
  const selectClassName = `string-control__select${!isEnabled ? ' string-control__select_disabled' : ''}`;

  return (
    <div className="string-control">
      <span className={labelClassName}> {label} </span>
      <select
        className={selectClassName}
        value={editorValue}
        onChange={handleChange}
        disabled={!isEnabled}
      >
        {options.map(option => (
          <option key={option.typeGuid} value={option.typeGuid}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default StringControlView;
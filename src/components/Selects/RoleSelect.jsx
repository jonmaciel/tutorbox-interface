import React from 'react';
import SelectField from '../SelectField/SelectField.jsx';

const OrganizationSelect = ({ value, onChange, isTutormaker }) =>
  <SelectField
    placeholder="Selecione o tipo de usuário..."
    options={[
      { label: 'Administrador Geral', value: 'admin', isTutormaker: true },
      { label: 'Produtor de vídeos', value: 'videoProducer', isTutormaker: true },
      { label: 'Roteirista', value: 'scriptWriter', isTutormaker: true },
      { label: 'Administrador da Organização', value: 'organizationAdmin', isTutormaker: false },
      { label: 'Administrador de um sistema', value: 'systemAdmin', isTutormaker: false },
      { label: 'Membro de um sistema', value: 'systemMember', isTutormaker: false },
    ].filter(role => !!isTutormaker == role.isTutormaker )}
    onChange={onChange}
    value={value}
  />

export default OrganizationSelect;

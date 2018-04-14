import React, { Component } from 'react';
import Organization from './Organization.jsx';
import { getCurrentOrganizationId } from '../../consts.jsx';

const CurrentOrganization = () =>
  <Organization organizationId={getCurrentOrganizationId()} />

export default CurrentOrganization;
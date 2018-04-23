import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './overwritte.css';

class SelectField extends Component {
  render () {
    const { readOnly } = this.props;
    return (
      <div className="section">
        <h3 className="section-heading">
          {this.props.label}
        </h3>
        <Select
          inputProps={ { readOnly } }
          multi={this.props.multi}
          closeOnSelect={!this.props.stayOpen}
          disabled={this.props.disabled}
          onChange={this.props.onChange}
          options={this.props.options}
          placeholder={this.props.placeholder}
          removeSelected={true}
          rtl={false}
          simpleValue
          value={this.props.value}
        />
      </div>
    );
  }
}

SelectField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.string,
  stayOpen: PropTypes.string,
  value: PropTypes.string,
  multi: PropTypes.boolean,
};

export default SelectField;

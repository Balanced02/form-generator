import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import './styles.css'

const animatedComponents = makeAnimated();

const customStyles = {
  control: base => ({
    ...base,
    minHeight: '30px',
    backgroundColor: '#f5f5f5',
  }),
};

/**
 * - Re-usable multiSelect component
 * - Controlled component
 * - Uses a portion of state, passed to the component as a prop:
 * ```
 * list: [{
 *  id: '10001',
 *  name: 'testing'
 * }]
 * ```
 */
class MultiSelect extends React.Component {
  static displayName = 'Multi Select';

  static propTypes = {
    // name of the select component
    selectName: PropTypes.string.isRequired,
    // class name for the component
    className: PropTypes.string,
    /**
     * callback for when a change occurs
     */
    onChange: PropTypes.func.isRequired,
    /**
     * state from parent component
     */
    selectState: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          label: PropTypes.string,
        }),
      ),
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        label: PropTypes.string,
      }),
    ]),
    /**
     * the list to be passed to the component
     */
    optionsList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        label: PropTypes.string.isRequired,
      }),
    ),
    /**
     * placeholder for multiselect
     */
    placeholder: PropTypes.string.isRequired,
    /**
     * allow multiple select
     */
    allowMultiple: PropTypes.bool,
    /**
     * close menu on select
     */
    closeMenuOnSelect: PropTypes.bool,
    isAsync: PropTypes.bool,
    loadAsyncOptions: PropTypes.func,
  };

  static defaultProps = {
    selectState: [],
    allowMultiple: false,
    closeMenuOnSelect: true,
    isAsync: false,
  };

  handleSelectChange = data => {
    this.props.onChange({
      target: {
        type: "custom",
        name: this.props.selectName,
        value: data,
      },
    });
  };

  render() {
    return (
      <div className={`multi-select ${this.props.className}`} >
        {this.props.isAsync ? (
          <AsyncSelect
            name={this.props.selectName}
            value={this.props.selectState}
            onChange={this.handleSelectChange}
            placeholder={this.props.placeholder}
            cacheOptions
            components={animatedComponents}
            loadOptions={this.props.loadAsyncOptions}
            labelKey="name"
            valueKey="id"
            isMulti={this.props.allowMultiple}
            closeMenuOnSelect={this.props.closeMenuOnSelect}
            styles={customStyles}
            isSearchable
          />
        ) : (
          <Select
            name={this.props.selectName}
            value={this.props.selectState}
            onChange={this.handleSelectChange}
            placeholder={this.props.placeholder}
            components={animatedComponents}
            options={this.props.optionsList}
            labelKey="name"
            valueKey="id"
            isMulti={this.props.allowMultiple}
            closeMenuOnSelect={this.props.closeMenuOnSelect}
            styles={customStyles}
            isSearchable
          />
        )}
      </div>
    );
  }
}

export default MultiSelect;
